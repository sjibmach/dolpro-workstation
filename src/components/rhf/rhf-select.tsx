'use client';

import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { Control, useForm } from 'react-hook-form';
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

export function RHFSelect({
    control,
    name,
    label,
    description,
    placeholder,
    showError = true,
    options = [],
}: {
    control: Control<any>;
    name: string;
    label?: string;
    description?: string;
    placeholder?: string;
    showError?: boolean;
    options: TIdAndNameObject[];
}) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    {label && <FormLabel>{label}</FormLabel>}
                    <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                    >
                        <FormControl>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {options.map(option => (
                                <SelectItem key={option.id} value={option.id}>
                                    {option.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
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
