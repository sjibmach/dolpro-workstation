import TwoColumnsLayout from '@/components/layout/two-column-layout';
import { ReactNode } from 'react';
import JobsSidetable from '@/components/sidetables/jobs-sidetable';
import { TJobForSideTable } from '@/lib/prismaTypes';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

const JobLayout = async ({ children }: { children: ReactNode }) => {
    const jobs: TJobForSideTable[] = await prisma.job.findMany({
        orderBy: { createdAt: 'desc' },
        include: { status: true, client: true },
    });

    return (
        <TwoColumnsLayout asideContent={<JobsSidetable jobs={jobs} />}>
            {children}
        </TwoColumnsLayout>
    );
};

export default JobLayout;
