'use client';
import Modal from '../ui/modal';
import { Button } from '@/components/ui/button';
import { HiPlus } from 'react-icons/hi2';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
    useQueryCities,
    useQueryLanguages,
} from '@/hooks/react-query/react-query-hooks';
import RHFInput from '@/components/rhf/rhf-input';
import { RHFSelect } from '@/components/rhf/rhf-select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TIdAndNameObject } from '@/lib/types';
import RHFCombobox from '@/components/rhf/rhf-combobox';
import { RHFMultiSelect } from '@/components/rhf/rhf-multi-select';
import { RHFSwitch } from '@/components/rhf/rhf-switch';
import { Label } from '@/components/ui/label';

const InterpreterAddSchema = z.object({
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

    street: z.string().nullable().optional(),
    zip: z.string().nullable().optional(),
    cityId: z.string().nullable().optional(),

    offersRemote: z.boolean().nullable().optional(),
    offersOnSite: z.boolean().nullable().optional(),
    car: z.boolean().nullable().optional(),
    availability: z.string().nullable().optional(),

    startDate: z.string().nullable().optional(),
    endDate: z.string().nullable().optional(),
    interviewDate: z.string().nullable().optional(),
    defaultHourlyRate: z.number().nullable().optional(),
    kmRate: z.number().nullable().optional(),
    iban: z.string().nullable().optional(),
    note: z.string().nullable().optional(),

    languages: z.array(
        z.object({
            id: z.string(),
        })
    ),

    preferredCities: z.array(
        z.object({
            id: z.string(),
        })
    ),
    statusId: z.string(),
});

export type TInterpreterAdd = z.infer<typeof InterpreterAddSchema>;

export function InterpreterAddModal() {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const { data: cities, isLoading: isLoadingCities } = useQueryCities();
    const { data: languages, isLoading: isLoadingLanguages } =
        useQueryLanguages();

    const form = useForm<TInterpreterAdd>({
        resolver: zodResolver(InterpreterAddSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone1: '',
            phone2: '',
            gender: '',
            birthDate: '',
            street: '',
            zip: '',
            cityId: '',
            offersRemote: false,
            offersOnSite: false,
            car: false,
            availability: '',
            startDate: '',
            endDate: '',
            interviewDate: '',
            defaultHourlyRate: 0,
            kmRate: 0,
            iban: '',
            note: '',
            languages: [],
            preferredCities: [],
            statusId: 'new',
        },
    });

    const onSubmit = async (values: TInterpreterAdd) => {
        console.log('values', values);

        // const promise = axios.post('/api/interpreter/add', values);

        // toast.promise(promise, {
        //     loading: 'Dolmetscher wird hinzugefügt...',
        //     success: 'Dolmetscher erfolgreich hinzugefügt',
        //     error: 'Fehler beim Hinzufügen des Dolmetschers',
        // });

        // try {
        //     await promise;
        //     setOpen(false);
        // } catch (error) {
        //     console.error('Fehler beim Senden des Formulars:', error);
        // } finally {
        //     form.reset();
        //     router.refresh();
        // }
    };

    const body = (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Tabs defaultValue="general">
                    <TabsList className="mb-4 grid grid-cols-3 gap-2">
                        <TabsTrigger value="general">Persönlich</TabsTrigger>
                        <TabsTrigger value="address">Adresse</TabsTrigger>
                        <TabsTrigger value="billing">Rechnung</TabsTrigger>
                    </TabsList>

                    {/* Persönliche Daten */}
                    <TabsContent
                        value="general"
                        className="my-4 grid gap-x-4 gap-y-6 sm:grid-cols-2"
                    >
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

                        <div className="col-span-full">
                            {isLoadingLanguages ? (
                                <p>Lade Sprachen...</p>
                            ) : (
                                <RHFMultiSelect
                                    label="Sprachen"
                                    options={languages as TIdAndNameObject[]}
                                    control={form.control}
                                    setValue={form.setValue}
                                    name="languages"
                                />
                            )}
                        </div>

                        <div className="col-span-full">
                            {isLoadingCities ? (
                                <p>Lade Städte...</p>
                            ) : (
                                <RHFMultiSelect
                                    label="Städte"
                                    options={cities as TIdAndNameObject[]}
                                    control={form.control}
                                    setValue={form.setValue}
                                    name="preferredCities"
                                />
                            )}
                        </div>
                        <RHFInput
                            name="interviewDate"
                            control={form.control}
                            label="Vorstellungsgespräch"
                            type="date"
                        />
                        <RHFInput
                            name="birthDate"
                            control={form.control}
                            label="Geburtsdatum"
                            type="date"
                        />
                    </TabsContent>

                    {/* Ort und Zeit */}
                    <TabsContent
                        value="address"
                        className="my-4 grid gap-x-4 gap-y-6 sm:grid-cols-2"
                    >
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
                    </TabsContent>

                    {/* Rechnungen */}
                    <TabsContent
                        value="billing"
                        className="my-4 grid gap-x-4 gap-y-6 sm:grid-cols-2"
                    >
                        <div className="col-span-full grid gap-x-4 gap-y-6 sm:grid-cols-3">
                            <RHFSwitch
                                label="Vorort"
                                name="offersOnSite"
                                control={form.control}
                                description="Vor Ort anbieten"
                            />
                            <RHFSwitch
                                label="Online"
                                name="offersRemote"
                                control={form.control}
                                description="Online anbieten"
                            />
                            <RHFSwitch
                                label="Auto"
                                name="car"
                                control={form.control}
                                description="Auto verfügbar"
                            />
                        </div>

                        <div className="mb-8">
                            <RHFInput
                                name="availability"
                                control={form.control}
                                label="Bevorzugte Zeiten"
                            />
                        </div>
                        <div />

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
                        <RHFInput
                            name="iban"
                            label="Iban"
                            control={form.control}
                            showError
                        />
                    </TabsContent>
                </Tabs>
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
            title="Dolmetscher hinzufügen"
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
