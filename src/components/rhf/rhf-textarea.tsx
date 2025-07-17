'use client';

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
import { Textarea } from '@/components/ui/textarea';

export function RHFTextArea({
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
}) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    {label && <FormLabel>{label}</FormLabel>}
                    <FormControl>
                        <Textarea
                            placeholder={placeholder || 'Hier eingeben...'}
                            className="resize-none"
                            {...field}
                        />
                    </FormControl>
                    {description && (
                        <FormDescription>{description}</FormDescription>
                    )}
                    {showError && <FormMessage />}
                </FormItem>
            )}
        />
    );
}
