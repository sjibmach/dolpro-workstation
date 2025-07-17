'use client';

import { ColumnDef } from '@tanstack/react-table';

import { priorities } from '../data/data';
import { TJobTable } from '../data/schema';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import DescriptionCell from './description-cell';

export const columns: ColumnDef<TJobTable>[] = [
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
        cell: ({ row }) => <div className="w-[80px]">{row.original.code}</div>,
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
                <DescriptionCell
                    description={row.original.description}
                    jobTypeId={row.original.jobTypeId}
                />
            );
        },
    },
    {
        accessorKey: 'clientName',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Auftragsgeber" />
        ),
        cell: ({ row }) => {
            return <div className="w-32">{row.original.clientName}</div>;
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
                <div className="w-44">
                    <Badge variant="secondary">{row.original.statusName}</Badge>
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
                    <div>{row.original.languageToName}</div>
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
            // const priority = priorities.find(
            //     priority => priority.value === row.getValue('priority')
            // );

            // if (!priority) {
            //     return null;
            // }

            return (
                <div className="flex items-center">
                    {/* {priority.icon && (
                        <priority.icon className="text-muted-foreground mr-2 h-4 w-4" />
                    )} */}
                    <span>{row.original.priorityName}</span>
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
