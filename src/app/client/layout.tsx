import TwoColumnsLayout from '@/components/layout/two-column-layout';
import { ReactNode } from 'react';
import { TClientWithStatus } from '@/lib/prismaTypes';
import { prisma } from '@/lib/prisma';
import ClientsSidetable from '@/components/sidetables/clients-sidetable';

const ClientLayout = async ({ children }: { children: ReactNode }) => {
    const clients: TClientWithStatus[] = await prisma.client.findMany({
        orderBy: { createdAt: 'desc' },
        include: { status: true },
    });

    return (
        <TwoColumnsLayout asideContent={<ClientsSidetable clients={clients} />}>
            {children}
        </TwoColumnsLayout>
    );
};

export default ClientLayout;
