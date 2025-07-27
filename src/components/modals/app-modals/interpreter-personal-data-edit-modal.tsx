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
import { RHFSelect } from '@/components/rhf/rhf-select';

const InterpreterPersonDataEditSchema = z.object({
    id: z.string(),
    firstName: z.string().nullable().optional(),
    lastName: z.string().min(1, {
        message: 'Nachname ist erforderlich',
    }),
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
    phone1: z.string().nullable().optional(),
    phone2: z.string().nullable().optional(),
    gender: z.string().nullable().optional(),
    birthDate: z.string().nullable().optional(),
    interviewDate: z.string().nullable().optional(),
});

export type TInterpreterPersonalDataEdit = z.infer<
    typeof InterpreterPersonDataEditSchema
>;

export function InterpreterPersonalDataEditModal({
    interpreter,
}: {
    interpreter: TInterpreterFullOverview;
}) {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const form = useForm<TInterpreterPersonalDataEdit>({
        resolver: zodResolver(InterpreterPersonDataEditSchema),
        defaultValues: {
            id: interpreter.id,
            firstName: interpreter.firstName ? interpreter.firstName : '',
            lastName: interpreter.lastName,
            email: interpreter.email ? interpreter.email : '',
            phone1: interpreter.phone1 ? interpreter.phone1 : '',
            phone2: interpreter.phone2 ? interpreter.phone2 : '',
            gender: interpreter.gender ? interpreter.gender : '',
            birthDate: interpreter.birthDate
                ? interpreter.birthDate.toISOString().split('T')[0]
                : '',
            interviewDate: interpreter.interviewDate
                ? interpreter.interviewDate.toISOString().split('T')[0]
                : '',
        },
        values: {
            id: interpreter.id!,
            firstName: interpreter.firstName ? interpreter.firstName : '',
            lastName: interpreter.lastName!,
            email: interpreter.email ? interpreter.email : '',
            phone1: interpreter.phone1 ? interpreter.phone1 : '',
            phone2: interpreter.phone2 ? interpreter.phone2 : '',
            gender: interpreter.gender ? interpreter.gender : '',
            birthDate: interpreter.birthDate
                ? interpreter.birthDate.toISOString().split('T')[0]
                : '',
            interviewDate: interpreter.interviewDate
                ? interpreter.interviewDate.toISOString().split('T')[0]
                : '',
        },
    });

    const onSubmit = async (values: TInterpreterPersonalDataEdit) => {
        console.log('values', values);

        const promise = axios.post(
            '/api/interpreter/edit/personal-data',
            values
        );

        toast.promise(promise, {
            loading: 'Dolmetscher wird aktualisiert...',
            success: 'Dolmetscher erfolgreich aktualisiert',
            error: 'Fehler beim Aktualisieren des Dolmetschers',
            position: 'top-right',
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
                        name="firstName"
                        label="Vorname"
                        placeholder="Vorname"
                        control={form.control}
                        showError
                    />
                    <RHFInput
                        name="lastName"
                        label="Nachname *"
                        placeholder="Nachname"
                        control={form.control}
                        showError
                    />
                    <RHFInput
                        name="email"
                        label="E-Mail"
                        placeholder="E-Mail"
                        control={form.control}
                        showError
                    />
                    <RHFSelect
                        name="gender"
                        label="Geschlecht"
                        control={form.control}
                        options={[
                            { id: 'm', name: 'Männlich' },
                            { id: 'w', name: 'Weiblich' },
                        ]}
                        placeholder="Geschlecht auswählen"
                    />
                    <RHFInput
                        name="phone1"
                        label="Telefon 1"
                        placeholder="Telefon 1"
                        control={form.control}
                        showError
                    />
                    <RHFInput
                        name="phone2"
                        label="Telefon 2"
                        placeholder="Telefon 2"
                        control={form.control}
                        showError
                    />
                    <RHFInput
                        name="birthDate"
                        label="Geburstdatum"
                        type="date"
                        control={form.control}
                        showError
                    />
                    <RHFInput
                        name="interviewDate"
                        label="Vorstellungsgespräch"
                        type="date"
                        control={form.control}
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
            title="Personaldaten des Dolmetschers bearbeiten"
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
