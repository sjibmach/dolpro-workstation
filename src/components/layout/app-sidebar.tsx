'use client';

import {
    HiCalendar,
    HiDocumentCurrencyDollar,
    HiDocumentDuplicate,
    HiHome,
    HiLanguage,
    HiUsers,
} from 'react-icons/hi2';
import { TbUserDollar } from 'react-icons/tb';
import Link from 'next/link';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

export const navigation = [
    {
        name: 'Startseite',
        href: '/',
        icon: HiHome,
        current: (pathname: string | null) =>
            pathname === '/' || pathname === '/home',
    },
    {
        name: 'Dolmetscher',
        href: '/interpreters',
        icon: HiLanguage,
        current: (pathname: string | null) =>
            pathname?.startsWith('/interpreters'),
    },
    {
        name: 'Auftraggeber',
        href: '/clients',
        icon: HiUsers,
        current: (pathname: string | null) => pathname?.startsWith('/clients'),
    },
    {
        name: 'Aufträge',
        href: '/orders',
        icon: HiDocumentDuplicate,
        current: (pathname: string | null) => pathname?.startsWith('/orders'),
    },
    {
        name: 'Rechnungen',
        href: '/invoices',
        icon: HiDocumentCurrencyDollar,
        current: (pathname: string | null) => pathname?.startsWith('/invoices'),
    },
    {
        name: 'Zahlungen',
        href: '/payouts',
        icon: TbUserDollar,
        current: (pathname: string | null) => pathname?.startsWith('/invoices'),
    },
    {
        name: 'Kalendar',
        href: '/calendar',
        icon: HiCalendar,
        current: (pathname: string | null) => pathname?.startsWith('/matching'),
    },
];

const AppSidebar = ({ children }: { children: React.ReactNode }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();

    return (
        <>
            {' '}
            <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-20 lg:overflow-y-auto lg:bg-gray-900 lg:pb-4">
                <div className="flex h-16 shrink-0 items-center justify-center">
                    <Link
                        className="flex h-14 w-14 cursor-pointer items-center p-1.5 invert"
                        href="/"
                    >
                        Delpro
                    </Link>
                </div>
                <nav className="mt-8">
                    <ul
                        role="list"
                        className="flex flex-col items-center space-y-1"
                    >
                        {navigation.map(item => (
                            <li
                                key={item.name}
                                className="w-full truncate px-1.5"
                            >
                                <Link
                                    href={item.href}
                                    className={cn(
                                        item.current(pathname)
                                            ? 'bg-gray-800 text-indigo-400 dark:text-indigo-400'
                                            : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                                        'group flex w-full flex-col items-center justify-center gap-x-3 rounded-md py-3 text-sm leading-6 font-semibold'
                                    )}
                                >
                                    <item.icon
                                        className="h-6 w-6 shrink-0"
                                        aria-hidden="true"
                                    />
                                    <span className="inline-block w-full truncate text-center text-[10px]">
                                        {item.name}
                                    </span>
                                    <span className="sr-only">{item.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            {/* MAIN CONTENT */}
            <div className="lg:pl-20">{children}</div>
        </>
    );
};

export default AppSidebar;
