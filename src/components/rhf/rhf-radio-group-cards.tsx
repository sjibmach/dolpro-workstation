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
import { RadioGroupCards } from '../custom-ui/radio-group-cards';

export function RHFRadioGroupCards({
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
                        <RadioGroupCards
                            name={name}
                            options={options}
                            onChange={field.onChange}
                            value={field.value}
                        ></RadioGroupCards>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
