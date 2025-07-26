'use client';

import { Control, UseFormSetValue } from 'react-hook-form';

import {
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { TIdAndNameObject } from '@/lib/types';
import { MultiSelect } from '../ui/multi-select';

export function RHFMultiSelect({
    control,
    name,
    label,
    description,
    placeholder,
    showError = true,
    options = [],
    setValue,
}: {
    control: Control<any>;
    name: string;
    label?: string;
    description?: string;
    placeholder?: string;
    showError?: boolean;
    options: TIdAndNameObject[];
    setValue: UseFormSetValue<any>;
}) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    {label && <FormLabel>{label}</FormLabel>}
                    <MultiSelect
                        defaultValue={field.value}
                        options={options}
                        onValueChange={value => {
                            setValue(name, value);
                        }}
                    />
                    {description && (
                        <FormDescription>{description}</FormDescription>
                    )}
                    <FormMessage />
                    {showError && <FormMessage />}
                </FormItem>
            )}
        />
    );
}
