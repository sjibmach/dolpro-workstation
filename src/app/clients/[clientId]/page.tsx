import { prisma } from '@/lib/prisma';
import { TClientFullOverview } from '@/lib/prismaTypes';

export type paramsType = Promise<{ clientId: string }>;

async function ClientPage({ params }: { params: paramsType }) {
    const { clientId } = await params;

    const client: TClientFullOverview | null = await prisma.client.findUnique({
        where: { id: clientId },
        include: {
            contactPersons: {
                include: {
                    city: true,
                },
            },
            status: true,
            type: true,
            statusReason: true,
            city: true,
        },
    });

    if (!client) {
        return <div>Client not found</div>;
    }

    return <></>;
}

export default ClientPage;
