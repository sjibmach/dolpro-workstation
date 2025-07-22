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
import { cn } from '@/lib/utils';

export type paramsType = Promise<{ jobId: string }>;

async function ClientPage({ params }: { params: paramsType }) {
    const { jobId } = await params;
    const job: TJobFullOverview | null = await prisma.job.findFirst({
        where: { id: jobId },
        include: {
            client: true,
            addressCity: true,
            interpreter: true,
            JobContactperson: true,
            jobType: true,
            languageTo: true,

            priority: true,
            status: true,
        },
    });
    return (
        <div className="grid w-full gap-10 md:grid-cols-5">
            <NewCardContainer className="md:col-span-3">
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
                                value={job?.client.name}
                                content={job?.client.name}
                            />
                            <NewCardItemData
                                title="Sprache"
                                value={job?.languageTo.name}
                                content={job?.languageTo.name}
                            />
                        </NewCardItem>
                        <NewCardItem
                            className="flex items-center justify-between gap-1"
                            first
                        >
                            <NewCardItemData
                                title="Auftragstype"
                                value={job?.jobType?.name}
                                content={job?.jobType?.name}
                            />
                            <NewCardItemData
                                title="Priorität"
                                value={job?.priority?.name}
                                content={job?.priority?.name}
                            />
                        </NewCardItem>
                        <NewCardItem
                            className="flex items-center justify-between gap-1"
                            first
                        >
                            <NewCardItemData
                                title="Beschreibung"
                                value={job?.description}
                                content={job?.description}
                            />
                        </NewCardItem>
                    </NewCardBody>
                </NewCard>
            </NewCardContainer>
        </div>
    );
}

export default ClientPage;
