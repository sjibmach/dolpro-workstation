'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import RHFInput from '@/components/rhf/rhf-input';
import RHFCombobox from '@/components/rhf/rhf-combobox';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
    useQueryInterpretersList,
    useQueryJobCompletionStatuses,
    useQueryJobStatuses,
} from '@/hooks/react-query/react-query-hooks';
import { TJobFullOverview } from '@/lib/prismaTypes';
import { NewCardItem } from '@/components/custom-ui/new-card';
import { Button } from '@/components/ui/button';
import { RHFSwitch } from '@/components/rhf/rhf-switch';
import { RHFTextArea } from '@/components/rhf/rhf-textarea';
import { RHFRadioGroupCards } from '@/components/rhf/rhf-radio-group-cards';
import axios from 'axios';
import { toast } from 'sonner';
import { calculateJobStatus } from '@/lib/calculate-status/calculate-job-status';
import { THistoryEntry } from '@/lib/types';

const JobStatusEditFormSchema = z.object({
    id: z.string(),
    interpreterId: z.string().nullable().optional(),
    statusId: z.string(),
    jobDate: z.string().nullable().optional(),
    isConfirmedInterpreter: z.boolean(),
    isConfirmedClient: z.boolean(),
    jobCompletionStatusId: z.string().nullable().optional(),
    note: z.string().nullable().optional(),
});

export type TJobStatusEditForm = z.infer<typeof JobStatusEditFormSchema>;

export function JobStatusEditForm({ job }: { job: TJobFullOverview }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const { data: interpreters, isLoading: isLoadingInterpreters } =
        useQueryInterpretersList();
    const { data: jobStatuses, isLoading: isLoadingJobStatuses } =
        useQueryJobStatuses();
    const {
        data: jobCompletionStatuses,
        isLoading: isLoadingJobCompletionStatus,
    } = useQueryJobCompletionStatuses();

    const form = useForm<TJobStatusEditForm>({
        resolver: zodResolver(JobStatusEditFormSchema),
        defaultValues: {
            id: job.id,
            interpreterId: job.interpreter?.id || null,
            statusId: job.statusId,
            jobDate: job.jobDate
                ? new Date(job.jobDate).toISOString().split('T')[0]
                : '',
            isConfirmedClient: !!job.isConfirmedClient,
            isConfirmedInterpreter: !!job.isConfirmedInterpreter,
            jobCompletionStatusId: job.jobCompletionStatusId
                ? job.jobCompletionStatusId
                : null,
            note: '',
        },
    });

    const interpreterId = form.watch('interpreterId');
    const jobDate = form.watch('jobDate');
    const isConfirmedInterpreter = form.watch('isConfirmedInterpreter');
    const isConfirmedClient = form.watch('isConfirmedClient');
    const jobCompletionStatusId = form.watch('jobCompletionStatusId');

    const allSet =
        !!interpreterId &&
        !!jobDate &&
        !!isConfirmedClient &&
        !!isConfirmedInterpreter;

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Nur Datum vergleichen

    const jobDateObj = jobDate ? new Date(jobDate) : null;
    jobDateObj?.setHours(0, 0, 0, 0);

    const isFuture = jobDateObj ? jobDateObj > today : false;
    const isTodayOrPast = jobDateObj ? jobDateObj <= today : false;

    const filteredCompletionStatuses = jobCompletionStatuses?.filter(status => {
        // Immer ausgewählte Optionen zulassen
        if (status.id === jobCompletionStatusId) return true;
        // Immer: Abgesagte Optionen zulassen
        else if (status.id.startsWith('canceled')) return true;
        else if (!allSet) {
            return status.id === 'inProgress';
        } else if (allSet && isFuture) {
            return status.id === 'scheduled';
        } else if (allSet && isTodayOrPast) {
            return [
                'completed',
                'aborted',
                'noShowByInterpreter',
                'noShowByClient',
            ].includes(status.id);
        }

        return false;
    });

    useEffect(() => {
        const jobDateObj = jobDate ? new Date(jobDate) : null;

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        jobDateObj?.setHours(0, 0, 0, 0);

        const isFuture = jobDateObj ? jobDateObj > today : false;

        if (
            !allSet &&
            (!jobCompletionStatusId || jobCompletionStatusId === 'scheduled')
        )
            form.setValue('jobCompletionStatusId', 'inProgress');
        else if (
            allSet &&
            (!jobCompletionStatusId ||
                jobCompletionStatusId === 'inProgress') &&
            isFuture
        )
            form.setValue('jobCompletionStatusId', 'scheduled');
    }, [allSet, jobDate, jobCompletionStatusId, form]);

    const onSubmit = async (values: TJobStatusEditForm) => {
        if (!values.interpreterId || !values.jobDate) {
            values.isConfirmedClient = false;
            values.isConfirmedInterpreter = false;
        }

        const newStatus = calculateJobStatus({
            interpreterId,
            isConfirmedClient,
            isConfirmedInterpreter,
            jobCompletionStatusId,
            jobDate,
        });

        values.statusId = newStatus.jobStatusId;
        values.jobCompletionStatusId = newStatus.jobCompletionStatusId;

        // form.setValues to update dirty fields
        form.setValue('statusId', newStatus.jobStatusId, { shouldDirty: true });
        form.setValue(
            'jobCompletionStatusId',
            newStatus.jobCompletionStatusId,
            { shouldDirty: true }
        );

        console.log('values', values);

        console.log('dirtyFields', form.formState.dirtyFields);

        const historyEntries = generateJobHistoryEntries({
            values: form.getValues(),
            dirtyFields: form.formState.dirtyFields,
        });

        const promise = axios.post('/api/job/edit/update-status', {
            values,
            historyEntries,
        });

        toast.promise(promise, {
            loading: 'Auftragsdetails werden aktualisiert...',
            success: 'Auftragsdetails erfolgreich aktualisiert',
            error: 'Fehler beim Aktualisieren der Auftragsdetails',
            position: 'top-right',
        });

        setIsLoading(true);

        try {
            await promise;
        } catch (error) {
            console.error('Error updating contact person:', error);
            form.reset();
        } finally {
            setIsLoading(false);
            router.refresh();
            form.reset(form.getValues());
            form.setValue('note', '');
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <NewCardItem
                    className="grid gap-x-8 gap-y-4 sm:grid-cols-2"
                    last
                    first
                >
                    <div>
                        <div className="mb-2 text-xs text-gray-600 dark:text-gray-400">
                            Dolmetscher
                        </div>
                        {isLoadingInterpreters ? (
                            <>lade Doletmscher...</>
                        ) : (
                            <RHFCombobox
                                name="interpreterId"
                                control={form.control}
                                placeholder="Dolmetscher auswählen"
                                options={interpreters}
                                showError
                                setValue={form.setValue}
                            />
                        )}
                    </div>
                    <div>
                        <div className="mb-2 text-xs text-gray-600 dark:text-gray-400">
                            Auftragsdatum
                        </div>
                        <RHFInput
                            name="jobDate"
                            type="date"
                            control={form.control}
                        />
                    </div>
                    {interpreterId && jobDate && (
                        <>
                            <div>
                                <div className="mb-2 text-xs text-gray-600 dark:text-gray-400">
                                    Bestätigung Dolmetscher
                                </div>
                                <RHFSwitch
                                    name="isConfirmedInterpreter"
                                    control={form.control}
                                    description="Dolmetscher bestätigte Termin"
                                />
                            </div>

                            <div>
                                <div className="mb-2 text-xs text-gray-600 dark:text-gray-400">
                                    Bestätigung Auftragsgeber
                                </div>
                                <RHFSwitch
                                    name="isConfirmedClient"
                                    control={form.control}
                                    description="Auftragsgeber bestätigte Termin"
                                />
                            </div>
                        </>
                    )}
                    <div className="col-span-full">
                        <div className="mb-2 text-xs text-gray-600 dark:text-gray-400">
                            Durchführungstatus
                        </div>
                        <RHFRadioGroupCards
                            name="jobCompletionStatusId"
                            options={filteredCompletionStatuses}
                            control={form.control}
                        />
                    </div>

                    <div className="col-span-full">
                        <div className="mb-2 text-xs text-gray-600 dark:text-gray-400">
                            Kommentar
                        </div>
                        <RHFTextArea name="note" control={form.control} />
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

type GenerateJobHistoryOptions = {
    values: TJobStatusEditForm;
    dirtyFields: Record<string, boolean>;
};

export function generateJobHistoryEntries({
    values,
    dirtyFields,
}: GenerateJobHistoryOptions): THistoryEntry[] {
    const entries: THistoryEntry[] = [];

    // explizit erlaubte Felder (kein jobCompletionStatusId!)
    const fieldMap: { [key: string]: keyof typeof values } = {
        interpreterId: 'interpreterId',
        jobDate: 'jobDate',
        isConfirmedInterpreter: 'isConfirmedInterpreter',
        isConfirmedClient: 'isConfirmedClient',
        statusId: 'statusId',
    };

    // durchgehen, aber nur erlaubte Felder & geänderte Werte
    for (const field of Object.keys(fieldMap)) {
        if (dirtyFields[field]) {
            const rawValue = values[fieldMap[field]];
            entries.push({
                field,
                newValue:
                    rawValue !== null && rawValue !== undefined
                        ? String(rawValue)
                        : null,
            });
        }
    }

    const note = values.note?.trim();
    const hasNote = !!note;

    if (hasNote) {
        if (entries.length > 0) {
            // Hinweis zu Änderungen
            entries.push({
                field: 'note',
                newValue: null,
                comment: note,
            });
        } else {
            // Nur Kommentar, keine Feldänderung
            entries.push({
                field: null,
                newValue: null,
                comment: note,
            });
        }
    }

    return entries;
}
