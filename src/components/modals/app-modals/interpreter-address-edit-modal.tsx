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
import { useQueryCities } from '@/hooks/react-query/react-query-hooks';
import RHFCombobox from '@/components/rhf/rhf-combobox';

const InterpreterAddressEditSchema = z.object({
    id: z.string(),
    street: z.string().nullable().optional(),
    zip: z.string().nullable().optional(),
    cityId: z.string().nullable().optional(),
});

export type TInterpreterAddressEdit = z.infer<
    typeof InterpreterAddressEditSchema
>;

export function InterpreterAddressEditModal({
    interpreter,
}: {
    interpreter: TInterpreterFullOverview;
}) {
    const { data: cities, isLoading: isLoadingCities } = useQueryCities();

    const [open, setOpen] = useState(false);
    const router = useRouter();

    const form = useForm<TInterpreterAddressEdit>({
        resolver: zodResolver(InterpreterAddressEditSchema),
        defaultValues: {
            id: interpreter.id,
            street: interpreter.street ? interpreter.street : '',
            zip: interpreter.zip ? interpreter.zip : '',
            cityId: interpreter.cityId ? interpreter.cityId : '',
        },
        values: {
            id: interpreter.id,
            street: interpreter.street ? interpreter.street : '',
            zip: interpreter.zip ? interpreter.zip : '',
            cityId: interpreter.cityId ? interpreter.cityId : '',
        },
    });

    const onSubmit = async (values: TInterpreterAddressEdit) => {
        console.log('values', values);

        const promise = axios.post('/api/interpreter/edit/address', values);

        toast.promise(promise, {
            loading: 'Dolmetscher wird aktualisiert...',
            success: 'Dolmetscher erfolgreich aktualisiert',
            error: 'Fehler beim Aktualisieren des Dolmetschers',
            position: 'top-center',

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
                        name="street"
                        label="Straße"
                        placeholder="Straße und Hausnummer"
                        control={form.control}
                        showError
                    />
                    <RHFInput
                        name="zip"
                        label="Postleitzahl"
                        placeholder="PLZ"
                        control={form.control}
                        showError
                    />
                    <RHFCombobox
                        name="cityId"
                        label="Stadt"
                        placeholder="Stadt auswählen"
                        control={form.control}
                        options={cities}
                        showError
                        creatable
                        setValue={form.setValue}
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
