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
    useQueryInterpreterStatusReasons,
} from '@/hooks/react-query/react-query-hooks';
import {
    NewCard,
    NewCardBody,
    NewCardHeader,
    NewCardItem,
} from '@/components/custom-ui/new-card';
import { RHFTextArea } from '@/components/rhf/rhf-textarea';
import { Button } from '@/components/ui/button';
import { TInterpreterFullOverview } from '@/lib/prismaTypes';
import { useState } from 'react';

const InterpreterHistoryAddSchema = z.object({
    interpreterId: z.string().nullable().optional(),
    statusId: z.string(),
    statusReasonId: z.string().nullable().optional(),
    followUpDate: z.string().nullable().optional(),
    interviewDate: z.string().nullable().optional(),
    note: z.string().nullable().optional(),
    statusIdHasChanged: z.boolean(),
    statusReasonIdHasChanged: z.boolean(),
    followUpDateHasChanged: z.boolean(),
    interviewDateHasChanged: z.boolean(),
});

export type TInterpreterHistroyAdd = z.infer<
    typeof InterpreterHistoryAddSchema
>;

export function InterpreterHistroyAddForm({
    interpreter,
}: {
    interpreter: TInterpreterFullOverview;
}) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const {
        data: interpreterStatuses,
        isLoading: isLoadingInterpreterStatuses,
    } = useQueryInterpreterStatuses();

    const {
        data: interpreterStatusReasons,
        isLoading: isLoadingInterpreterStatusReasons,
    } = useQueryInterpreterStatusReasons();

    const form = useForm<TInterpreterHistroyAdd>({
        resolver: zodResolver(InterpreterHistoryAddSchema),
        defaultValues: {
            interpreterId: interpreter.id,
            statusId: interpreter.statusId ? interpreter.statusId : '',
            statusReasonId: interpreter.statusReasonId
                ? interpreter.statusReasonId
                : '',
            interviewDate: interpreter.interviewDate
                ? interpreter.interviewDate.toISOString().split('T')[0]
                : '',
            followUpDate: interpreter.statusFollowUpDate
                ? interpreter.statusFollowUpDate.toISOString().split('T')[0]
                : '',
            statusIdHasChanged: false,
            statusReasonIdHasChanged: false,
            followUpDateHasChanged: false,
            note: '',
        },
        values: {
            interpreterId: interpreter.id,
            statusId: interpreter.statusId ? interpreter.statusId : '',
            statusReasonId: interpreter.statusReasonId
                ? interpreter.statusReasonId
                : '',
            interviewDate: interpreter.interviewDate
                ? interpreter.interviewDate.toISOString().split('T')[0]
                : '',
            followUpDate: interpreter.statusFollowUpDate
                ? interpreter.statusFollowUpDate.toISOString().split('T')[0]
                : '',
            statusIdHasChanged: false,
            statusReasonIdHasChanged: false,
            followUpDateHasChanged: false,
            interviewDateHasChanged: false,
            note: '',
        },
    });

    const statusId = form.watch('statusId');

    const onSubmit = async (values: TInterpreterHistroyAdd) => {
        values.statusIdHasChanged = values.statusId !== interpreter.statusId;
        values.statusReasonIdHasChanged =
            values.statusReasonId !== interpreter.statusReasonId;
        values.followUpDateHasChanged =
            values.followUpDate !==
            interpreter.statusFollowUpDate?.toISOString();
        values.interviewDateHasChanged =
            values.interviewDate !== interpreter.interviewDate?.toISOString();

        if (statusId !== 'new' && statusId !== 'contactLater') {
            values.followUpDate = '';
        }
        if (
            statusId !== 'rejected' &&
            statusId !== 'blocked' &&
            statusId !== 'noInterest' &&
            statusId === 'failedContact'
        ) {
            values.statusReasonId = '';
        }

        console.log('values', values);

        setIsLoading(true);

        const promise = axios.post('/api/interpreter-history/add', values);

        toast.promise(promise, {
            loading: 'Historie wird hinzugefügt...',
            success: 'Historie erfolgreich hinzugefügt',
            error: 'Fehler beim Hinzufügen der Historie',
            position: 'top-right',
        });

        try {
            await promise;
        } catch (error) {
            console.error('Fehler beim Senden des Formulars:', error);
        } finally {
            form.reset();
            router.refresh();
            setIsLoading(false);
        }
    };

    return (
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
                        {isLoadingInterpreterStatuses ? (
                            <>Lade Status...</>
                        ) : (
                            <RHFCombobox
                                name="statusId"
                                control={form.control}
                                options={interpreterStatuses || []}
                                setValue={form.setValue}
                                placeholder="Status auswählen"
                                showError
                            />
                        )}
                    </div>
                    {(statusId === 'rejected' ||
                        statusId === 'blocked' ||
                        statusId === 'noInterest' ||
                        statusId === 'failedContact') && (
                        <div>
                            <div className="mb-2 text-xs text-gray-600 dark:text-gray-400">
                                Status Grund
                            </div>
                            {isLoadingInterpreterStatusReasons ? (
                                <>Lade Statusgründe...</>
                            ) : (
                                <RHFCombobox
                                    name="statusReasonId"
                                    control={form.control}
                                    options={interpreterStatusReasons || []}
                                    setValue={form.setValue}
                                    placeholder="Status Grund auswählen"
                                    showError
                                />
                            )}
                        </div>
                    )}
                    {(statusId === 'new' || statusId === 'contactLater') && (
                        <div>
                            <div className="mb-2 text-xs text-gray-600 dark:text-gray-400">
                                Datum der Nachverfolgung
                            </div>
                            <RHFInput
                                name="followUpDate"
                                control={form.control}
                                // label="Datum der Nachverfolgung"
                                placeholder="TT.MM.JJJJ"
                                type="date"
                                showError
                            />
                        </div>
                    )}
                    {statusId === 'interviewPlanned' && (
                        <div>
                            <div className="mb-2 text-xs text-gray-600 dark:text-gray-400">
                                Vorstellungsgespräch
                            </div>
                            <RHFInput
                                name="interviewDate"
                                control={form.control}
                                // label="Datum der Nachverfolgung"
                                placeholder="TT.MM.JJJJ"
                                type="date"
                                showError
                            />
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
                            disabled={isLoading}
                        >
                            Speichern & Historie hinzufügen
                        </Button>
                    </div>
                </NewCardItem>
            </form>
        </Form>
    );
}
