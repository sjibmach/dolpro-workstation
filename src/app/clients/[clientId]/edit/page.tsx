import { prisma } from '@/lib/prisma';
import { TClientFullOverview } from '@/lib/prismaTypes';

import {
    NewCard,
    NewCardBody,
    NewCardContainer,
    NewCardHeader,
    NewCardItem,
} from '@/components/custom-ui/new-card';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ClientPersonalDataEditModal } from '@/components/modals/app-modals/client-personal-data-edit-modal';
import { ClientAddressEditModal } from '@/components/modals/app-modals/client-address-edit-modal';
import CopyButton from '@/components/custom-ui/copy-button';
import { ClientContactPersonAddModal } from '@/components/modals/app-modals/client-contact-person-add-modal';
import { ClientContactPersonEditModal } from '@/components/modals/app-modals/client-contact-person-edit-modal';
import { ClientHistroyAddForm } from '../_components/client-history-add-form';

export type paramsType = Promise<{ clientId: string }>;

const ClientEditPage = async ({ params }: { params: paramsType }) => {
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

    return (
        <div className="grid w-full gap-10 md:grid-cols-5">
            <NewCardContainer className="md:col-span-3">
                <ClientHistroyAddForm client={client} />
                <NewCard>
                    <NewCardHeader className="flex items-center justify-between">
                        <span>Personaldaten</span>

                        <ClientPersonalDataEditModal client={client} />
                    </NewCardHeader>
                    <NewCardBody>
                        <NewCardItem className="flex-gap-2 flex justify-between">
                            <div className="flex-1">
                                <div className="text-xs text-gray-600 dark:text-gray-400">
                                    Name
                                </div>
                                <div
                                    className={cn(
                                        !client?.name && 'text-gray-400'
                                    )}
                                >
                                    {client?.name || 'N/A'}
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="text-xs text-gray-600 dark:text-gray-400">
                                    Kürzel
                                </div>
                                <div
                                    className={cn(
                                        !client?.nameShortcut && 'text-gray-400'
                                    )}
                                >
                                    {client?.nameShortcut || 'N/A'}
                                </div>
                            </div>
                        </NewCardItem>
                        <NewCardItem className="flex-gap-2 flex justify-between">
                            <div className="flex-1">
                                <div className="text-xs text-gray-600 dark:text-gray-400">
                                    E-Mail
                                </div>
                                <div
                                    className={cn(
                                        !client?.email && 'text-gray-400'
                                    )}
                                >
                                    {client?.email || 'N/A'}
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="text-xs text-gray-600 dark:text-gray-400">
                                    Telefon
                                </div>
                                <div
                                    className={cn(
                                        !client?.phone && 'text-gray-400'
                                    )}
                                >
                                    {client?.phone || 'N/A'}
                                </div>
                            </div>
                        </NewCardItem>
                        <NewCardItem
                            className="flex-gap-2 flex justify-between"
                            last
                        >
                            <div className="flex-1">
                                <div className="text-xs text-gray-600 dark:text-gray-400">
                                    Auftragsgeber-Typ{' '}
                                </div>
                                <div
                                    className={cn(
                                        !client?.typeId && 'text-gray-400'
                                    )}
                                >
                                    {client?.type?.name || 'N/A'}
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="text-xs text-gray-600 dark:text-gray-400">
                                    Status
                                </div>
                                <div
                                    className={cn(
                                        !client?.statusId && 'text-gray-400'
                                    )}
                                >
                                    {client?.status?.name || 'N/A'}
                                </div>
                            </div>
                        </NewCardItem>
                    </NewCardBody>
                </NewCard>
                <NewCard>
                    <NewCardHeader className="flex items-center justify-between">
                        <span>Ansprechpartner</span>
                        <ClientContactPersonAddModal clientId={clientId} />
                    </NewCardHeader>
                    <NewCardBody>
                        {client.contactPersons &&
                        client.contactPersons.length > 0 ? (
                            client.contactPersons.map(person => {
                                const fullName =
                                    `${person.firstName || ''} ${person.lastName || ''}`.trim();
                                const address = person.street;
                                const zipAndCity =
                                    `${person.zip || ''} ${person.city?.name || ''}`.trim();

                                return (
                                    <NewCardItem
                                        key={person.id}
                                        className="flex-gap-2 flex justify-between"
                                        first={
                                            person ===
                                            client.contactPersons?.[0]
                                        }
                                        last={
                                            person ===
                                            client.contactPersons?.[
                                                client.contactPersons.length - 1
                                            ]
                                        }
                                    >
                                        <div className="flex-1">
                                            <div className="text-xs text-gray-600 dark:text-gray-400">
                                                Anschrift
                                            </div>
                                            <div
                                                className={cn(
                                                    !fullName && 'text-gray-400'
                                                )}
                                            >
                                                {fullName || 'N/A'}
                                            </div>
                                            <div
                                                className={cn(
                                                    !address && 'text-gray-400'
                                                )}
                                            >
                                                {address || 'N/A'}
                                            </div>

                                            <div
                                                className={cn(
                                                    !zipAndCity &&
                                                        'text-gray-400'
                                                )}
                                            >
                                                {zipAndCity || 'N/A'}
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-xs text-gray-600 dark:text-gray-400">
                                                Kontaktdaten
                                            </div>
                                            <div
                                                className={cn(
                                                    !person.email &&
                                                        'text-gray-400'
                                                )}
                                            >
                                                {person.email || 'N/A'}
                                            </div>
                                            <div
                                                className={cn(
                                                    !person.phone &&
                                                        'text-gray-400'
                                                )}
                                            >
                                                {person.phone || 'N/A'}
                                            </div>
                                        </div>
                                        <div className="flex flex-none items-center">
                                            <ClientContactPersonEditModal
                                                clientContactPerson={person}
                                            />
                                        </div>
                                    </NewCardItem>
                                );
                            })
                        ) : (
                            <NewCardItem
                                className="flex items-center text-gray-500"
                                last
                                first
                            >
                                Keine Ansprechpartner vorhanden.
                            </NewCardItem>
                        )}
                    </NewCardBody>
                </NewCard>
                <NewCard>
                    <NewCardHeader className="flex items-center justify-between">
                        <span>Anschrift</span>

                        <ClientAddressEditModal client={client} />
                    </NewCardHeader>
                    <NewCardBody>
                        <NewCardItem className="flex-gap-2 flex justify-between">
                            <div className="flex-1">
                                <div className="text-xs text-gray-600 dark:text-gray-400">
                                    Straße & Hausnummer
                                </div>
                                <div
                                    className={cn(
                                        !client?.street && 'text-gray-400'
                                    )}
                                >
                                    {client?.street || 'N/A'}
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="text-xs text-gray-600 dark:text-gray-400">
                                    Postleitzahl
                                </div>
                                <div
                                    className={cn(
                                        !client?.zip && 'text-gray-400'
                                    )}
                                >
                                    {client?.zip || 'N/A'}
                                </div>
                            </div>
                        </NewCardItem>
                        <NewCardItem last>
                            <div className="text-xs text-gray-600 dark:text-gray-400">
                                Stadt
                            </div>
                            <div
                                className={cn(
                                    !client?.cityId && 'text-gray-400'
                                )}
                            >
                                {client?.city?.name || 'N/A'}
                            </div>
                        </NewCardItem>
                    </NewCardBody>
                </NewCard>
                <NewCard>
                    <NewCardHeader className="flex items-center justify-between">
                        <span>Systemdaten</span>
                    </NewCardHeader>
                    <NewCardBody>
                        <NewCardItem
                            first
                            className="flex-gap-2 flex items-center justify-between"
                        >
                            <div>
                                <div className="text-xs text-gray-600 dark:text-gray-400">
                                    id
                                </div>
                                <div
                                    className={cn(
                                        !client?.id && 'text-gray-400'
                                    )}
                                >
                                    {client?.id || 'N/A'}
                                </div>
                            </div>
                            <CopyButton copyText={client?.id || ''} />
                        </NewCardItem>
                        <NewCardItem className="flex-gap-2 flex justify-between">
                            <div className="flex-1">
                                <div className="text-xs text-gray-600 dark:text-gray-400">
                                    Erstellt am
                                </div>
                                <div
                                    className={cn(
                                        !client?.createdAt && 'text-gray-400'
                                    )}
                                >
                                    {(client?.createdAt &&
                                        format(
                                            client?.createdAt,
                                            'dd.MM.yyyy HH:mm:ss'
                                        )) ||
                                        'N/A'}
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="text-xs text-gray-600 dark:text-gray-400">
                                    Erstellt von
                                </div>
                                <div
                                    className={cn(
                                        !client?.creatorId && 'text-gray-400'
                                    )}
                                >
                                    {client?.creatorId || 'N/A'}
                                </div>
                            </div>
                        </NewCardItem>
                        <NewCardItem
                            className="flex-gap-2 flex justify-between"
                            last
                        >
                            <div className="flex-1">
                                <div className="text-xs text-gray-600 dark:text-gray-400">
                                    Aktualisiert am
                                </div>
                                <div
                                    className={cn(
                                        !client?.updatedAt && 'text-gray-400'
                                    )}
                                >
                                    {(client?.updatedAt &&
                                        format(
                                            client?.updatedAt,
                                            'dd.MM.yyyy HH:mm:ss'
                                        )) ||
                                        'N/A'}
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="text-xs text-gray-600 dark:text-gray-400">
                                    Aktualisiert von
                                </div>
                                <div
                                    className={cn(
                                        !client?.updatorId && 'text-gray-400'
                                    )}
                                >
                                    {client?.updatorId || 'N/A'}
                                </div>
                            </div>
                        </NewCardItem>
                    </NewCardBody>
                </NewCard>
            </NewCardContainer>

            <NewCardContainer className="md:col-span-2">
                <NewCard>
                    <NewCardHeader>Verlauf</NewCardHeader>
                    <NewCardBody>
                        <NewCardItem></NewCardItem>
                    </NewCardBody>
                </NewCard>
            </NewCardContainer>
        </div>
    );
};

export default ClientEditPage;
