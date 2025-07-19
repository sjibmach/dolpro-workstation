import { prisma } from '@/lib/prisma';
import ClientsSidetable from './clients-sidetable';
import { TClientWithStatus } from '@/lib/types';

const ClientsSideBar = async () => {
    const clients: TClientWithStatus[] = await prisma.client.findMany({
        orderBy: { createdAt: 'desc' },
        include: { status: true },
    });

    return <ClientsSidetable clients={clients} />;
};

export default ClientsSideBar;
