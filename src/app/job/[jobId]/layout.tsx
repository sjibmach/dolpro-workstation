import { prisma } from '@/lib/prisma';
import { ReactNode } from 'react';

export const dynamic = 'force-dynamic';

export type paramsType = Promise<{ jobId: string }>;

const JobIdLayout = async ({
    children,
    params,
}: {
    children: ReactNode;
    params: paramsType;
}) => {
    const { jobId } = await params;

    if (!jobId) return <>No Job Id Provided</>;

    const job = await prisma.job.findFirst({
        where: { id: jobId },
    });

    if (!job) return <>No Job Found</>;

    const jobTitle = job.code + (job.description ? ' ' + job.description : '');

    return (
        <div>
            <div className="mb-6">
                <h1
                    className="max-w-lg truncate text-3xl font-bold"
                    title={jobTitle}
                >
                    {jobTitle}
                </h1>
                <p>This is the job page for job with ID: {jobId} </p>
            </div>
            {children}
        </div>
    );
};

export default JobIdLayout;
