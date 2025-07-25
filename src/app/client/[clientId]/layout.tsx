import { ReactNode } from 'react';
import { ClientTabList } from './_components/clients-tab-list';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export type paramsType = Promise<{ clientId: string }>;

const ClientsLayout = async ({
    children,
    params,
}: {
    children: ReactNode;
    params: paramsType;
}) => {
    const { clientId } = await params;
    const client = await prisma.client.findFirst({
        where: { id: clientId },
    });

    if (!client) return <>Keine Auftragsgeber</>;
    const clientName =
        `${client.code ? client.code : ''}` +
        `${client.name ? client.name : ''}`;

    return (
        <>
            {/* {<pre>{JSON.stringify(client, null, 2)}</pre>} */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold">{clientName}</h1>
                <p>This is the client page for client with ID: {clientId} </p>

                <ClientTabList clientId={clientId} />
            </div>
            {children}
        </>
    );
};

export default ClientsLayout;
