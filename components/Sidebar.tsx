'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { navItems } from '@/constants'
import { cn } from '@/lib/utils'

const Sidebar = () => {

    const pathname = usePathname()

    return (
        <aside className='sidebar'>
            <Link href="/">
                <Image
                    src="/assets/icons/logo-full-brand.svg"
                    alt='Logo'
                    width={160}
                    height={50}
                    className='hidden h-auto lg:block'
                />
                <Image
                    src='/assets/icons/logo-brand.svg'
                    alt='Logo'
                    width={52}
                    height={52}
                    className='lg:hidden'
                />
            </Link>

            <nav className='sidebar-nav'>
                <ul className='flex flex-1 flex-col gap-6'>
                    {navItems.map(({ name, icon, url }) => (
                        <Link key={name} href={url} className='lg:w-full'>
                            <li className={cn('sidebar-nav-item', pathname === url && 'shad-active')}>
                                <Image
                                    src={icon}
                                    alt={name}
                                    width={24}
                                    height={24}
                                    className={cn(
                                        'nav-icon', pathname === url && 'nav-icon-active'
                                    )}
                                />
                                <p>{name}</p>
                            </li>
                        </Link>

                    ))}
                </ul>
            </nav>
        </aside>
    )
}

export default Sidebar