"use server";

import { createAdminClient, createSessionClient } from "@/lib/appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";
import { Query , ID } from "node-appwrite";
import { parseStringify } from "../utils";
import {cookies} from "next/headers";
import { avatarPlaceholderUrl } from "@/constants";
import { redirect } from "next/navigation";

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
        handleError(error, "Falha ao criar token de email");
    }
};

export const createAccount = async ({ fullName, email }: { fullName: string, email: string }) => {
    console.log("Starting createAccount with:", { fullName, email });

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
                    fullName,
                    email,
                    avatar: avatarPlaceholderUrl,
                    accountId,
                }
            );
            console.log("Novo usuário criado com sucesso.");
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

        (await cookies()).set("appwrite-session", session.secret, {
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

export const getCurrentUser = async () => {
    const client = await createSessionClient();

    // Se não houver sessão, retorna null sem quebrar o SSR
    if (!client) return null;

    try {
        const { databases, account } = client;

        const result = await account.get();

        const user = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.usersCollectionId,
        [Query.equal("accountId", result.$id)]
    );

    if (user.total <= 0) return null;

    return user.documents[0];
    } catch (err) {
        console.warn("Erro ao obter usuário logado:", err);
        return null;
    }
};


export const signOutUser = async () => {
    
    const {account} = await createSessionClient();
    
    try {
        await account.deleteSession("current");
        (await cookies()).delete("appwrite-session");
    } catch (error) {
        handleError(error, "Failed to sign out user");
    } finally{
        redirect("/sign-in");
    }
}

export const signInUser = async ({ email }: { email: string }) => {
    try {
        const existingUser = await getUserByEmail(email);
    
        if (existingUser) {
            await sendEmailOTP({ email });
            return parseStringify({ accountId: existingUser.accountId });
        }

        return parseStringify({ accountId: null, error: "User not found" });
    } catch (error) {
        handleError(error, "Failed to sign in user");
    }
};