'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import {
    NewCard,
    NewCardBody,
    NewCardHeader,
    NewCardItem,
} from '@/components/custom-ui/new-card';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

import { Badge } from '../ui/badge';

import { TJobForSideTable } from '@/lib/prismaTypes';
import { cn } from '@/lib/utils';
import { ClientAddModal } from '@/components/modals/app-modals/client-add-modal';
import { format } from 'date-fns';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi2';

const JobsSidetable = ({ jobs }: { jobs: TJobForSideTable[] | undefined }) => {
    const params = useParams();
    const clientId = params.clientId as string;
    const [searchQuery, setSearchQuery] = useState('');

    const filteredJobs = jobs?.filter(job =>
        job.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <NewCard>
            <NewCardHeader className="flex items-center gap-1">
                <Link
                    className="cursor-pointer rounded-lg p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                    href="/jobs"
                >
                    <HiArrowLeft size={20} />
                </Link>
                <div className="flex flex-1 items-center justify-between">
                    Aufträge
                    <ClientAddModal />
                </div>
            </NewCardHeader>
            <Input
                placeholder="Suchen"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="mb-2"
            />
            <NewCardBody className="max-h-[calc(100vh-200px)] overflow-y-auto">
                {filteredJobs && filteredJobs.length > 0 ? (
                    <>
                        {filteredJobs.map((job, index) => (
                            <Link
                                href={`/job/${job.id}`}
                                title={job.description || ''}
                                key={job.id}
                            >
                                <NewCardItem
                                    compact
                                    last={index === filteredJobs.length - 1}
                                    className={cn(
                                        'flex items-center justify-between',
                                        job.id === clientId
                                            ? 'bg-amber-100 dark:bg-amber-800'
                                            : 'hover:bg-amber-50 dark:hover:bg-amber-700'
                                    )}
                                >
                                    <div className="flex w-full flex-col justify-between gap-0.5">
                                        <div className="flex items-center justify-between">
                                            <span className="max-w-full truncate text-sm">
                                                {job.code ? job.code : ''}{' '}
                                                {job.description}
                                            </span>
                                            {/* <DropdownMenu>
                                                <DropdownMenuTrigger
                                                    asChild
                                                    className="flex-none cursor-pointer"
                                                >
                                                    <button
                                                        type="button"
                                                        className="flex items-center justify-center p-1"
                                                        aria-label="Mehr Aktionen"
                                                    >
                                                        <HiOutlineDotsHorizontal />
                                                    </button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent
                                                    className="w-56"
                                                    align="start"
                                                >
                                                    <DropdownMenuItem
                                                        onClick={e => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                        }}
                                                    >
                                                        <ClientDeleteAlertModal
                                                            clientId={job.id}
                                                        />
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu> */}
                                        </div>
                                        <div className="flex flex-wrap gap-0.5">
                                            {job.statusId && (
                                                <Badge
                                                    className="text-xs"
                                                    variant="secondary"
                                                >
                                                    {job.status?.name}
                                                </Badge>
                                            )}
                                            <Badge
                                                className="text-xs"
                                                variant="secondary"
                                            >
                                                {job.client?.nameShortcut ||
                                                    job.client.name}
                                            </Badge>
                                            {job.jobDate && (
                                                <Badge
                                                    className="text-xs"
                                                    variant="secondary"
                                                >
                                                    {format(
                                                        new Date(job.jobDate),
                                                        'dd.MMM.yyyy'
                                                    )}
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                </NewCardItem>
                            </Link>
                        ))}
                    </>
                ) : (
                    <NewCardItem compact>
                        <span className="text-sm text-gray-500">
                            Keine Auftragsgeber gefunden.
                        </span>
                    </NewCardItem>
                )}
            </NewCardBody>
        </NewCard>
    );
};

export default JobsSidetable;
