import React from 'react';
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';

import { Control } from 'react-hook-form';
import { Input } from '@/components/ui/input';

const RHFInput = ({
    control,
    name,
    label,
    description,
    placeholder,
    showError = true,
}: {
    control: Control<any>;
    name: string;
    label?: string;
    description?: string;
    placeholder?: string;
    showError?: boolean;
}) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    {label && <FormLabel>{label}</FormLabel>}
                    <FormControl>
                        <Input placeholder={placeholder} {...field} />
                    </FormControl>
                    {description && (
                        <FormDescription>{description}</FormDescription>
                    )}
                    {showError && <FormMessage />}
                </FormItem>
            )}
        />
    );
};

export default RHFInput;
