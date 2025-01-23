"use server";

import { createAdminClient } from "@/lib/appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";
import { Query , ID } from "node-appwrite";
import { parseStringify } from "../utils";
import {cookies} from "next/headers";

const getUserByEmail = async (email: string) => {
    const {databases} = await createAdminClient();

    const result = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.usersCollectionId,
        [Query.equal("email", [email])]
    );

    return result.total > 0 ? result.documents[0] : null;
};

const handleError = (error: unknown, message: string) => {
    console.log(error, message);
    throw error;
};
export const sendEmailOTP = async ({email}: { email: string }) => {
    const {account} = await createAdminClient();

    try {
        const session = await account.createEmailToken(ID.unique(), email);
    return session.userId;
    } catch (error) {
        handleError(error, "Failed to create email token");
    }
};

export const createAccount = async ({ fullname, email }: { fullname: string, email: string }) => {
    console.log("Starting createAccount with:", { fullname, email });

    try {
        const existingUser = await getUserByEmail(email);
        console.log("Existing user:", existingUser);

        const accountId = await sendEmailOTP({ email });
        console.log("OTP sent, Account ID:", accountId);

        if (!accountId) {
            console.error("Failed to send OTP");
            throw new Error("Failed to send OTP");
        }

        if (!existingUser) {
            console.log("Creating new user in database...");
            const { databases } = await createAdminClient();
            await databases.createDocument(
                appwriteConfig.databaseId,
                appwriteConfig.usersCollectionId,
                ID.unique(),
                {
                    fullname,
                    email,
                    avatar: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
                    accountId,
                }
            );
            console.log("New user created successfully.");
        }

        return parseStringify({ accountId });
    } catch (error) {
        console.error("Error in createAccount:", error);
        throw error;
    }
};

export const verifySecret = async ({accountId, password}: {accountId: string, password: string}) => {
    try {
        const {account} = await createAdminClient();

        const session = await account.createSession(accountId, password);

        (await cookies()).set("appwrite_session", session.$id, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        return parseStringify({sessionId: session.$id});

    } catch (error) {
        handleError(error, "Failed to verify OTP");
    }
}

