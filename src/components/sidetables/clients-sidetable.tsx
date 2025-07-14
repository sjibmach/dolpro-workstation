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
import TestModal from '../modals/app-modals/test-modal';
import { Button } from '../ui/button';
import { toast } from 'sonner';

const clientsTest = [
    { id: '1', name: 'Client A' },
    { id: '2', name: 'Client B' },
    { id: '3', name: 'Client C' },
    { id: '4', name: 'Client D' },
    { id: '5', name: 'Client E' },
    { id: '6', name: 'Client F' },
    { id: '7', name: 'Client G' },
    { id: '8', name: 'Client H' },
    { id: '9', name: 'Client I' },
    { id: '10', name: 'Client J' },
    { id: '11', name: 'Client K' },
    { id: '12', name: 'Client L' },
    { id: '13', name: 'Client M' },
    { id: '14', name: 'Client N' },
    { id: '15', name: 'Client O' },
    { id: '16', name: 'Client P' },
    { id: '17', name: 'Client Q' },
    { id: '18', name: 'Client R' },
    { id: '19', name: 'Client S' },
    { id: '20', name: 'Client T' },
];

type Client = {
    id: string;
    name: string;
};

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
                                        'flex items-center justify-between gap-2',
                                        client.id === clientId
                                            ? 'bg-amber-100 dark:bg-amber-800'
                                            : 'hover:bg-amber-50 dark:hover:bg-amber-700'
                                    )}
                                >
                                    <span className="text-sm">
                                        {client.name}
                                    </span>
                                    <span className="text-xs">{client.id}</span>
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
