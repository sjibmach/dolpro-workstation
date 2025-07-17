import { Metadata } from 'next';

import { columns } from './components/columns';
import { DataTable } from './components/data-table';
import { tasks } from './data/tasks';
import { prisma } from '@/lib/prisma';
import { TJobTable } from './data/schema';

export const metadata: Metadata = {
    title: 'Aufträge',
    description: 'Hier wird eine Liste von Aufträgen angezeigt.',
};

export default async function TaskPage() {
    const jobs = await prisma.job.findMany({
        select: {
            id: true,
            code: true,
            clientId: true,
            client: { select: { name: true } },
            description: true,
            jobTypeId: true,
            jobType: { select: { name: true } },
            statusId: true,
            status: { select: { name: true } },
            languageToId: true,
            languageTo: { select: { name: true } },
            priorityId: true,
            priority: { select: { name: true } },
            createdAt: true,
            updatedAt: true,
        },
    });

    const convertedJobs: TJobTable[] = jobs.map(job => ({
        id: job.id,
        code: job.code,
        clientId: job.clientId,
        clientName: job.client.name!,
        description: job.description,
        jobTypeId: job.jobTypeId,
        jobTypeName: job.jobType?.name || null,
        statusId: job.statusId,
        statusName: job.status?.name || null,
        languageToId: job.languageToId,
        languageToName: job.languageTo?.name || null,
        priorityId: job.priorityId,
        priorityName: job.priority?.name,
    }));

    return (
        <div className="flex h-full flex-col space-y-8 p-8">
            <h2 className="text-2xl font-bold tracking-tight">Aufträge</h2>
            <DataTable data={convertedJobs} columns={columns} />
        </div>
    );
}
