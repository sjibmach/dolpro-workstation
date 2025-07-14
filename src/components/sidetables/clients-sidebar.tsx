import { prisma } from '@/lib/prisma';
import ClientsSidetable from './clients-sidetable';
import { Client } from '@prisma/client';

const ClientsSideBar = async () => {
    const clients: Client[] = await prisma.client.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    });

    return (
        <ClientsSidetable
            clients={clients.map(cl => ({ name: cl.name, id: cl.id }))}
        />
    );
};

export default ClientsSideBar;
