import { prisma } from '@/lib/prisma';
import { TJobFullOverview } from '@/lib/prismaTypes';

import {
    NewCard,
    NewCardBody,
    NewCardContainer,
    NewCardHeader,
    NewCardItem,
    NewCardItemData,
} from '@/components/custom-ui/new-card';
import { differenceInCalendarDays, format } from 'date-fns';
import JobDateConfirmation from './_components/job-date-confirmation';
import { JobAssignmentDetailsEditModal } from '@/components/modals/app-modals/job-assignment-details-edit-modal';

export const dynamic = 'force-dynamic';

export type paramsType = Promise<{ jobId: string }>;

async function ClientPage({ params }: { params: paramsType }) {
    const { jobId } = await params;
    const job: TJobFullOverview | null = await prisma.job.findFirst({
        where: { id: jobId },
        include: {
            client: true,
            addressCity: true,
            interpreter: true,
            jobContactperson: true,
            jobType: true,
            languageTo: true,
            priority: true,
            status: true,
            jobMode: true,
        },
    });

    if (!job) return <>NO JOB FOUND</>;

    const interpreterFullName =
        job.interpreter?.id &&
        `${job.interpreter.code ? job.interpreter.code + ' ' : ''}${job.interpreter.firstName ? job.interpreter.firstName + ' ' : ''}${job.interpreter.lastName ? job.interpreter.lastName : ''}`;

    const addressString = `${job.addressStreet ? job.addressStreet + ' ' : ''}${job.addressZip ? job.addressZip + ' ' : ''}${job.addressCity?.name ? job.addressCity.name : ''}`;

    return (
        <div className="grid w-full gap-10 md:grid-cols-5">
            <NewCardContainer className="md:col-span-3">
                {/* <pre>{JSON.stringify(job, null, 2)}</pre> */}
                <NewCard>
                    <NewCardHeader className="flex items-center justify-between">
                        <span>Vermittlungsdaten</span>
                        <JobAssignmentDetailsEditModal job={job} />
                    </NewCardHeader>

                    <NewCardBody>
                        <NewCardItem
                            className="flex items-center justify-between gap-1"
                            first
                        >
                            <NewCardItemData
                                title="Dolmetscher"
                                value={job.interpreter?.id}
                                content={interpreterFullName}
                            />
                            <NewCardItemData
                                title="Auftragsdatum"
                                value={!!job.jobDate}
                                content={
                                    job.jobDate && (
                                        <>
                                            <span>
                                                {format(
                                                    job.jobDate,
                                                    'dd.MM.yyyy'
                                                )}
                                            </span>
                                            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                                                in{' '}
                                                {differenceInCalendarDays(
                                                    job.jobDate,
                                                    new Date()
                                                )}{' '}
                                                Tagen
                                            </span>
                                        </>
                                    )
                                }
                            />
                        </NewCardItem>
                        {job.interpreterId && (
                            <NewCardItem className="flex items-center justify-between gap-1">
                                <NewCardItemData
                                    title="Bestätigung des Dolmetschers"
                                    value={true}
                                    content={
                                        <JobDateConfirmation
                                            title="Bestätigung des Dolmetschers"
                                            jobId={job.id}
                                            isConfirmed={job.isConfirmedClient}
                                            type="interpreter"
                                        />
                                    }
                                    className="pr-10"
                                />
                                <NewCardItemData
                                    title="Bestätigung des Auftragsgeber"
                                    value={true}
                                    content={
                                        <JobDateConfirmation
                                            title="Bestätigung des Auftraggebers"
                                            jobId={job.id}
                                            isConfirmed={
                                                job.isConfirmedInterpreter
                                            }
                                            type="client"
                                        />
                                    }
                                />
                            </NewCardItem>
                        )}
                        <NewCardItem last>
                            <NewCardItemData
                                title="Status"
                                value={job.status.name}
                                content={job.status.name}
                            />
                        </NewCardItem>
                    </NewCardBody>
                </NewCard>
                <NewCard>
                    <NewCardHeader className="flex items-center justify-between">
                        <span>Allgemeine Daten</span>

                        {/* <ClientPersonalDataEditModal client={client} /> */}
                    </NewCardHeader>

                    <NewCardBody>
                        <NewCardItem
                            className="flex items-center justify-between gap-1"
                            first
                        >
                            <NewCardItemData
                                title="Auftragsgeber"
                                value={job.client.name}
                                content={job.client.name}
                            />
                            <NewCardItemData
                                title="Sprache"
                                value={job.languageTo.name}
                                content={job.languageTo.name}
                            />
                        </NewCardItem>
                        <NewCardItem className="flex items-center justify-between gap-1">
                            <NewCardItemData
                                title="Auftragstype"
                                value={job.jobType?.name}
                                content={job.jobType?.name}
                            />
                            <NewCardItemData
                                title="Priorität"
                                value={job.priority?.name}
                                content={job.priority?.name}
                            />
                        </NewCardItem>
                        <NewCardItem
                            className="flex items-center justify-between gap-1"
                            last
                        >
                            <NewCardItemData
                                title="Beschreibung"
                                value={job.description}
                                content={job.description}
                            />
                        </NewCardItem>
                    </NewCardBody>
                </NewCard>
                <NewCard>
                    <NewCardHeader className="flex items-center justify-between">
                        <span>Ort & Zeit</span>
                    </NewCardHeader>

                    <NewCardBody>
                        <NewCardItem
                            className="flex items-center justify-between gap-1"
                            first
                        >
                            <NewCardItemData
                                title="Modus"
                                value={job.jobMode?.name}
                                content={job.jobMode?.name}
                            />
                            <NewCardItemData
                                title="Rhytmus"
                                value={job.rhythmText}
                                content={job.rhythmText}
                            />
                        </NewCardItem>
                        {job.jobModeId === 'onSite' && (
                            <NewCardItem className="flex items-center justify-between gap-1">
                                <NewCardItemData
                                    title="Adresse"
                                    value={addressString}
                                    content={addressString}
                                />
                            </NewCardItem>
                        )}
                        <NewCardItem className="flex items-center justify-between gap-1">
                            <NewCardItemData
                                title="Auftragsdatum"
                                value={!!job.jobDate}
                                content={
                                    job.jobDate && (
                                        <>
                                            <span>
                                                {format(
                                                    job.jobDate,
                                                    'dd.MM.yyyy'
                                                )}
                                            </span>
                                            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                                                in{' '}
                                                {differenceInCalendarDays(
                                                    job.jobDate,
                                                    new Date()
                                                )}{' '}
                                                Tagen
                                            </span>
                                        </>
                                    )
                                }
                            />
                            <NewCardItemData
                                title="Auftrag Eingangsdatum"
                                value={!!job.entryDate}
                                content={
                                    job.entryDate && (
                                        <>
                                            <span>
                                                {format(
                                                    job.entryDate,
                                                    'dd.MM.yyyy'
                                                )}
                                            </span>
                                            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                                                vor{' '}
                                                {differenceInCalendarDays(
                                                    new Date(),
                                                    job.entryDate
                                                )}{' '}
                                                Tagen
                                            </span>
                                        </>
                                    )
                                }
                            />
                        </NewCardItem>
                        <NewCardItem className="flex items-center justify-between gap-1">
                            <NewCardItemData
                                title="Startuhrzeit"
                                value={!!job.startTime}
                                content={job.startTime + ' Uhr'}
                            />
                            <NewCardItemData
                                title="Enduhrzeit"
                                value={!!job.endTime}
                                content={job.endTime + ' Uhr'}
                            />
                            {/* <NewCardItemData
                                title="Dauer in Minuten"
                                value={job.endTime && job.startTime}
                            /> */}
                        </NewCardItem>
                    </NewCardBody>
                </NewCard>
            </NewCardContainer>
        </div>
    );
}

export default ClientPage;
