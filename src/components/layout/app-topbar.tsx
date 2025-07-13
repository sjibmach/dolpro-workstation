'use client';
import { Bars3Icon, BellIcon } from '@heroicons/react/24/outline';

import {
    ChevronDownIcon,
    MagnifyingGlassIcon,
} from '@heroicons/react/20/solid';

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ModeToggle } from '../theme-icon';
import { useTheme } from 'next-themes';
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2';

const userNavigation = [
    { name: 'Your profile', href: '#' },
    { name: 'Sign out', href: '#' },
];

const AppTopbar = ({
    setSidebarOpen,
}: {
    setSidebarOpen: (open: boolean) => void;
}) => {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        if (theme === 'dark' || theme === 'system') {
            setTheme('light');
        }
        if (theme === 'light' || theme === 'system') {
            setTheme('dark');
        }
        // console.log('theme', theme);
    };

    return (
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-xs sm:gap-x-6 sm:px-6 lg:px-8 dark:border-gray-700 dark:bg-gray-900">
            <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="-m-2.5 cursor-pointer p-2.5 text-gray-700 lg:hidden"
            >
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon aria-hidden="true" className="size-6" />
            </button>

            {/* Separator */}
            <div
                aria-hidden="true"
                className="h-6 w-px bg-gray-900/10 lg:hidden"
            />

            <div className="flex flex-1 justify-between gap-x-4 self-stretch lg:gap-x-6">
                {/* <form
                    action="#"
                    method="GET"
                    className="grid flex-1 grid-cols-1"
                >
                    <input
                        name="search"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        className="col-start-1 row-start-1 block size-full bg-white pl-8 text-base text-gray-900 outline-hidden placeholder:text-gray-400 sm:text-sm/6"
                    />
                    <MagnifyingGlassIcon
                        aria-hidden="true"
                        className="pointer-events-none col-start-1 row-start-1 size-5 self-center text-gray-400"
                    />
                </form> */}
                <div></div>
                <div className="flex items-center gap-x-4 lg:gap-x-6">
                    <button
                        type="button"
                        className="flex-shrink-0 rounded-full bg-gray-100 p-2 text-gray-700 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800 focus-visible:outline-none dark:bg-gray-800 dark:text-gray-400"
                        onClick={toggleTheme}
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
                    </button>

                    {/* Separator */}
                    <div
                        aria-hidden="true"
                        className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
                    />

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative">
                        <MenuButton className="relative flex items-center">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <img
                                alt=""
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                className="size-8 rounded-full bg-gray-50"
                            />
                            <span className="hidden lg:flex lg:items-center">
                                <span
                                    aria-hidden="true"
                                    className="ml-4 text-sm/6 font-semibold"
                                >
                                    Tom Cook
                                </span>
                                <ChevronDownIcon
                                    aria-hidden="true"
                                    className="ml-2 size-5 text-gray-400"
                                />
                            </span>
                        </MenuButton>
                        <MenuItems
                            transition
                            className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                        >
                            {userNavigation.map(item => (
                                <MenuItem key={item.name}>
                                    <a
                                        href={item.href}
                                        className="block px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden"
                                    >
                                        {item.name}
                                    </a>
                                </MenuItem>
                            ))}
                        </MenuItems>
                    </Menu>
                </div>
            </div>
        </div>
    );
};

export default AppTopbar;
