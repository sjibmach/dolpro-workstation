'use client';

import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { FormItem, FormLabel } from '../ui/form';
import { useState } from 'react';

export function Combobox({
    options,
    label,
    placeholder = 'Wähle eine Option',
}: {
    options: { id: string; name: string }[];
    label?: string;
    placeholder?: string;
}) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');

    return (
        <FormItem>
            {label && <FormLabel>{label}</FormLabel>}
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[200px] justify-between"
                    >
                        {value
                            ? options.find(option => option.id === value)?.name
                            : 'Select ...'}
                        <ChevronsUpDown className="opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className="w-[200px] p-0"
                    // side="right"
                    align="start"
                >
                    <Command>
                        <CommandInput
                            placeholder={placeholder}
                            className="h-9"
                        />
                        <CommandList>
                            <CommandEmpty>Nichts gefunden</CommandEmpty>
                            <CommandGroup>
                                {options.map(option => (
                                    <CommandItem
                                        key={option.id}
                                        value={option.id}
                                        onSelect={currentValue => {
                                            setValue(
                                                currentValue === value
                                                    ? ''
                                                    : currentValue
                                            );
                                            setOpen(false);
                                        }}
                                    >
                                        {option.name}
                                        <Check
                                            className={cn(
                                                'ml-auto',
                                                value === option.id
                                                    ? 'opacity-100'
                                                    : 'opacity-0'
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </FormItem>
    );
}
