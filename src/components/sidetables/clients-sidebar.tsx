import { prisma } from '@/lib/prisma';
import ClientsSidetable from './clients-sidetable';

const ClientsSideBar = async () => {
    const clients = await prisma.clients.findMany({
        orderBy: {
            createdAt: 'desc',
        },
        take: 5,
    });

    return (
        <ClientsSidetable
            clients={clients.map(cl => ({ name: cl.name, id: cl.id }))}
        />
    );
};

export default ClientsSideBar;
