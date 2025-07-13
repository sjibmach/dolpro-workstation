import { prisma } from '@/lib/prisma';
import {
    NewCard,
    NewCardBody,
    NewCardHeader,
    NewCardItem,
} from '../custom/NewCard';
import Link from 'next/link';

const ClientsSidetable = async () => {
    const clients = await prisma.clients.findMany({
        orderBy: {
            createdAt: 'desc',
        },
        take: 5,
    });
    if (!clients || clients.length === 0) {
        return (
            <div className="p-4">
                <p className="text-gray-500">Keine Auftragsgeber gefunden.</p>
            </div>
        );
    }

    return (
        <div>
            <NewCard>
                <NewCardHeader title="Auftragsgeber"></NewCardHeader>
                <NewCardBody>
                    <NewCardItem compact>
                        <span className="text-sm text-gray-500">
                            Neueste Auftragsgeber
                        </span>
                    </NewCardItem>
                    {clients.map((client, index) => (
                        <NewCardItem
                            key={client.id}
                            compact
                            last={index === clients.length - 1}
                        >
                            <Link
                                className="flex items-center justify-between gap-2"
                                href={`/clients/${client.id}`}
                                title={client.name}
                            >
                                <span className="text-sm text-gray-900">
                                    {client.name}
                                </span>
                                <span className="text-xs text-gray-500">
                                    {new Date(
                                        client.createdAt
                                    ).toLocaleDateString()}
                                </span>
                            </Link>
                        </NewCardItem>
                    ))}
                </NewCardBody>
            </NewCard>
        </div>
    );
};

export default ClientsSidetable;
