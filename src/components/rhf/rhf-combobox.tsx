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
    options = [],
    setValue,
    creatable = false,
}: {
    control: Control<any>;
    name: string;
    label?: string;
    description?: string;
    placeholder?: string;
    showError?: boolean;
    options: { id: string; name: string }[] | undefined;
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
                                    <span className="truncate">
                                        {field.value
                                            ? localOptions.find(
                                                  opt => opt.id === field.value
                                              )?.name
                                            : placeholder || 'Auswählen'}
                                    </span>
                                    <ChevronsUpDown className="opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="max-w-[300px] overflow-y-auto p-0">
                            <Command>
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
                                                        if (
                                                            !(
                                                                field.value ===
                                                                option.id
                                                            )
                                                        )
                                                            setValue(
                                                                name,
                                                                option.id,
                                                                {
                                                                    shouldDirty: true,
                                                                }
                                                            );
                                                        else
                                                            setValue(
                                                                name,
                                                                null,
                                                                {
                                                                    shouldDirty: true,
                                                                }
                                                            );
                                                        setOpen(false);
                                                    }}
                                                >
                                                    <span className="truncate">
                                                        {option.name}
                                                    </span>
                                                    {option.id ===
                                                        field.value && (
                                                        <Check className="ml-auto" />
                                                    )}
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
