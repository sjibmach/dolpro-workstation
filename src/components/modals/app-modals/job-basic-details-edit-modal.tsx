'use client';
import Modal from '../ui/modal';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import RHFCombobox from '@/components/rhf/rhf-combobox';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { PiFeather } from 'react-icons/pi';
import { useState } from 'react';
import {
    useQueryClientsList,
    useQueryJobPriorities,
    useQueryJobTypes,
    useQueryLanguages,
} from '@/hooks/react-query/react-query-hooks';
import { TJobFullOverview } from '@/lib/prismaTypes';
import { RHFTextArea } from '@/components/rhf/rhf-textarea';

const JobBasicDetailsEditSchema = z.object({
    id: z.string(),
    clientId: z.string().min(1, 'Auftraggeber ist erforderlich'),
    languageToId: z.string().min(1, 'Zielsprache ist erforderlich'),
    jobTypeId: z.string().nullable().optional(),
    priorityId: z.string().min(1, 'Priorität is erforderlich'),
    description: z.string().nullable().optional(),
});

export type TJobBasicDetailsEdit = z.infer<typeof JobBasicDetailsEditSchema>;

export function JobBasicDetailsEditModal({ job }: { job: TJobFullOverview }) {
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const { data: clients, isLoading: isLoadingClients } =
        useQueryClientsList();
    const { data: jobTypes, isLoading: isLoadingJobTypes } = useQueryJobTypes();

    const { data: priorities, isLoading: isLoadingPriority } =
        useQueryJobPriorities();

    const { data: languages, isLoading: isLoadingLanguages } =
        useQueryLanguages();

    const form = useForm<TJobBasicDetailsEdit>({
        resolver: zodResolver(JobBasicDetailsEditSchema),
        defaultValues: {
            id: job.id,
            clientId: job.clientId,
            languageToId: job.languageToId,
            jobTypeId: job.jobTypeId,
            priorityId: job.priorityId || 'medium',
            description: job.description,
        },
    });

    const onSubmit = async (values: TJobBasicDetailsEdit) => {
        console.log('values', values);

        const promise = axios.post('/api/job/edit/basic-details', values);

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
                    {isLoadingClients ? (
                        <div>Lade Auftragsgeber...</div>
                    ) : (
                        <RHFCombobox
                            name="clientId"
                            control={form.control}
                            label="Auftragsgeber"
                            placeholder="Auftragsgeber auswählen"
                            options={clients}
                            showError
                            setValue={form.setValue}
                        />
                    )}
                    {isLoadingLanguages ? (
                        <div>Lade Sprachen...</div>
                    ) : (
                        <RHFCombobox
                            name="languageToId"
                            control={form.control}
                            label="Sprache"
                            placeholder="Sprache auswählen"
                            options={languages}
                            showError
                            setValue={form.setValue}
                        />
                    )}
                    {isLoadingJobTypes ? (
                        <div>Lade Typen...</div>
                    ) : (
                        <RHFCombobox
                            name="jobTypeId"
                            control={form.control}
                            label="Auftragstype"
                            placeholder="Type auswählen"
                            options={jobTypes}
                            showError
                            setValue={form.setValue}
                        />
                    )}
                    {isLoadingPriority ? (
                        <div>Lade Prioritäten...</div>
                    ) : (
                        <RHFCombobox
                            name="priorityId"
                            control={form.control}
                            label="Priorität"
                            placeholder="Priorität auswählen"
                            options={priorities}
                            showError
                            setValue={form.setValue}
                        />
                    )}
                    <RHFTextArea
                        label="Beschreibung"
                        control={form.control}
                        name="description"
                        showError
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
