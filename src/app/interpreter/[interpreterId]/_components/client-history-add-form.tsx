'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import RHFInput from '@/components/rhf/rhf-input';
import RHFCombobox from '@/components/rhf/rhf-combobox';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
    useQueryInterpreterStatuses,
    useQueryClientStatusReasons,
} from '@/hooks/react-query/react-query-hooks';
import {
    NewCard,
    NewCardBody,
    NewCardHeader,
    NewCardItem,
} from '@/components/custom-ui/new-card';
import { RHFTextArea } from '@/components/rhf/rhf-textarea';
import { Button } from '@/components/ui/button';
import { Client } from '@prisma/client';

const ClientHistoryAddSchema = z.object({
    clientId: z.string().nullable().optional(),
    statusId: z.string().nullable().optional(),
    statusReasonId: z.string().nullable().optional(),
    followUpDate: z.string().nullable().optional(),
    note: z.string().nullable().optional(),
    statusIdHasChanged: z.boolean().optional(),
    statusReasonIdHasChanged: z.boolean().optional(),
    followUpDateHasChanged: z.boolean().optional(),
});

export type TClientHistroyAdd = z.infer<typeof ClientHistoryAddSchema>;

export function ClientHistroyAddForm({ client }: { client: Client }) {
    const router = useRouter();

    const { data: clientStatuses, isLoading: isLoadingClientStatuses } =
        useQueryInterpreterStatuses();

    const {
        data: clientStatusReasons,
        isLoading: isLoadingClientStatusReasons,
    } = useQueryClientStatusReasons();

    const form = useForm<TClientHistroyAdd>({
        resolver: zodResolver(ClientHistoryAddSchema),
        defaultValues: {
            clientId: client?.id || '',
            statusId: '',
            statusReasonId: '',
            followUpDate: '',
            statusIdHasChanged: false,
            statusReasonIdHasChanged: false,
            followUpDateHasChanged: false,
            note: '',
        },
        values: {
            clientId: client.id,
            statusId: client.statusId,
            statusReasonId: client.statusReasonId,
            followUpDate: client.statusFollowUpDate
                ? client.statusFollowUpDate.toISOString().split('T')[0]
                : '',
            note: '',
            statusIdHasChanged: false,
            statusReasonIdHasChanged: false,
            followUpDateHasChanged: false,
        },
    });

    const statusId = form.watch('statusId');

    const onSubmit = async (values: TClientHistroyAdd) => {
        values.statusIdHasChanged = values.statusId !== client.statusId;
        values.statusReasonIdHasChanged =
            values.statusReasonId !== client.statusReasonId;
        values.followUpDateHasChanged =
            values.followUpDate !== client.statusFollowUpDate?.toISOString();

        if (
            statusId !== 'offerToSend' &&
            statusId !== 'contactLater' &&
            statusId !== 'interested'
        ) {
            values.followUpDate = '';
        }
        if (statusId !== 'notInterested' && statusId !== 'blacklisted') {
            values.statusReasonId = '';
        }

        console.log('values', values);

        const promise = axios.post('/api/client-history/add', values);

        toast.promise(promise, {
            loading: 'Historie wird hinzugefügt...',
            success: 'Historie erfolgreich hinzugefügt',
            error: 'Fehler beim Hinzufügen der Historie',
        });

        try {
            await promise;
        } catch (error) {
            console.error('Fehler beim Senden des Formulars:', error);
        } finally {
            form.reset();
            router.refresh();
        }
    };

    return (
        <NewCard>
            <NewCardHeader>Bearbeiten</NewCardHeader>
            <NewCardBody>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <NewCardItem
                            className="grid gap-x-2 gap-y-4 sm:grid-cols-2"
                            last
                            first
                        >
                            <div>
                                <div className="mb-2 text-xs text-gray-600 dark:text-gray-400">
                                    Status
                                </div>
                                <RHFCombobox
                                    name="statusId"
                                    control={form.control}
                                    options={clientStatuses || []}
                                    setValue={form.setValue}
                                    placeholder="Status auswählen"
                                    showError
                                />
                            </div>
                            {(statusId === 'notInterested' ||
                                statusId === 'blacklisted') && (
                                <div>
                                    <div className="mb-2 text-xs text-gray-600 dark:text-gray-400">
                                        Status Grund
                                    </div>
                                    <div>
                                        <RHFCombobox
                                            name="statusReasonId"
                                            control={form.control}
                                            options={clientStatusReasons || []}
                                            setValue={form.setValue}
                                            placeholder="Status Grund auswählen"
                                            showError
                                        />
                                    </div>
                                </div>
                            )}
                            {(statusId === 'offerToSend' ||
                                statusId === 'contactLater' ||
                                statusId === 'interested') && (
                                <div>
                                    <div className="mb-2 text-xs text-gray-600 dark:text-gray-400">
                                        Datum der Nachverfolgung
                                    </div>
                                    <div>
                                        <RHFInput
                                            name="followUpDate"
                                            control={form.control}
                                            // label="Datum der Nachverfolgung"
                                            placeholder="TT.MM.JJJJ"
                                            type="date"
                                            showError
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="col-span-full">
                                <div className="mb-2 text-xs text-gray-600 dark:text-gray-400">
                                    Historie Notiz
                                </div>
                                <RHFTextArea
                                    name="note"
                                    control={form.control}
                                    placeholder="Historie hinzufügen..."
                                    showError
                                />
                            </div>

                            <div className="col-span-full flex justify-end">
                                <Button
                                    type="submit"
                                    className="min-w-[200px]"
                                    disabled={isLoadingClientStatuses}
                                >
                                    Speichern & Historie hinzufügen
                                </Button>
                            </div>
                        </NewCardItem>
                    </form>
                </Form>
            </NewCardBody>
        </NewCard>
    );
}
