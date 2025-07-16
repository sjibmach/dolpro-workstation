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
import { Client } from '@prisma/client';
import { useState } from 'react';
import { useQueryCities } from '@/hooks/react-query/react-query-hooks';

const clientAddressEditSchema = z.object({
    id: z.string(),
    street: z.string().nullable().optional(),
    zip: z.string().nullable().optional(),
    cityId: z.string().nullable().optional(),
});

export type TClientAddressEdit = z.infer<typeof clientAddressEditSchema>;

export function ClientAddressEditModal({
    client,
}: {
    client: Client | undefined;
}) {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const { data: cities, isLoading: isLoadingCities } = useQueryCities();

    const form = useForm<TClientAddressEdit>({
        resolver: zodResolver(clientAddressEditSchema),
        defaultValues: {
            id: client?.id || '',
            street: client?.street || '',
            zip: client?.zip || '',
            cityId: client?.cityId || null,
        },
        values: {
            id: client?.id || '',
            street: client?.street || '',
            zip: client?.zip || '',
            cityId: client?.cityId || null,
        },
    });

    const onSubmit = async (values: TClientAddressEdit) => {
        console.log('values', values);

        const promise = axios.post('/api/client/edit/address', values);

        toast.promise(promise, {
            loading: 'Auftragsgeber wird aktualisiert...',
            success: 'Auftragsgeber erfolgreich aktualisiert',
            error: 'Fehler beim Aktualisieren des Auftragsgebers',
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
                        control={form.control}
                        label="Straße"
                        placeholder="Straße"
                        showError
                    />
                    <RHFInput
                        name="zip"
                        control={form.control}
                        label="PLZ"
                        placeholder="Postleitzahl"
                        showError
                    />
                    <RHFCombobox
                        name="cityId"
                        control={form.control}
                        label="Ort"
                        options={cities || []}
                        setValue={form.setValue}
                        creatable
                        placeholder="Ort"
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
            title="Adresse des Auftragsgebers bearbeiten"
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
