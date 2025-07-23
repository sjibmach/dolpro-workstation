import TwoColumnsLayout from '@/components/layout/two-column-layout';
import { ReactNode } from 'react';
import { prisma } from '@/lib/prisma';
import InterpretersSidetable from '@/components/sidetables/interpreters-sidetable';
import { TInterpreterWithStatus } from '@/lib/prismaTypes';

export const dynamic = 'force-dynamic';

const InterpreterLayout = async ({ children }: { children: ReactNode }) => {
    const interpreters: TInterpreterWithStatus[] =
        await prisma.interpreter.findMany({
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
