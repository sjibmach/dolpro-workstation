'use client';

import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cn } from '@/lib/utils';

type Option = {
    id: string;
    name: string;
    disabled?: boolean;
};

type RadioGroupCardProps = {
    options: Option[];
    value?: string;
    onChange?: (value: string) => void;
    name: string;
};

export function RadioGroupCards({
    options,
    value,
    onChange,
    name,
}: RadioGroupCardProps) {
    return (
        <RadioGroupPrimitive.Root
            className="flex flex-wrap items-center gap-2"
            value={value}
            onValueChange={onChange}
            name={name}
        >
            {options.map(option => (
                <RadioGroupPrimitive.Item
                    key={option.id}
                    value={option.id}
                    disabled={option.disabled}
                    className={cn(
                        // Basis-Styling
                        'group relative flex items-center justify-center rounded-md border px-1.5 py-0.5 text-sm data-[state=checked]:font-medium',
                        'focus-visible:outline-ring transition-colors focus-visible:outline-2 focus-visible:outline-offset-2',
                        'disabled:cursor-not-allowed disabled:opacity-50',

                        // Farben (Light + Dark Mode)
                        'border-input dark:bg-input/30 bg-white',
                        'data-[state=checked]:bg-primary data-[state=checked]:border-primary',
                        'hover:bg-muted/50',

                        // Dark Mode explizit
                        'dark:border-input dark:text-primary dark:data-[state=checked]:bg-primary dark:data-[state=checked]:text-primary-foreground'
                    )}
                >
                    <span>{option.name}</span>
                </RadioGroupPrimitive.Item>
            ))}
        </RadioGroupPrimitive.Root>
    );
}
