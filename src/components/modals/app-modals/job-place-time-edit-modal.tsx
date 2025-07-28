'use client';
import Modal from '../ui/modal';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { PiFeather } from 'react-icons/pi';
import { useState } from 'react';
import { useQueryJobModes } from '@/hooks/react-query/react-query-hooks';
import { TJobFullOverview } from '@/lib/prismaTypes';
import { RHFRadioGroupCards } from '@/components/rhf/rhf-radio-group-cards';
import RHFInput from '@/components/rhf/rhf-input';

const JobPlaceTimeEditSchema = z.object({
    id: z.string(),
    jobModeId: z.string().nullable().optional(),
    rhythmText: z.string().nullable().optional(),
    jobDate: z.string().nullable().optional(),
    entryDate: z.string().nullable().optional(),

    startTime: z.string().nullable().optional(),
    endTime: z.string().nullable().optional(),
});

export type TJobPlaceTimeEdit = z.infer<typeof JobPlaceTimeEditSchema>;

export function JobPlaceTimeEditModal({ job }: { job: TJobFullOverview }) {
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const { data: jobModes, isLoading: isLoadingJobModes } = useQueryJobModes();

    const form = useForm<TJobPlaceTimeEdit>({
        resolver: zodResolver(JobPlaceTimeEditSchema),
        defaultValues: {
            id: job.id,
            jobModeId: job.jobModeId,
            rhythmText: job.rhythmText || '',
            startTime: job.startTime,
            endTime: job.endTime,
            // jobDate: job.jobDate
            //     ? new Date(job.jobDate).toISOString().split('T')[0]
            //     : '',
            entryDate: job.entryDate
                ? new Date(job.entryDate).toISOString().split('T')[0]
                : '',
        },
    });

    const onSubmit = async (values: TJobPlaceTimeEdit) => {
        console.log('values', values);

        const promise = axios.post('/api/job/edit/place-time', values);

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
                    {isLoadingJobModes ? (
                        <>Lade Modes...</>
                    ) : (
                        <RHFRadioGroupCards
                            name="jobModeId"
                            control={form.control}
                            label="Modus"
                            options={jobModes}
                        />
                    )}
                    <RHFInput
                        name="rhythmText"
                        control={form.control}
                        label="Rhythm"
                        showError
                    />
                    {/* <RHFInput
                        name="jobDate"
                        label="Datum"
                        placeholder="Datum auswählen"
                        control={form.control}
                        type="date"
                    /> */}

                    <RHFInput
                        name="startTime"
                        label="Beginn"
                        placeholder="Startzeit auswählen"
                        control={form.control}
                        type="time"
                    />

                    <RHFInput
                        name="endTime"
                        label="Ende"
                        placeholder="Endzeit auswählen"
                        control={form.control}
                        type="time"
                    />
                    <RHFInput
                        name="entryDate"
                        label="Wann kam der Auftrag rein?"
                        placeholder="Endzeit auswählen"
                        control={form.control}
                        type="date"
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
