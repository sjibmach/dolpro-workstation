'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import {
    NewCard,
    NewCardBody,
    NewCardHeader,
    NewCardItem,
} from '@/components/custom-ui/new-card';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

import { ClientAddModal } from '../modals/app-modals/client-add-modal';
import { Badge } from '../ui/badge';
import { Client } from '@prisma/client';

const ClientsSidetable = ({ clients }: { clients: Client[] | undefined }) => {
    const params = useParams();
    const clientId = params.clientId as string;
    const [searchQuery, setSearchQuery] = useState('');

    const filteredClients = clients?.filter(client =>
        client.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <NewCard>
            <NewCardHeader className="flex items-center justify-between">
                Auftragsgeber
                <ClientAddModal />
            </NewCardHeader>
            <Input
                placeholder="Suchen"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="mb-2"
            />
            <NewCardBody className="max-h-[calc(100vh-200px)] overflow-y-auto">
                {filteredClients && filteredClients.length > 0 ? (
                    <>
                        {filteredClients.map((client, index) => (
                            <Link
                                href={`/clients/${client.id}`}
                                title={client.name}
                                key={client.id}
                            >
                                <NewCardItem
                                    compact
                                    last={index === filteredClients.length - 1}
                                    className={cn(
                                        'flex items-center justify-between',
                                        client.id === clientId
                                            ? 'bg-amber-100 dark:bg-amber-800'
                                            : 'hover:bg-amber-50 dark:hover:bg-amber-700'
                                    )}
                                >
                                    <div className="flex flex-col justify-between">
                                        <span className="text-sm font-medium">
                                            {client.name}
                                        </span>
                                        {client.statusId && (
                                            <Badge
                                                className="text-xs"
                                                variant="secondary"
                                            >
                                                {client.statusId}
                                            </Badge>
                                        )}
                                    </div>
                                </NewCardItem>
                            </Link>
                        ))}
                    </>
                ) : (
                    <NewCardItem compact>
                        <span className="text-sm text-gray-500">
                            Keine Auftragsgeber gefunden.
                        </span>
                    </NewCardItem>
                )}
            </NewCardBody>
        </NewCard>
    );
};

export default ClientsSidetable;
