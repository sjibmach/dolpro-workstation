'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { IconType } from 'react-icons';

export type TabsType = {
    name: string;
    href: string;
    title: string;
    icon: IconType;
    current: boolean;
};

type TabsListProps = {
    tabs: TabsType[];
};

const TabsList: React.FC<TabsListProps> = ({ tabs }) => {
    return (
        <div className="my-3 block w-fit rounded-lg bg-gray-100 p-1 dark:bg-gray-900">
            <div
                className="flex flex-wrap justify-start gap-2"
                aria-label="Tabs"
            >
                {tabs.map(tab => {
                    const Icon = tab.icon;
                    return (
                        <Link
                            href={tab.href}
                            key={tab.name}
                            className="focus-visible:ring-opacity-75 rounded-md focus-visible:ring-1 focus-visible:ring-orange-600 focus-visible:ring-offset-1 focus-visible:outline-none dark:ring-orange-900"
                            aria-current
                            aria-label={tab.name}
                        >
                            <div
                                className={cn(
                                    tab.current
                                        ? 'bg-orange-100 font-semibold text-orange-700 dark:bg-orange-800 dark:text-white'
                                        : 'text-gray-500 hover:bg-orange-100 dark:text-gray-400 hover:dark:bg-orange-800 hover:dark:text-white',
                                    'flex transform items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium'
                                )}
                            >
                                <Icon className="h-5 w-5" aria-hidden="true" />

                                <span className="hidden sm:inline">
                                    {tab.title}
                                </span>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default TabsList;
