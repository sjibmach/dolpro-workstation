'use client';

import { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import CellDescription from './cell-description';
import Link from 'next/link';
import { TJobOverviewTable } from '@/lib/prismaTypes';
import CellInterpreter from './cell-interpreter';

export const columns: ColumnDef<TJobOverviewTable>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && 'indeterminate')
                }
                onCheckedChange={value =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
                className="translate-y-[2px]"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={value => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-[2px]"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },

    {
        accessorKey: 'code',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Code" />
        ),
        cell: ({ row }) => <div className="w-[40px]">{row.original.code}</div>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'description',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Beschreibung" />
        ),
        cell: ({ row }) => {
            return (
                <CellDescription
                    description={row.original.description}
                    jobTypeId={row.original.jobTypeId}
                    jobId={row.original.id}
                />
            );
        },
    },
    {
        accessorKey: 'clientId',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Auftragsgeber" />
        ),
        cell: ({ row }) => {
            return (
                <Link
                    href={'/client/' + row.original.clientId + '/jobs'}
                    className="max-w-[140px] hover:underline"
                >
                    {row.original.client.name}
                </Link>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: 'interpreterId',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Dolmetscher" />
        ),
        cell: ({ row }) => {
            return <CellInterpreter row={row} />;
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },

    {
        accessorKey: 'statusId',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
            return (
                <div className="max-w-44">
                    <Badge variant="secondary">
                        {row.original.status.name}
                    </Badge>
                </div>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: 'languageToId',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Sprache" />
        ),
        cell: ({ row }) => {
            return (
                <div className="w-32">
                    <div>{row.original.languageTo.name}</div>
                </div>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: 'priorityId',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Priority" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex items-center">
                    <span>{row.original.priority?.name}</span>
                </div>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => <DataTableRowActions row={row} />,
    },
];
