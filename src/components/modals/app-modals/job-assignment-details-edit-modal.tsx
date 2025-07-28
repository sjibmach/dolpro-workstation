'use client';
import Modal from '../ui/modal';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import RHFInput from '@/components/rhf/rhf-input';
import RHFCombobox from '@/components/rhf/rhf-combobox';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { PiFeather } from 'react-icons/pi';
import { useState } from 'react';
import {
    useQueryInterpretersList,
    useQueryJobStatuses,
} from '@/hooks/react-query/react-query-hooks';
import { TJobFullOverview } from '@/lib/prismaTypes';

const JobAssignmentDetailsEditSchema = z.object({
    id: z.string(),
    interpreterId: z.string().nullable().optional(),
    statusId: z.string(),
    jobDate: z.string().nullable().optional(),
});

export type TJobAssignmenDetailsEditModal = z.infer<
    typeof JobAssignmentDetailsEditSchema
>;

export function JobAssignmentDetailsEditModal({
    job,
}: {
    job: TJobFullOverview;
}) {
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const { data: interpreters, isLoading: isLoadingInterpreters } =
        useQueryInterpretersList();
    const { data: jobStatuses, isLoading: isLoadingJobStatuses } =
        useQueryJobStatuses();

    const form = useForm<TJobAssignmenDetailsEditModal>({
        resolver: zodResolver(JobAssignmentDetailsEditSchema),
        defaultValues: {
            id: job.id,
            interpreterId: job.interpreter?.id || null,
            statusId: job.statusId,
            jobDate: job.jobDate
                ? new Date(job.jobDate).toISOString().split('T')[0]
                : '',
        },
        values: {
            id: job.id,
            interpreterId: job.interpreter?.id || null,
            statusId: job.statusId,
            jobDate: job.jobDate
                ? new Date(job.jobDate).toISOString().split('T')[0]
                : '',
        },
    });

    const onSubmit = async (values: TJobAssignmenDetailsEditModal) => {
        console.log('values', values);

        const promise = axios.post('/api/job/edit/assignment-details', values);

        toast.promise(promise, {
            loading: 'Auftragsdetails werden aktualisiert...',
            success: 'Auftragsdetails erfolgreich aktualisiert',
            error: 'Fehler beim Aktualisieren der Auftragsdetails',
            position: 'top-right',
        });

        try {
            await promise;
            setOpen(false);
        } catch (error) {
            console.error('Error updating contact person:', error);
        } finally {
            form.reset();
            router.refresh();
        }
    };

    const body = (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="my-4 grid gap-x-4 gap-y-6 sm:grid-cols-2">
                    {isLoadingInterpreters ? (
                        <>lade Doletmscher...</>
                    ) : (
                        <RHFCombobox
                            name="interpreterId"
                            control={form.control}
                            label="Dolmetscher"
                            placeholder="Dolmetscher auswählen"
                            options={interpreters}
                            showError
                            setValue={form.setValue}
                        />
                    )}
                    {isLoadingJobStatuses ? (
                        <>Lade Status...</>
                    ) : (
                        <RHFCombobox
                            name="statusId"
                            control={form.control}
                            label="Status"
                            placeholder="Status auswählen"
                            options={jobStatuses}
                            showError
                            setValue={form.setValue}
                        />
                    )}
                    <RHFInput
                        name="jobDate"
                        type="date"
                        control={form.control}
                        label="Auftragsdatum"
                    />
                </div>
            </form>
        </Form>
    );

    const trigger = (
        <div className="cursor-pointer rounded-lg p-2 hover:bg-orange-200 dark:hover:bg-orange-700">
            <PiFeather size={20} />
        </div>
    );

    return (
        <Modal
            trigger={trigger}
            size="md"
            title="Auftragsdetails bearbeiten"
            body={body}
            dialogAction={form.handleSubmit(onSubmit)}
            dialogClose={true}
            dialogActionLabel="Speichern"
            open={open}
            onOpenChange={isOpen => {
                setOpen(isOpen);
                if (!isOpen) form.reset();
            }}
        />
    );
}
