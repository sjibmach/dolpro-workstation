'use client';

import { cn } from '@/lib/utils';
import { Switch } from '@headlessui/react';
import Link from 'next/link';
import * as React from 'react';
import { IconType } from 'react-icons';
import { HiChevronRight, HiPlus } from 'react-icons/hi2';

// used to organize the the new cards in a column

const NewCardContainer = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col gap-4', className)} {...props}>
        {children}
    </div>
));

NewCardContainer.displayName = 'NewCardContainer';

const NewCard = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => (
    <section ref={ref} className={cn(className)} {...props}>
        {children}
    </section>
));
NewCard.displayName = 'NewCard';

const NewCardHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ title, className, children, ...props }, ref) => (
    <div
        ref={ref}
        className={cn('mb-1.5 text-base font-bold', className)}
        {...props}
    >
        {title}
        {children}
    </div>
));
NewCardHeader.displayName = 'NewCardHeader';

interface NewCardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
    featured?: boolean;
    featuredColor?: string;
    featuredContent?: React.ReactNode;
    featuredText?: string;
}

const NewCardBody = React.forwardRef<HTMLDivElement, NewCardBodyProps>(
    (
        {
            children,
            className,
            featured,
            featuredColor,
            featuredContent,
            featuredText,
            ...props
        },
        ref
    ) => (
        <div
            {...props}
            ref={ref}
            className={cn(
                !featured ? '' : 'rounded-xl p-0.5',
                featuredColor === 'gray'
                    ? 'bg-gray-200 dark:bg-gray-900'
                    : featuredColor === 'blue'
                      ? 'bg-blue-200 dark:bg-blue-900'
                      : featuredColor === 'green'
                        ? 'bg-green-200 dark:bg-green-900'
                        : featuredColor === 'yellow'
                          ? 'bg-yellow-200 dark:bg-yellow-900'
                          : featuredColor === 'orange'
                            ? 'bg-orange-200 dark:bg-orange-900'
                            : featuredColor === 'red'
                              ? 'bg-red-200 dark:bg-red-900'
                              : ''
            )}
        >
            {featured && featuredText && (
                <div className="px-4 py-1 text-sm font-bold text-gray-700 dark:text-gray-200">
                    {featuredText}
                </div>
            )}
            {featured && featuredContent && featuredContent}
            <ul
                className={cn(
                    className,
                    'rounded-xl border border-gray-300 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:shadow-gray-800'
                )}
            >
                {children}
            </ul>
        </div>
    )
);
NewCardBody.displayName = 'NewCardBody';

interface NewCardItemProps extends React.HTMLAttributes<HTMLLIElement> {
    last?: boolean;
    first?: boolean;
    label?: React.ReactNode;
    compact?: boolean;
}

const NewCardItem = React.forwardRef<HTMLLIElement, NewCardItemProps>(
    ({ children, className, last, first, compact = false, ...props }, ref) => (
        <li
            ref={ref}
            className={cn(
                'dark:border-gray-700',
                !compact
                    ? 'min-h-[60px] px-5 py-3'
                    : 'min-h-[40px] px-4 py-1.5 text-sm',
                !last && 'border-b border-gray-200 dark:border-gray-700',
                last && 'rounded-b-xl',
                first && 'rounded-t-xl',
                className
            )}
            {...props}
        >
            {children}
        </li>
    )
);

NewCardItem.displayName = 'NewCardItem';

interface NewCardItemAsButtonProps extends React.HTMLAttributes<HTMLLIElement> {
    icon?: IconType;
    last?: boolean;
    first?: boolean;
    label: React.ReactNode;
    href?: string;
    disabled?: boolean;
}

const NewCardItemAsButton = React.forwardRef<
    HTMLLIElement,
    NewCardItemAsButtonProps
>(
    (
        { icon: Icon, last, label, first, href, disabled, className, ...props },
        ref
    ) => {
        const content = (
            <>
                <div className="flex-none text-gray-500 dark:text-gray-400">
                    {Icon ? <Icon size={24} /> : <HiPlus size={24} />}
                </div>
                <div className="flex flex-1 items-center justify-between">
                    <div className="text-base font-semibold">{label}</div>
                    <div className="flex-none rounded-lg p-1.5 text-gray-700 dark:text-gray-400">
                        <HiChevronRight size={25} />
                    </div>
                </div>
            </>
        );

        return (
            <li
                ref={ref}
                {...props}
                className={cn(
                    'min-h-[60px] px-5 py-3 hover:bg-gray-100 dark:hover:bg-gray-800',
                    !last && 'border-b border-gray-100 dark:border-gray-800',
                    last && 'rounded-b-xl',
                    first && 'rounded-t-xl',
                    className
                )}
            >
                {href ? (
                    <Link
                        href={href}
                        className="flex w-full items-center justify-between gap-5 transition"
                    >
                        {content}
                    </Link>
                ) : (
                    <button
                        disabled={disabled}
                        className="flex w-full items-center justify-between gap-5 transition disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {content}
                    </button>
                )}
            </li>
        );
    }
);

NewCardItemAsButton.displayName = 'NewCardItemAsButton';

const NewCardItemAddButton = React.forwardRef<HTMLLIElement, NewCardItemProps>(
    ({ last, label, first, className, ...props }, ref) => {
        return (
            <NewCardItem onClick={props.onClick}>
                <div className="flex cursor-pointer items-center justify-between">
                    <div className="font-semibold text-gray-600 dark:text-gray-400">
                        {label}
                    </div>
                    <div className="flex-none cursor-pointer rounded-lg p-1.5 text-gray-700 transition hover:bg-blue-100 dark:text-gray-400 dark:hover:bg-gray-800">
                        <HiPlus size={26} />
                    </div>
                </div>
            </NewCardItem>
        );
    }
);

NewCardItemAddButton.displayName = 'NewCardItemAddButton';

export {
    NewCard,
    NewCardBody,
    NewCardHeader,
    NewCardItem,
    NewCardContainer,
    NewCardItemAsButton,
    NewCardItemAddButton,
};
