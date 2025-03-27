export const dynamic = "force-dynamic";

import Sidebar from '@/components/Sidebar';
import MobileNavigation from '@/components/MobileNavigation';
import React from 'react'
import Header from '@/components/Header';
import { getCurrentUser } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';
import { Toaster } from '@/components/ui/toaster';

const Layout = async ({ children }: { children: React.ReactNode }) => {
    const currentUser = await getCurrentUser();

    if (!currentUser) return redirect('/sign-in')

    return (
        <main className='flex h-screen'>
            <Sidebar fullName={currentUser.fullName} avatar={currentUser.avatar} email={currentUser.email} />
            <section className='flex h-full flex-1 flex-col'>
                <MobileNavigation fullName={currentUser.fullName} avatar={currentUser.avatar} email={currentUser.email} $Id={currentUser.$id} accountId={currentUser.accountId} />
                <Header userId={currentUser.$id} accountId={currentUser.accountId}></Header>
                <div className='main-content'>{children}</div>
            </section>

            <Toaster />

        </main>
    );
};

export default Layout
