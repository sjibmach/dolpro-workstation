import { Metadata } from 'next';

import { columns } from './components/columns';
import { DataTable } from './components/data-table';
import { prisma } from '@/lib/prisma';
import { TJobOverviewTable } from '@/lib/prismaTypes';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Aufträge',
    description: 'Hier wird eine Liste von Aufträgen angezeigt.',
};

export default async function JobsPage() {
    const jobs: TJobOverviewTable[] = await prisma.job.findMany({
        include: {
            client: true,
            interpreter: true,
            status: true,
            languageTo: true,
            addressCity: true,
            priority: true,
            jobType: true,
            jobMode: true,
            creator: true,
        },
        orderBy: {
            createdAt: 'asc',
        },
    });

    return (
        <div className="flex h-full flex-col space-y-8 p-8">
            <h2 className="text-2xl font-bold tracking-tight">Aufträge</h2>
            <DataTable data={jobs} columns={columns} />
        </div>
    );
}
