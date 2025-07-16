'use client';

import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';

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

import { Control, UseFormSetValue } from 'react-hook-form';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

const RHFCombobox = ({
    control,
    name,
    label,
    description,
    placeholder,
    showError = true,
    options,
    setValue,
    creatable = false,
}: {
    control: Control<any>;
    name: string;
    label?: string;
    description?: string;
    placeholder?: string;
    showError?: boolean;
    options: { id: string; name: string }[];
    setValue: UseFormSetValue<any>;
    creatable?: boolean;
}) => {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [localOptions, setLocalOptions] = useState(options);

    useEffect(() => {
        setLocalOptions(options);
    }, [options]);

    const filteredOptions = useMemo(() => {
        return localOptions.filter(option =>
            option.name.toLowerCase().includes(query.toLowerCase())
        );
    }, [query, localOptions]);

    const exactMatch = localOptions.some(
        option => option.name.toLowerCase() === query.toLowerCase()
    );

    const handleCreate = () => {
        const newOption = { id: 'new_' + query, name: query };
        setLocalOptions(prev => [...prev, newOption]);
        setValue(name, newOption.id);
        setOpen(false);
    };

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex flex-col">
                    {label && <FormLabel>{label}</FormLabel>}
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                        'max-w-[300px] justify-between font-normal',
                                        !field.value && 'text-muted-foreground'
                                    )}
                                >
                                    {field.value
                                        ? localOptions.find(
                                              opt => opt.id === field.value
                                          )?.name
                                        : 'Auswählen'}
                                    <ChevronsUpDown className="opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="max-h-[280px] max-w-[300px] overflow-y-auto p-0">
                            <Command
                                onKeyDown={e => {
                                    if (
                                        creatable &&
                                        e.key === 'Enter' &&
                                        query &&
                                        !exactMatch
                                    ) {
                                        e.preventDefault();
                                        handleCreate();
                                    }
                                }}
                            >
                                <CommandInput
                                    placeholder={placeholder || 'Suchen...'}
                                    className="h-9"
                                    value={query}
                                    onValueChange={setQuery}
                                />
                                <CommandList>
                                    {filteredOptions.length > 0 && (
                                        <CommandGroup heading="Vorschläge">
                                            {filteredOptions.map(option => (
                                                <CommandItem
                                                    key={option.id}
                                                    value={option.name}
                                                    onSelect={() => {
                                                        setValue(
                                                            name,
                                                            option.id
                                                        );
                                                        setOpen(false);
                                                    }}
                                                >
                                                    {option.name}
                                                    <Check
                                                        className={cn(
                                                            'ml-auto',
                                                            option.id ===
                                                                field.value
                                                                ? 'opacity-100'
                                                                : 'opacity-0'
                                                        )}
                                                    />
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    )}

                                    {creatable &&
                                        !exactMatch &&
                                        query.trim() !== '' && (
                                            <CommandGroup heading="Neu erstellen">
                                                <CommandItem
                                                    onSelect={handleCreate}
                                                    value={`create-${query}`}
                                                >
                                                    <span>
                                                        „{query}“ erstellen
                                                    </span>
                                                </CommandItem>
                                            </CommandGroup>
                                        )}
                                </CommandList>
                            </Command>
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
};

export default RHFCombobox;
