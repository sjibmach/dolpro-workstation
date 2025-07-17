import * as React from 'react';
import { Column } from '@tanstack/react-table';
import { Check, PlusCircle } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { IconType } from 'react-icons';

interface DataTableFacetedFilterProps<TData, TValue> {
    column?: Column<TData, TValue>;
    title?: string;
    options:
        | {
              name: string;
              id: string;
              icon?: IconType;
          }[]
        | undefined;
}

export function DataTableFacetedFilter<TData, TValue>({
    column,
    title,
    options,
}: DataTableFacetedFilterProps<TData, TValue>) {
    const facets = column?.getFacetedUniqueValues();
    const selectedValues = new Set(column?.getFilterValue() as string[]);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="h-8 border-dashed"
                >
                    <PlusCircle />
                    {title}
                    {selectedValues?.size > 0 && (
                        <>
                            <Separator
                                orientation="vertical"
                                className="mx-2 h-4"
                            />
                            <Badge
                                variant="secondary"
                                className="rounded-sm px-1 font-normal lg:hidden"
                            >
                                {selectedValues.size}
                            </Badge>
                            <div className="hidden space-x-1 lg:flex">
                                {selectedValues.size > 2 ? (
                                    <Badge
                                        variant="secondary"
                                        className="rounded-sm px-1 font-normal"
                                    >
                                        {selectedValues.size} ausgewählt
                                    </Badge>
                                ) : (
                                    options
                                        ?.filter(option =>
                                            selectedValues.has(option.id)
                                        )
                                        .map(option => (
                                            <Badge
                                                variant="secondary"
                                                key={option.id}
                                                className="rounded-sm px-1 font-normal"
                                            >
                                                {option.name}
                                            </Badge>
                                        ))
                                )}
                            </div>
                        </>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[290px] p-0" align="start">
                <Command>
                    <CommandInput placeholder={title} />
                    <CommandList>
                        <CommandEmpty>Kein Ergebnis.</CommandEmpty>
                        <CommandGroup>
                            {options?.map(option => {
                                const isSelected = selectedValues.has(
                                    option.id
                                );
                                return (
                                    <CommandItem
                                        key={option.id}
                                        onSelect={() => {
                                            if (isSelected) {
                                                selectedValues.delete(
                                                    option.id
                                                );
                                            } else {
                                                selectedValues.add(option.id);
                                            }
                                            const filterValues =
                                                Array.from(selectedValues);
                                            column?.setFilterValue(
                                                filterValues.length
                                                    ? filterValues
                                                    : undefined
                                            );
                                        }}
                                    >
                                        <div
                                            className={cn(
                                                'border-primary mr-2 flex h-4 w-4 items-center justify-center rounded-sm border',
                                                isSelected
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'opacity-50 [&_svg]:invisible'
                                            )}
                                        >
                                            <Check />
                                        </div>
                                        {option.icon && (
                                            <option.icon className="text-muted-foreground mr-2 h-4 w-4" />
                                        )}
                                        <span>{option.name}</span>
                                        {facets?.get(option.id) && (
                                            <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                                                {facets.get(option.id)}
                                            </span>
                                        )}
                                    </CommandItem>
                                );
                            })}
                        </CommandGroup>
                        {selectedValues.size > 0 && (
                            <>
                                <CommandSeparator />
                                <CommandGroup>
                                    <CommandItem
                                        onSelect={() =>
                                            column?.setFilterValue(undefined)
                                        }
                                        className="justify-center text-center"
                                    >
                                        Clear filters
                                    </CommandItem>
                                </CommandGroup>
                            </>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
