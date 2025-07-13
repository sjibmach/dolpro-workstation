'use client';

import { Dialog, Transition } from '@headlessui/react';
import {
    Bars3Icon,
    ChevronDownIcon,
    XMarkIcon,
} from '@heroicons/react/20/solid';
import { Fragment, Suspense, useState } from 'react';
// import LogoSvg from '../../../public/svg/Logo';

import { HomeIcon, UsersIcon } from '@heroicons/react/20/solid';
import { PiSealCheckFill } from 'react-icons/pi';

// import { classNames } from '@/libs/tailwind-helper';
// import { SafeUser } from '@/types/base-data';
// import { useQueryClient } from '@tanstack/react-query';
// import { signIn, signOut } from 'next-auth/react';
// import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    HiOutlineArrowsPointingIn,
    HiOutlineMoon,
    HiOutlineSun,
} from 'react-icons/hi2';
import { IoDocuments } from 'react-icons/io5';
import { MdFamilyRestroom } from 'react-icons/md';
// import TopNavBarSearch from '../TopNavBar/TopNavBarSearch';
// import Avatar from '../ui/Avatar';
// import OptionsMenu from '../Inputs/OptionsMenu';

import {
    HiCalendar,
    HiDocumentCurrencyDollar,
    HiDocumentDuplicate,
    HiHome,
    HiLanguage,
    HiUsers,
} from 'react-icons/hi2';
import { TbUserDollar } from 'react-icons/tb';
import { cn } from '@/lib/utils';

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

type Props = {
    children: React.ReactNode;
    // currentUser?: SafeUser | null;
};

const SideAndTopLayout = ({
    children,
    // ,currentUser
}: Props) => {
    // const [cityId, setCityId] = useUrl('cityId', '1');

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();
    // const { theme, setTheme } = useTheme();
    // const handleClick = () => {
    //     if (theme === 'dark' || theme === 'system') {
    //         setTheme('light');
    //     }
    //     if (theme === 'light' || theme === 'system') {
    //         setTheme('dark');
    //     }
    //     // console.log('theme', theme);
    // };

    // const queryClient = useQueryClient();
    // let userNavigation;
    // if (currentUser) {
    //     userNavigation = [
    //         {
    //             id: 1,
    //             label: 'Sign out',
    //             action: () => {
    //                 queryClient.removeQueries();
    //                 queryClient.clear();
    //                 signOut();
    //             },
    //         },
    //     ];
    // } else {
    //     userNavigation = [{ id: 2, label: 'Sign in', action: () => signIn() }];
    // }
    // const [avatarLabel, setAvatarLabel] = useState<string>(() => {
    //     if (!currentUser) return '';
    //     let result = '';
    //     if (!!currentUser?.first_name)
    //         result = currentUser?.first_name?.charAt(0);
    //     if (!!currentUser?.last_name)
    //         result = result + currentUser?.last_name?.charAt(0);
    //     return result;
    // });

    return (
        <>
            {/* MOBILE NAVIGATION */}
            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-10 lg:hidden"
                    onClose={setSidebarOpen}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-900/80" />
                    </Transition.Child>

                    <div className="fixed inset-0 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-in-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="absolute top-0 left-full flex w-16 justify-center pt-5">
                                        <button
                                            type="button"
                                            className="-m-2.5 p-2.5"
                                            onClick={() =>
                                                setSidebarOpen(false)
                                            }
                                        >
                                            <span className="sr-only">
                                                Close sidebar
                                            </span>
                                            <XMarkIcon
                                                className="h-6 w-6 text-white"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </div>
                                </Transition.Child>

                                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-2 ring-1 ring-white/10">
                                    <div className="flex h-16 shrink-0 items-center">
                                        <Link
                                            className="flex h-12 w-12 cursor-pointer items-center rounded-xl bg-white p-1.5"
                                            href="/"
                                        >
                                            {/* TODO LOGO */}
                                            Dolpro
                                        </Link>
                                    </div>
                                    <nav className="flex flex-1 flex-col">
                                        <ul
                                            role="list"
                                            className="-mx-2 flex-1 space-y-1"
                                        >
                                            {navigation.map(item => (
                                                <li key={item.name}>
                                                    <Link
                                                        href={item.href}
                                                        className={cn(
                                                            item.current(
                                                                pathname
                                                            )
                                                                ? 'bg-gray-800 text-white'
                                                                : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                                                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                        )}
                                                        onClick={() =>
                                                            setSidebarOpen(
                                                                false
                                                            )
                                                        }
                                                    >
                                                        <item.icon
                                                            className="h-6 w-6 shrink-0"
                                                            aria-hidden="true"
                                                        />
                                                        {item.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </nav>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            {/* SIDEBAR */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-20 lg:overflow-y-auto lg:bg-gray-900 lg:pb-4">
                <div className="flex h-16 shrink-0 items-center justify-center">
                    <Link
                        className="flex h-14 w-14 cursor-pointer items-center p-1.5 invert"
                        href="/"
                    >
                        {/* <LogoSvg /> */}
                        Dolpro
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

            {/* TOP NAVIGATION */}
            <div className="fixed top-0 z-10 flex h-16 w-full shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:pr-8 lg:pl-28 dark:border-gray-800 dark:bg-gray-900">
                <button
                    type="button"
                    className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                    onClick={() => setSidebarOpen(true)}
                >
                    <span className="sr-only">Open sidebar</span>
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>

                <div
                    className="h-6 w-px bg-gray-900/10 lg:hidden"
                    aria-hidden="true"
                />

                <div className="flex flex-1 justify-between gap-x-4 self-stretch lg:gap-x-6">
                    <div className="flex flex-1 items-center">
                        {/* <Suspense fallback={<div>Loading...</div>}>
                            <TopNavBarSearch />
                        </Suspense> */}
                    </div>
                    <div className="flex items-center gap-x-4 lg:gap-x-6">
                        {/* DARKMODE ICON */}
                        {/* <button
                            type="button"
                            className="flex-shrink-0 rounded-full bg-gray-100 p-2 text-gray-700 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800 focus-visible:outline-none dark:bg-gray-800 dark:text-gray-400"
                            onClick={handleClick}
                        >
                            {theme === 'dark' ? (
                                <>
                                    <span className="sr-only">Dark Mode</span>
                                    <HiOutlineSun
                                        className="h-6 w-6"
                                        aria-hidden="true"
                                    />
                                </>
                            ) : (
                                <>
                                    <span className="sr-only">Light Mode</span>
                                    <HiOutlineMoon
                                        className="h-6 w-6"
                                        aria-hidden="true"
                                    />
                                </>
                            )}
                        </button> */}

                        <div
                            className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10 dark:bg-gray-700"
                            aria-hidden="true"
                        />

                        {/* USER MENU */}
                        {/* <OptionsMenu
                            button={
                                <div className="flex">
                                    <span className="sr-only">
                                        Open user menu
                                    </span>
                                    <Avatar label={avatarLabel} />
                                    <span className="hidden lg:flex lg:items-center">
                                        <span
                                            className="ml-4 text-sm leading-6 font-semibold whitespace-nowrap text-gray-900 dark:text-gray-200"
                                            aria-hidden="true"
                                        >
                                            {currentUser?.first_name}{' '}
                                            {currentUser?.last_name}
                                        </span>
                                        <ChevronDownIcon
                                            className="ml-2 h-5 w-5 text-gray-400"
                                            aria-hidden="true"
                                        />
                                    </span>
                                </div>
                            }
                            items={userNavigation}
                        /> */}
                    </div>
                </div>
            </div>
            <div className="right-0 mt-16 hidden h-screen w-60 overflow-auto bg-white lg:fixed lg:block">
                Hallo
            </div>
            {/* MAIN CONTENT */}
            <div className="mt-16 mr-64 lg:pl-20">
                <>{children}</>
                {/* <div className="fixed right-0 mt-16 h-screen w-80 overflow-auto bg-rose-500">
                    Hallo
                </div> */}
            </div>
        </>
    );
};

export default SideAndTopLayout;
