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

const RHFCombobox = ({
    control,
    name,
    label,
    description,
    placeholder,
    showError = true,
    options,
    setValue,
}: {
    control: Control<any>;
    name: string;
    label?: string;
    description?: string;
    placeholder?: string;
    showError?: boolean;
    options: { id: string; name: string }[];
    setValue: UseFormSetValue<any>;
}) => {
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
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                        'w-[200px] justify-between',
                                        !field.value && 'text-muted-foreground'
                                    )}
                                >
                                    {field.value
                                        ? options.find(
                                              option =>
                                                  option.id === field.value
                                          )?.name
                                        : 'Auswählen'}
                                    <ChevronsUpDown className="opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                            <Command>
                                <CommandInput
                                    placeholder={placeholder || 'Suchen...'}
                                    className="h-9"
                                />
                                <CommandList>
                                    <CommandEmpty>
                                        Nichts gefunden.
                                    </CommandEmpty>
                                    <CommandGroup>
                                        {options.map(option => (
                                            <CommandItem
                                                value={option.id}
                                                key={option.id}
                                                onSelect={() => {
                                                    setValue(name, option.id);
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
