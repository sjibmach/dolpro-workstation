'use client';
import Modal from '../ui/modal';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import RHFInput from '@/components/rhf/rhf-input';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { PiFeather } from 'react-icons/pi';
import { useState } from 'react';
import { TInterpreterFullOverview } from '@/lib/prismaTypes';
import RHFCombobox from '@/components/rhf/rhf-combobox';
import { RHFTextArea } from '@/components/rhf/rhf-textarea';

const InterpreterBillingEditSchema = z.object({
    id: z.string(),
    defaultHourlyRate: z.number().nullable().optional(),
    kmRate: z.number().nullable().optional(),
    iban: z.string().nullable().optional(),
    notes: z.string().nullable().optional(),
});

export type TInterpreterBillingEdit = z.infer<
    typeof InterpreterBillingEditSchema
>;

export function InterpreterBillingEditModal({
    interpreter,
}: {
    interpreter: TInterpreterFullOverview;
}) {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const form = useForm<TInterpreterBillingEdit>({
        resolver: zodResolver(InterpreterBillingEditSchema),
        defaultValues: {
            id: interpreter.id,
            defaultHourlyRate: interpreter.defaultHourlyRate
                ? interpreter.defaultHourlyRate
                : 0,
            kmRate: interpreter.kmRate ? interpreter.kmRate : 0,
            iban: interpreter.iban ? interpreter.iban : '',
            notes: interpreter.notes ? interpreter.notes : '',
        },
        values: {
            id: interpreter.id,
            defaultHourlyRate: interpreter.defaultHourlyRate
                ? interpreter.defaultHourlyRate
                : 0,
            kmRate: interpreter.kmRate ? interpreter.kmRate : 0,
            iban: interpreter.iban ? interpreter.iban : '',
            notes: interpreter.notes ? interpreter.notes : '',
        },
    });

    const onSubmit = async (values: TInterpreterBillingEdit) => {
        console.log('values', values);

        const promise = axios.post('/api/interpreter/edit/billing', values);

        toast.promise(promise, {
            loading: 'Dolmetscher wird aktualisiert...',
            success: 'Dolmetscher erfolgreich aktualisiert',
            error: 'Fehler beim Aktualisieren des Dolmetschers',
        });

        try {
            await promise;
            setOpen(false);
        } catch (error) {
            console.error('Fehler beim Senden des Formulars:', error);
        } finally {
            form.reset();
            router.refresh();
        }
    };

    const body = (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="my-4 grid gap-x-4 gap-y-6 sm:grid-cols-2">
                    <RHFInput
                        name="defaultHourlyRate"
                        label="Stundensatz"
                        control={form.control}
                        type="number"
                        showError
                    />
                    <RHFInput
                        name="kmRate"
                        label="Km Pauschale"
                        control={form.control}
                        type="number"
                        showError
                    />
                    <div className="col-span-full">
                        <RHFInput
                            name="iban"
                            label="Iban"
                            control={form.control}
                            showError
                        />
                    </div>
                    <div className="col-span-full">
                        <RHFTextArea
                            name="notes"
                            label="Notizen"
                            control={form.control}
                            showError
                        />
                    </div>
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
            title="Adresse des Dolmetschers bearbeiten"
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
