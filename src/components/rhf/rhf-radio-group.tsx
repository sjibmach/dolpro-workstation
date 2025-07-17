'use client';

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { Control } from 'react-hook-form';

export function RHFRadioGroup({
    control,
    name,
    label,
    direction = 'horizontal',
    options = [],
}: {
    control: Control<any>;
    name: string;
    label?: string;
    direction?: 'horizontal' | 'vertical';
    options?: { id: string; name: string }[];
}) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="space-y-3">
                    {label && <FormLabel>{label}</FormLabel>}
                    <FormControl>
                        <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className={cn(
                                'flex gap-4',
                                direction === 'vertical'
                                    ? 'flex-col'
                                    : 'flex-row'
                            )}
                        >
                            {options.map(option => (
                                <FormItem
                                    key={option.id}
                                    className="flex items-center gap-3"
                                >
                                    <FormControl>
                                        <RadioGroupItem
                                            value={option.id}
                                            checked={field.value === option.id}
                                        />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                        {option.name}
                                    </FormLabel>
                                </FormItem>
                            ))}
                        </RadioGroup>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
