import { prisma } from '@/lib/prisma';

import {
    NewCard,
    NewCardBody,
    NewCardContainer,
    NewCardHeader,
    NewCardItem,
    NewCardItemData,
} from '@/components/custom-ui/new-card';
import { TInterpreterFullOverview } from '@/lib/prismaTypes';
import { format } from 'date-fns';
import { HiCheck } from 'react-icons/hi2';
import { InterpreterPersonalDataEditModal } from '@/components/modals/app-modals/interpreter-personal-data-edit-modal';
import { InterpreterAvailabilityEditModal } from '@/components/modals/app-modals/interpreter-availability-edit-modal';

export const dynamic = 'force-dynamic';

export type paramsType = Promise<{ interpreterId: string }>;

const InterpreterEditPage = async ({ params }: { params: paramsType }) => {
    const { interpreterId } = await params;

    const interpreter: TInterpreterFullOverview | null =
        await prisma.interpreter.findUnique({
            where: { id: interpreterId },
            include: {
                city: true,
                status: true,
                languages: {
                    include: {
                        language: true,
                    },
                },
                preferredCities: {
                    include: {
                        city: true,
                    },
                },
                jobs: true,
            },
        });

    if (!interpreter) {
        return <div>Interpreter not found</div>;
    }

    return (
        <div className="grid w-full gap-10 md:grid-cols-5">
            <NewCardContainer className="md:col-span-3">
                <NewCard>
                    <NewCardHeader className="flex items-center justify-between">
                        <span>Persönliche Daten</span>
                        <InterpreterPersonalDataEditModal
                            interpreter={interpreter}
                        />
                    </NewCardHeader>
                    <NewCardBody>
                        <NewCardItem className="flex-gap-2 flex justify-between">
                            <NewCardItemData
                                title="Vorname"
                                value={interpreter?.firstName}
                                content={interpreter?.firstName}
                            />
                            <NewCardItemData
                                title="Nachname"
                                value={interpreter?.lastName}
                                content={interpreter?.lastName}
                            />
                        </NewCardItem>
                        <NewCardItem className="flex-gap-2 flex justify-between">
                            <NewCardItemData
                                title="Email"
                                value={interpreter?.email}
                                content={interpreter?.email}
                            />
                            <NewCardItemData
                                title="Geschlecht"
                                value={interpreter?.gender}
                                content={
                                    interpreter?.gender === 'm'
                                        ? 'Männlich'
                                        : interpreter?.gender === 'w'
                                          ? 'Weiblich'
                                          : ''
                                }
                            />
                        </NewCardItem>
                        <NewCardItem className="flex-gap-2 flex justify-between">
                            <NewCardItemData
                                title="Phone 1"
                                value={interpreter?.phone1}
                                content={interpreter?.phone1}
                            />
                            <NewCardItemData
                                title="Phone 2"
                                value={interpreter?.phone2}
                                content={interpreter?.phone2}
                            />
                        </NewCardItem>
                        <NewCardItem
                            className="flex-gap-2 flex justify-between"
                            last
                        >
                            <NewCardItemData
                                title="Geburtsdatum"
                                value={!!interpreter?.birthDate}
                                content={format(
                                    interpreter.birthDate!,
                                    'dd.MM.yyyy'
                                )}
                            />
                            <NewCardItemData
                                title="Vorstellungsgespräch"
                                value={!!interpreter?.interviewDate}
                                content={format(
                                    interpreter.interviewDate!,
                                    'dd.MM.yyyy'
                                )}
                            />
                        </NewCardItem>
                    </NewCardBody>
                </NewCard>
                <NewCard>
                    <NewCardHeader className="flex items-center justify-between">
                        <span>Verfügbarkeit</span>
                        <InterpreterAvailabilityEditModal
                            interpreter={interpreter}
                        />
                    </NewCardHeader>
                    <NewCardBody>
                        <NewCardItem className="flex-gap-2 flex justify-between">
                            <NewCardItemData
                                title="Bietet Vorort"
                                value={interpreter?.offersRemote}
                                content={<HiCheck />}
                            />
                            <NewCardItemData
                                title="Bietet Online"
                                value={interpreter?.offersOnSite}
                                content={<HiCheck />}
                            />
                        </NewCardItem>
                        {interpreter.offersOnSite && (
                            <NewCardItem className="flex-gap-2 flex justify-between">
                                <NewCardItemData
                                    title="Einsatzstädte"
                                    value={
                                        interpreter?.preferredCities.length > 0
                                    }
                                    content={interpreter.preferredCities
                                        .flatMap(city => city.city.name)
                                        .join(', ')}
                                />
                            </NewCardItem>
                        )}
                        <NewCardItem className="flex-gap-2 flex justify-between">
                            <NewCardItemData
                                title="Auto verfügbar"
                                value={interpreter?.car}
                                content={<HiCheck />}
                            />
                            <NewCardItemData
                                title="Gewünschte Zeiten"
                                value={interpreter?.availability}
                                content={interpreter?.availability}
                            />
                        </NewCardItem>
                        <NewCardItem
                            className="flex-gap-2 flex justify-between"
                            last
                        >
                            <NewCardItemData
                                title="Startdatum"
                                value={!!interpreter?.startDate}
                                content={format(
                                    interpreter.startDate!,
                                    'dd.MM.yyyy'
                                )}
                            />
                            <NewCardItemData
                                title="Enddatum"
                                value={!!interpreter?.endDate}
                                content={format(
                                    interpreter.endDate!,
                                    'dd.MM.yyyy'
                                )}
                            />
                        </NewCardItem>
                    </NewCardBody>
                </NewCard>
                <NewCard>
                    <NewCardHeader className="flex items-center justify-between">
                        <span>Adresse</span>
                    </NewCardHeader>
                    <NewCardBody>
                        <NewCardItem className="flex-gap-2 flex justify-between">
                            <NewCardItemData
                                title="Straße & Hausnummer"
                                value={interpreter?.street}
                                content={interpreter?.street}
                            />
                            <NewCardItemData
                                title="Postleitzahl"
                                value={interpreter?.zip}
                                content={interpreter?.zip}
                            />
                        </NewCardItem>
                        <NewCardItem
                            className="flex-gap-2 flex justify-between"
                            last
                        >
                            <NewCardItemData
                                title="City"
                                value={interpreter?.city?.name}
                                content={interpreter?.city?.name}
                            />
                        </NewCardItem>
                    </NewCardBody>
                </NewCard>
                <NewCard>
                    <NewCardHeader className="flex items-center justify-between">
                        <span>Rechnungsdaten</span>
                    </NewCardHeader>
                    <NewCardBody>
                        <NewCardItem className="flex-gap-2 flex justify-between">
                            <NewCardItemData
                                title="Stundensatz"
                                value={
                                    !!(
                                        interpreter?.defaultHourlyRate &&
                                        interpreter.defaultHourlyRate > 0
                                    )
                                }
                                content={interpreter?.defaultHourlyRate + ' €'}
                            />
                            <NewCardItemData
                                title="KM Pauschale"
                                value={
                                    !!(
                                        interpreter?.kmRate &&
                                        interpreter.kmRate > 0
                                    )
                                }
                                content={interpreter?.kmRate + ' €'}
                            />
                        </NewCardItem>
                        <NewCardItem
                            className="flex-gap-2 flex justify-between"
                            last
                        >
                            <NewCardItemData
                                title="Iban"
                                value={interpreter?.iban}
                                content={interpreter?.iban}
                            />
                        </NewCardItem>
                    </NewCardBody>
                </NewCard>
            </NewCardContainer>
            <NewCardContainer className="md:col-span-2">
                <NewCard>
                    <NewCardHeader>Verlauf</NewCardHeader>

                    <NewCardBody>
                        <NewCardItem>
                            Keine Verlaufsdaten vorhanden.
                        </NewCardItem>
                        {/* {client.clientHistory &&
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
                        )} */}
                    </NewCardBody>
                </NewCard>
            </NewCardContainer>
        </div>
    );
};

export default InterpreterEditPage;
