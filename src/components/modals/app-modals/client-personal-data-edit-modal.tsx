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
import {
    useQueryClientTypes,
    useQueryClientStatuses,
} from '@/hooks/react-query/react-query-hooks';

const ClientPersonDataEditSchema = z
    .object({
        id: z.string(),
        name: z.string().min(2, {
            message: 'Name muss mindestens 2 Zeichen lang sein.',
        }),
        nameShortcut: z.string().nullable().optional(),
        clientTypeId: z.string().nullable().optional(),
        statusId: z.string(),
        phone: z.string().optional(),
        email: z
            .string()
            .trim()
            .optional()
            .nullable()
            .refine(
                data => {
                    if (!data) return true;
                    // regex prüfen ob email gültig ist
                    const emailRegex =
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                    return emailRegex.test(data);
                },
                { message: 'Bitte gültige E-Mail eingeben' }
            ),
    })
    .refine(
        data => {
            if (!data.clientTypeId) return false;
            return true;
        },
        { path: ['clientTypeId'], message: 'Organisationsart ist erforderlich' }
    );

export type TClientPersonalDataEdit = z.infer<
    typeof ClientPersonDataEditSchema
>;

export function ClientPersonalDataEditModal({
    client,
}: {
    client: Client | undefined;
}) {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const { data: clientTypes, isLoading: isLoadingClientTypes } =
        useQueryClientTypes();

    const { data: clientStatuses, isLoading: isLoadingClientStatuses } =
        useQueryClientStatuses();

    const form = useForm<TClientPersonalDataEdit>({
        resolver: zodResolver(ClientPersonDataEditSchema),
        defaultValues: {
            id: client?.id || '',
            name: '',
            nameShortcut: '',
            statusId: 'new',
            clientTypeId: null,
            email: '',
            phone: '',
        },
        values: {
            id: client?.id || '',
            name: client?.name || '',
            nameShortcut: client?.nameShortcut || '',
            statusId: client?.statusId || 'new',
            clientTypeId: client?.typeId || null,
            email: client?.email || '',
            phone: client?.phone || '',
        },
    });

    const onSubmit = async (values: TClientPersonalDataEdit) => {
        console.log('values', values);

        const promise = axios.post('/api/client/edit/personal-data', values);

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
                    <div className="col-span-2"></div>
                    <RHFInput
                        name="name"
                        control={form.control}
                        label="Name des Auftragsgebers *"
                        placeholder="Name"
                        showError
                    />
                    <RHFInput
                        name="nameShortcut"
                        control={form.control}
                        label="Kürzel"
                        placeholder="Kürzel"
                        showError
                    />
                    {isLoadingClientTypes ? (
                        <>Lade Client Types...</>
                    ) : (
                        <RHFCombobox
                            name="clientTypeId"
                            control={form.control}
                            label="Organisationsart *"
                            options={clientTypes || []}
                            setValue={form.setValue}
                        />
                    )}
                    {isLoadingClientStatuses ? (
                        <>Lade Status...</>
                    ) : (
                        <RHFCombobox
                            name="statusId"
                            control={form.control}
                            label="Status *"
                            options={clientStatuses || []}
                            setValue={form.setValue}
                        />
                    )}
                    <RHFInput
                        name="email"
                        control={form.control}
                        label="E-Mail"
                        placeholder="E-Mail-Adresse"
                        type="email"
                        showError
                    />
                    <RHFInput
                        name="phone"
                        control={form.control}
                        label="Telefon"
                        placeholder="Telefonnummer"
                        type="tel"
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
            title="Personaldaten Auftragsgebers bearbeiten"
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
