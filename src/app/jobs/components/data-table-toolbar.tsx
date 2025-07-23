'use client';

import { Table } from '@tanstack/react-table';
import { ArrowDown, ArrowRight, ArrowUp, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { DataTableViewOptions } from './data-table-view-options';
import { JobAddModal } from '@/components/modals/app-modals/job-add-modal';
import {
    useQueryInterpretersForJobs,
    useQueryJobPriorities,
    useQueryJobStatuses,
} from '@/hooks/react-query/react-query-hooks';
import { HiArrowRight, HiArrowUp } from 'react-icons/hi2';
import { useQueryClient } from '@tanstack/react-query';

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
}

export const prioritiesd = [
    { id: 'low', icon: ArrowDown },
    {
        id: 'medium',
        icon: ArrowRight,
    },
    {
        value: 'high',
        icon: ArrowUp,
    },
];

export function DataTableToolbar<TData>({
    table,
}: DataTableToolbarProps<TData>) {
    const { data: jobPriorities, isLoading: isLoadingJobPriorities } =
        useQueryJobPriorities();

    const jobPrioritiesWithIcons = jobPriorities?.map(jp => {
        return {
            id: jp.id,
            name: jp.name,
            icon:
                jp.id === 'high'
                    ? HiArrowUp
                    : jp.id === 'medium'
                      ? HiArrowRight
                      : HiArrowUp,
        };
    });

    const { data: jobStatuses, isLoading: isLoadingJobStatuses } =
        useQueryJobStatuses();

    const { data: clients, isLoading: isLoadingClients } =
        useQueryInterpretersForJobs();

    const isFiltered = table.getState().columnFilters.length > 0;

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 flex-wrap items-center space-x-2">
                <Input
                    placeholder="Aufträge filtern..."
                    value={
                        (table
                            .getColumn('description')
                            ?.getFilterValue() as string) ?? ''
                    }
                    onChange={event => {
                        table
                            .getColumn('description')
                            ?.setFilterValue(event.target.value);
                    }}
                    className="h-8 w-[150px] lg:w-[250px]"
                />
                {table.getColumn('clientName') && !isLoadingJobStatuses && (
                    <DataTableFacetedFilter
                        column={table.getColumn('clientName')}
                        title="Auftragsgeber"
                        options={clients}
                    />
                )}
                {table.getColumn('statusId') && !isLoadingJobStatuses && (
                    <DataTableFacetedFilter
                        column={table.getColumn('statusId')}
                        title="Status"
                        options={jobStatuses}
                    />
                )}
                {table.getColumn('priorityId') && !isLoadingJobPriorities && (
                    <DataTableFacetedFilter
                        column={table.getColumn('priorityId')}
                        title="Dringlichkeit"
                        options={jobPrioritiesWithIcons}
                    />
                )}
                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => table.resetColumnFilters()}
                        className="h-8 px-2 lg:px-3"
                    >
                        Reset
                        <X />
                    </Button>
                )}
            </div>
            <div className="flex items-center gap-2">
                <JobAddModal />
                <DataTableViewOptions table={table} />
            </div>
        </div>
    );
}
