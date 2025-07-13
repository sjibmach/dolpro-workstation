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

import { XMarkIcon } from '@heroicons/react/24/outline';

import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    TransitionChild,
} from '@headlessui/react';

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

const AppSidebar = ({
    sidebarOpen,
    setSidebarOpen,
}: {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
}) => {
    const pathname = usePathname();

    return (
        <>
            {/* Mobile sidebar */}
            <Dialog
                open={sidebarOpen}
                onClose={setSidebarOpen}
                className="relative z-50 lg:hidden"
            >
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-closed:opacity-0"
                />

                <div className="fixed inset-0 flex">
                    <DialogPanel
                        transition
                        className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full"
                    >
                        <TransitionChild>
                            <div className="absolute top-0 left-full flex w-16 justify-center pt-5 duration-300 ease-in-out data-closed:opacity-0">
                                <button
                                    type="button"
                                    onClick={() => setSidebarOpen(false)}
                                    className="-m-2.5 p-2.5"
                                >
                                    <span className="sr-only">
                                        Close sidebar
                                    </span>
                                    <XMarkIcon
                                        aria-hidden="true"
                                        className="size-6 text-white"
                                    />
                                </button>
                            </div>
                        </TransitionChild>

                        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-2 ring-1 ring-white/10">
                            <div className="flex h-16 shrink-0 items-center">
                                <img
                                    alt="Your Company"
                                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                                    className="h-8 w-auto"
                                />
                            </div>
                            <nav className="flex flex-1 flex-col">
                                <ul
                                    role="list"
                                    className="-mx-2 flex-1 space-y-1"
                                >
                                    {navigation.map(item => (
                                        <li key={item.name}>
                                            <a
                                                href={item.href}
                                                className={cn(
                                                    item.current(pathname)
                                                        ? 'bg-gray-800 text-white'
                                                        : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                                                    'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold'
                                                )}
                                            >
                                                <item.icon
                                                    aria-hidden="true"
                                                    className="size-6 shrink-0"
                                                />
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>

            {/* Static sidebar for desktop */}
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
        </>
    );
};

export default AppSidebar;
