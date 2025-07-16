'use client';
import Modal from '../ui/modal';
import { Button } from '@/components/ui/button';
import { HiPlus } from 'react-icons/hi2';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import RHFInput from '@/components/rhf/rhf-input';
import RHFCombobox from '@/components/rhf/rhf-combobox';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useState } from 'react';
import {
    useQueryCities,
    useQueryClientStatuses,
    useQueryClientTypes,
} from '@/hooks/react-query/react-query-hooks';

const clientAddSchema = z
    .object({
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

        street: z.string().nullable().optional(),
        zip: z.string().nullable().optional(),
        cityId: z.string().nullable().optional(),
    })
    .refine(
        data => {
            // if clientTypeId is null, then return false
            if (!data.clientTypeId) return false;
            return true;
        },
        { path: ['clientTypeId'], message: 'Organisationsart ist erforderlich' }
    );

export type TClientAdd = z.infer<typeof clientAddSchema>;

export function ClientAddModal() {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const { data: clientTypes, isLoading: isLoadingClientTypes } =
        useQueryClientTypes();

    const { data: clientStatuses, isLoading: isLoadingClientStatuses } =
        useQueryClientStatuses();

    const { data: cities, isLoading: isLoadingCities } = useQueryCities();

    const form = useForm<TClientAdd>({
        resolver: zodResolver(clientAddSchema),
        defaultValues: {
            name: '',
            nameShortcut: '',
            statusId: 'new',
            clientTypeId: null,
            email: '',
            phone: '',
            street: '',
            zip: '',
            cityId: null,
        },
    });

    const onSubmit = async (values: TClientAdd) => {
        console.log('values', values);

        const promise = axios.post('/api/client/add', values);

        toast.promise(promise, {
            loading: 'Kunde wird hinzugefügt...',
            success: 'Kunde erfolgreich hinzugefügt',
            error: 'Fehler beim Hinzufügen des Kunden',
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
                    <RHFCombobox
                        name="clientTypeId"
                        control={form.control}
                        label="Organisationsart *"
                        options={clientTypes || []}
                        setValue={form.setValue}
                    />
                    <RHFCombobox
                        name="statusId"
                        control={form.control}
                        label="Status"
                        options={clientStatuses || []}
                        setValue={form.setValue}
                        creatable
                    />
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
        <Button size="sm" variant="outline">
            <HiPlus />
            Neu
        </Button>
    );

    return (
        <Modal
            trigger={trigger}
            size="md"
            title="Auftragsgeber hinzufügen"
            body={body}
            dialogAction={form.handleSubmit(onSubmit)}
            dialogClose={true}
            dialogActionLabel="Hinzufügen"
            open={open}
            onOpenChange={isOpen => {
                setOpen(isOpen);
                if (!isOpen) form.reset();
            }}
        />
    );
}
