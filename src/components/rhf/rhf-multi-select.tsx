'use client';

import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { Control, useForm, UseFormSetValue } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
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
                        options={options}
                        onValueChange={value => {
                            setValue(
                                name,
                                value.map(v => ({
                                    id: v,
                                }))
                            );
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
