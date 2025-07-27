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
import { useState } from 'react';
import { Label } from '../ui/label';

export function Combobox({
    options,
    label,
    placeholder = 'Wähle eine Option',
    initialValue = '',
    onChange = () => {},
}: {
    options: { id: string; name: string }[];
    label?: string;
    placeholder?: string;
    initialValue: string | null | undefined;
    onChange?: (v: string) => void;
}) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(initialValue);

    return (
        <>
            {label && <Label>{label}</Label>}
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[200px] justify-between"
                    >
                        <span className="truncate">
                            {value
                                ? options.find(option => option.id === value)
                                      ?.name
                                : 'Auswählen...'}
                        </span>
                        <ChevronsUpDown className="opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className="max-w-[200px] p-0"
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
                                            onChange(currentValue);
                                            setValue(
                                                currentValue === value
                                                    ? ''
                                                    : currentValue
                                            );
                                            setOpen(false);
                                        }}
                                    >
                                        <span className="truncate">
                                            {option.name}
                                        </span>
                                        {value === option.id && (
                                            <Check className="ml-auto" />
                                        )}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </>
    );
}
