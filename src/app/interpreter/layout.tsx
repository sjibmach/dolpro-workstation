import TwoColumnsLayout from '@/components/layout/two-column-layout';
import { ReactNode } from 'react';
import { TClientWithStatus } from '@/lib/prismaTypes';
import { prisma } from '@/lib/prisma';
import InterpretersSidetable from '@/components/sidetables/interpreters-sidetable';

export const dynamic = 'force-dynamic';

const InterpreterLayout = async ({ children }: { children: ReactNode }) => {
    const interpreters: TClientWithStatus[] = await prisma.client.findMany({
        orderBy: { createdAt: 'desc' },
        include: { status: true },
    });

    return (
        <TwoColumnsLayout
            asideContent={<InterpretersSidetable interpreters={interpreters} />}
        >
            {children}
        </TwoColumnsLayout>
    );
};

export default InterpreterLayout;
