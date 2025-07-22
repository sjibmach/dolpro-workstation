import { prisma } from '@/lib/prisma';
import { TClientFullOverview } from '@/lib/prismaTypes';

import {
    NewCard,
    NewCardBody,
    NewCardContainer,
    NewCardHeader,
    NewCardItem,
    NewCardItemData,
} from '@/components/custom-ui/new-card';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ClientPersonalDataEditModal } from '@/components/modals/app-modals/client-personal-data-edit-modal';
import { ClientAddressEditModal } from '@/components/modals/app-modals/client-address-edit-modal';
import CopyButton from '@/components/custom-ui/copy-button';
import { ClientContactPersonAddModal } from '@/components/modals/app-modals/client-contact-person-add-modal';
import { ClientContactPersonEditModal } from '@/components/modals/app-modals/client-contact-person-edit-modal';
import { ClientHistroyAddForm } from '../_components/client-history-add-form';
import { Badge } from '@/components/ui/badge';

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
            clientHistory: {
                include: {
                    newStatus: true,
                    reason: true,
                    creator: true,
                },
                orderBy: {
                    createdAt: 'desc',
                },
            },
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
                            <NewCardItemData
                                title="Name"
                                value={client?.name}
                                content={client?.name}
                            />
                            <NewCardItemData
                                title="Kürzel"
                                value={client?.nameShortcut}
                                content={client?.nameShortcut}
                            />
                        </NewCardItem>
                        <NewCardItem className="flex-gap-2 flex justify-between">
                            <NewCardItemData
                                title="E-Mail"
                                value={client?.email}
                                content={client?.email}
                            />
                            <NewCardItemData
                                title="Telefon"
                                value={client?.phone}
                                content={client?.phone}
                            />
                        </NewCardItem>
                        <NewCardItem className="flex-gap-2 flex justify-between">
                            <NewCardItemData
                                title="Auftragsgeber Type"
                                value={client?.type.name}
                                content={client?.type.name}
                            />
                            <NewCardItemData
                                title="Status"
                                value={client?.status?.name}
                                content={client?.status?.name}
                            />
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
                        <NewCardItem
                            className="flex-gap-2 flex justify-between"
                            first
                        >
                            <NewCardItemData
                                title="Straße & Hausnummer"
                                value={client?.street}
                                content={client?.street}
                            />
                            <NewCardItemData
                                title="Postleitzahl"
                                value={client?.zip}
                                content={client?.zip}
                            />
                        </NewCardItem>
                        <NewCardItem
                            className="flex-gap-2 flex justify-between"
                            last
                        >
                            <NewCardItemData
                                title="Ort"
                                value={client?.city?.name}
                                content={client?.city?.name}
                            />
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
                            <NewCardItemData
                                title="id"
                                value={client.id}
                                content={
                                    <div className="flex items-center justify-between">
                                        {client.id}
                                        <CopyButton
                                            copyText={client?.id || ''}
                                        />
                                    </div>
                                }
                            />
                        </NewCardItem>

                        <NewCardItem className="flex-gap-2 flex justify-between">
                            <NewCardItemData
                                title="Erstellt am"
                                value={String(client?.createdAt)}
                                content={
                                    <div>
                                        {format(
                                            client.createdAt,
                                            'dd.MM.yyyy HH:mm:ss'
                                        )}
                                    </div>
                                }
                            />
                            <NewCardItemData
                                title="Erstellt von"
                                value={client?.creatorId}
                                content={client?.creatorId}
                            />
                        </NewCardItem>

                        <NewCardItem className="flex-gap-2 flex justify-between">
                            <NewCardItemData
                                title="Aktualisiert am"
                                value={String(client?.updatedAt)}
                                content={
                                    <div>
                                        {format(
                                            client.updatedAt,
                                            'dd.MM.yyyy HH:mm:ss'
                                        )}
                                    </div>
                                }
                            />
                            <NewCardItemData
                                title="Aktualisiert von"
                                value={client?.updatorId}
                                content={client?.updatorId}
                            />
                        </NewCardItem>
                    </NewCardBody>
                </NewCard>
            </NewCardContainer>

            <NewCardContainer className="md:col-span-2">
                <NewCard>
                    <NewCardHeader>Verlauf</NewCardHeader>

                    <NewCardBody>
                        {client.clientHistory &&
                        client.clientHistory.length > 0 ? (
                            client.clientHistory.map(history => (
                                <NewCardItem
                                    key={history.id}
                                    first={
                                        history === client.clientHistory?.[0]
                                    }
                                    last={
                                        history ===
                                        client.clientHistory?.[
                                            client.clientHistory.length - 1
                                        ]
                                    }
                                >
                                    {history.newStatus ? (
                                        <>
                                            <div className="text-xs text-gray-600 dark:text-gray-400">
                                                <Badge
                                                    variant="secondary"
                                                    className="mr-1"
                                                >
                                                    Status Änderung
                                                </Badge>
                                                {history.createdAt &&
                                                    `${format(
                                                        history.createdAt,
                                                        'dd.MM.yyyy HH:mm'
                                                    )} von ${history.creator?.firstName || history.creator?.lastName || 'unbekannt'}`}
                                            </div>
                                            <div>
                                                {history.newStatus.name}
                                                {history.reason && (
                                                    <span>
                                                        {' - '}
                                                        {history.reason.name}
                                                    </span>
                                                )}
                                                {history.followUpDate && (
                                                    <span className="text-xs text-gray-500">
                                                        {' '}
                                                        Deadline:{' '}
                                                        {format(
                                                            history.followUpDate,
                                                            'dd.MM.yyyy'
                                                        )}
                                                    </span>
                                                )}
                                            </div>
                                            {history.note && (
                                                <div className="text-xs text-gray-600 dark:text-gray-400">
                                                    {'Kommentar: '}{' '}
                                                    {history.note}
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            <div className="text-xs text-gray-600 dark:text-gray-400">
                                                <Badge
                                                    variant="secondary"
                                                    className="mr-1"
                                                >
                                                    Historie Eintrag
                                                </Badge>
                                                {history.createdAt &&
                                                    `${format(
                                                        history.createdAt,
                                                        'dd.MM.yyyy HH:mm'
                                                    )} von ${history.creator?.firstName || history.creator?.lastName || 'unbekannt'}`}
                                            </div>
                                            <div>
                                                {history.note ||
                                                    'Keine Beschreibung'}
                                            </div>
                                        </>
                                    )}
                                </NewCardItem>
                            ))
                        ) : (
                            <NewCardItem last first className="text-gray-500">
                                Keine Verlaufsdaten vorhanden.
                            </NewCardItem>
                        )}
                    </NewCardBody>
                </NewCard>
            </NewCardContainer>
        </div>
    );
};

export default ClientEditPage;
