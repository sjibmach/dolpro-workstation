'use client';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Control } from 'react-hook-form';

export function RHFDatePicker({
    control,
    name,
    label,
    description,
    showError = true,
}: {
    control: Control<any>;
    name: string;
    label?: string;
    description?: string;
    showError?: boolean;
}) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex flex-col">
                    {label && <FormLabel>{label}</FormLabel>}
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant={'outline'}
                                    className={cn(
                                        'w-[240px] pl-3 text-left font-normal',
                                        !field.value && 'text-muted-foreground'
                                    )}
                                >
                                    {field.value ? (
                                        format(field.value, 'DD MMM JJJJ')
                                    ) : (
                                        <span>Datum auswählen</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={date =>
                                    date > new Date() ||
                                    date < new Date('1900-01-01')
                                }
                                captionLayout="dropdown"
                            />
                        </PopoverContent>
                    </Popover>
                    {description && (
                        <FormDescription>{description}</FormDescription>
                    )}
                    {showError && <FormMessage />}
                </FormItem>
            )}
        />
    );
}
