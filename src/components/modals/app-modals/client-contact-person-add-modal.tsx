'use client';
import Modal from '../modal';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import RHFInput from '@/components/rhf/rhf-input';
import RHFCombobox from '@/components/rhf/rhf-combobox';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import useClientContactPersonAddModal from './modal-hooks/use-client-contact-person-add-modal';
import { HiPlus } from 'react-icons/hi2';
import { useQuery } from '@tanstack/react-query';

const ClientContactPeronAddSchema = z.object({
    clientId: z.string(),
    salutation: z.string().nullable().optional(),
    firstName: z.string().nullable().optional(),
    lastName: z.string().min(2, {
        message: 'Nachname muss mindestens 2 Zeichen lang sein.',
    }),

    street: z.string().nullable().optional(),
    zip: z.string().nullable().optional(),
    cityId: z.string().nullable().optional(),

    phone: z.string().nullable().optional(),
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
});

export type TClientContactPersonAdd = z.infer<
    typeof ClientContactPeronAddSchema
>;

export function ClientContactPersonAddModal({
    clientId,
}: {
    clientId: string;
}) {
    const router = useRouter();

    const { isOpen, onOpenChange, onClose } = useClientContactPersonAddModal();

    const { data: cities, isLoading: isLoadingCities } = useQuery({
        queryKey: ['cities'],
        queryFn: async () =>
            fetch('/api/base-data/cities').then(res => res.json()),
    });

    const form = useForm<TClientContactPersonAdd>({
        resolver: zodResolver(ClientContactPeronAddSchema),
        defaultValues: {
            clientId,
            salutation: '',
            firstName: '',
            lastName: '',
            street: '',
            zip: '',
            cityId: null,
            phone: '',
            email: '',
        },
    });

    const onSubmit = async (values: TClientContactPersonAdd) => {
        console.log('values', values);

        const promise = axios.post('/api/client-contact-person/add', values);

        toast.promise(promise, {
            loading: 'Kontaktperson wird eingefügt...',
            success: 'Kontaktperson erfolgreich eingefügt',
            error: 'Fehler beim Einfügen der Kontaktperson',
        });

        try {
            await promise;
            onClose();
        } catch (error) {
            console.error('Error adding contact person:', error);
        } finally {
            form.reset();
            router.refresh();
        }
    };

    const body = (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="my-4 grid gap-x-4 gap-y-6 sm:grid-cols-2">
                    <RHFCombobox
                        name="salutation"
                        control={form.control}
                        label="Anrede"
                        placeholder="Anrede"
                        options={[
                            { id: 'Herr', name: 'Herr' },
                            { id: 'Frau', name: 'Frau' },
                        ]}
                        showError
                        setValue={form.setValue}
                    />
                    <div className="mb-10" />
                    <RHFInput
                        name="firstName"
                        control={form.control}
                        label="Vorname"
                        placeholder="Vorname"
                        showError
                    />
                    <RHFInput
                        name="lastName"
                        control={form.control}
                        label="Nachname *"
                        placeholder="Nachname"
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
                        placeholder="PLZ"
                        showError
                    />
                    <RHFCombobox
                        name="cityId"
                        control={form.control}
                        label="Ort"
                        placeholder="Ort"
                        options={cities}
                        showError
                        setValue={form.setValue}
                        creatable
                    />
                    {/* <div className="mb-10" /> */}
                    <RHFInput
                        name="phone"
                        control={form.control}
                        label="Telefon"
                        placeholder="Telefonnummer"
                        type="tel"
                        showError
                    />
                    <RHFInput
                        name="email"
                        control={form.control}
                        label="E-Mail"
                        placeholder="E-Mail"
                        type="email"
                        showError
                    />
                </div>
            </form>
        </Form>
    );

    const trigger = (
        <div className="cursor-pointer rounded-lg p-2 hover:bg-orange-200 dark:hover:bg-orange-700">
            <HiPlus size={20} />
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
            open={isOpen}
            onOpenChange={onOpenChange}
        />
    );
}
