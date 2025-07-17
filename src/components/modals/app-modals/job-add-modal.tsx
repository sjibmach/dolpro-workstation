'use client';
import Modal from '../ui/modal';
import { Button } from '@/components/ui/button';
import { HiPlus } from 'react-icons/hi2';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import RHFCombobox from '@/components/rhf/rhf-combobox';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
    useQueryCities,
    useQueryClientsForAddingJobs,
    useQueryJobPriorities,
    useQueryJobStatuses,
    useQueryJobTypes,
    useQueryLanguages,
} from '@/hooks/react-query/react-query-hooks';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { RHFTextArea } from '@/components/rhf/rhf-textarea';
import { RHFRadioGroup } from '@/components/rhf/rhf-radio-group';
import RHFInput from '@/components/rhf/rhf-input';
import { format } from 'date-fns';
import axios from 'axios';
import { toast } from 'sonner';

const JobAddSchema = z.object({
    clientId: z.string().min(1, 'Auftraggeber ist erforderlich'),
    statusId: z.string(),
    languageToId: z.string().min(1, 'Zielsprache ist erforderlich'),
    priorityId: z.string().nullable().optional(),
    jobTypeId: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    jobDate: z.string().nullable().optional(),
    startTime: z.string().nullable().optional(),
    endTime: z.string().nullable().optional(),
    mode: z.string().nullable().optional(),
    fee: z.number().nullable().optional(),
    interpreterFee: z.number().nullable().optional(),
    note: z.string().nullable().optional(),
    addressStreet: z.string().nullable().optional(),
    addressZip: z.string().nullable().optional(),
    addressCityId: z.string().nullable().optional(),
    entryDate: z.string().nullable().optional(),
    kmRateClient: z.number().nullable().optional(),
    kmRateInterpreter: z.number().nullable().optional(),
    rhythm: z.string().nullable().optional(),
    surchargeRareLanguage: z.number().nullable().optional(),
    surchargeUrgency: z.number().nullable().optional(),
});

export type TJobAdd = z.infer<typeof JobAddSchema>;

export function JobAddModal() {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const { data: jobTypes, isLoading: isLoadingJobTypes } = useQueryJobTypes();
    const { data: jobPriorities, isLoading: isLoadingJobPriorities } =
        useQueryJobPriorities();
    const { data: jobStatuses, isLoading: isLoadingJobStatuses } =
        useQueryJobStatuses();
    const { data: languages, isLoading: isLoadingLanguages } =
        useQueryLanguages();
    const { data: cities, isLoading: isLoadingCities } = useQueryCities();

    const { data: clients, isLoading: isLoadingClients } =
        useQueryClientsForAddingJobs();

    const form = useForm<TJobAdd>({
        resolver: zodResolver(JobAddSchema),
        defaultValues: {
            clientId: '',
            languageToId: '',
            jobTypeId: '',
            priorityId: 'medium',
            statusId: 'openFindInterpreter',
            description: '',
            jobDate: '',
            startTime: '',
            endTime: '',
            mode: '',
            fee: 0,
            interpreterFee: 0,
            note: '',
            addressStreet: '',
            addressZip: '',
            addressCityId: '',
            entryDate: format(new Date(), 'yyyy-MM-dd'),
            kmRateClient: 0,
            kmRateInterpreter: 0,
            rhythm: '',
            surchargeRareLanguage: 0,
            surchargeUrgency: 0,
        },
    });

    const mode = form.watch('mode');

    const onSubmit = async (values: TJobAdd) => {
        console.log('values', values);

        const promise = axios.post('/api/job/add', values);

        toast.promise(promise, {
            loading: 'Auftrag wird hinzugefügt...',
            success: 'Auftrag erfolgreich hinzugefügt',
            error: 'Fehler beim Hinzufügen des Auftrags',
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
                <Tabs defaultValue="general">
                    <TabsList className="mb-4 grid grid-cols-3 gap-2">
                        <TabsTrigger value="general">Allgemein</TabsTrigger>
                        <TabsTrigger value="location">Ort & Zeit</TabsTrigger>
                        <TabsTrigger value="billing">
                            Rechnungsdaten
                        </TabsTrigger>
                    </TabsList>

                    {/* Allgemein */}
                    <TabsContent
                        value="general"
                        className="grid gap-x-4 gap-y-6 sm:grid-cols-2"
                    >
                        <RHFCombobox
                            name="clientId"
                            label="Auftraggeber wählen"
                            options={clients}
                            placeholder="Auftraggeber auswählen"
                            control={form.control}
                            setValue={form.setValue}
                        />

                        <RHFCombobox
                            name="languageToId"
                            label="Sprache"
                            options={languages?.map(lang => ({
                                id: lang.id,
                                name: lang.name,
                            }))}
                            placeholder="Sprache auswählen"
                            control={form.control}
                            setValue={form.setValue}
                            creatable
                        />
                        <RHFCombobox
                            name="jobTypeId"
                            label="Auftragstyp"
                            options={jobTypes}
                            placeholder="Auftragstyp auswählen"
                            control={form.control}
                            setValue={form.setValue}
                            creatable
                        />
                        <RHFCombobox
                            name="priorityId"
                            label="Dringlichkeit"
                            options={jobPriorities}
                            placeholder="Dringlichkeit auswählen"
                            control={form.control}
                            setValue={form.setValue}
                        />
                        <div className="col-span-full">
                            <RHFTextArea
                                name="description"
                                label="Beschreibung"
                                placeholder="Hier eingeben..."
                                control={form.control}
                            />
                        </div>
                    </TabsContent>

                    {/* Ort und Zeit */}
                    <TabsContent value="location" className="space-y-6">
                        <RHFRadioGroup
                            control={form.control}
                            name="mode"
                            label="Modus"
                            options={[
                                { id: 'online', name: 'Online' },
                                { id: 'onSite', name: 'Präsenz' },
                            ]}
                        />
                        {mode === 'onSite' && (
                            <div className="mt-8 grid gap-4 sm:grid-cols-2">
                                <RHFInput
                                    name="addressStreet"
                                    label="Straße"
                                    placeholder="Straße eingeben"
                                    control={form.control}
                                />
                                <RHFInput
                                    name="addressZip"
                                    label="PLZ"
                                    placeholder="PLZ eingeben"
                                    control={form.control}
                                />
                                <RHFCombobox
                                    name="addressCityId"
                                    label="Ort"
                                    options={cities}
                                    placeholder="Ort auswählen"
                                    control={form.control}
                                    setValue={form.setValue}
                                />
                            </div>
                        )}
                        <div className="mt-8 grid gap-x-4 gap-y-6 sm:grid-cols-3">
                            <RHFInput
                                name="jobDate"
                                label="Datum"
                                placeholder="Datum auswählen"
                                control={form.control}
                                type="date"
                            />
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

                            <div className="col-span-full">
                                <RHFInput
                                    name="entryDate"
                                    label="Wann kam der Auftrag rein?"
                                    placeholder="Endzeit auswählen"
                                    control={form.control}
                                    type="date"
                                />
                            </div>
                        </div>

                        {/* <Input type="number" placeholder="Dauer in Minuten" /> */}
                    </TabsContent>

                    {/* Rechnungen */}
                    <TabsContent value="billing" className="space-y-6">
                        <div>
                            <h3 className="text-md mb-2 font-semibold">
                                DolPro Rechnung
                            </h3>
                            <div className="grid items-center gap-x-4 gap-y-6 sm:grid-cols-2">
                                <RHFInput
                                    name="fee"
                                    label="Honorar Auftraggeber (€)"
                                    placeholder="Honorar Auftraggeber (€)"
                                    control={form.control}
                                    type="number"
                                />
                                <RHFInput
                                    name="kmRateClient"
                                    label="km-Pauschale Auftraggeber (€)"
                                    placeholder="km-Pauschale Auftraggeber (€)"
                                    control={form.control}
                                    type="number"
                                />
                                <RHFInput
                                    name="surchargeRareLanguage"
                                    label="Zuschlag seltene Sprache (€)"
                                    placeholder="Zuschlag seltene Sprache (€)"
                                    control={form.control}
                                    type="number"
                                />
                                <RHFInput
                                    name="surchargeUrgency"
                                    label="Zuschlag Dringlichkeit (€)"
                                    placeholder="Zuschlag Dringlichkeit (€)"
                                    control={form.control}
                                    type="number"
                                />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-md mb-2 font-semibold">
                                Dolmetscher Rechnung
                            </h3>
                            <div className="grid items-center gap-x-4 gap-y-6 sm:grid-cols-2">
                                <RHFInput
                                    name="interpreterFee"
                                    label="Honorar Dolmetscher (€)"
                                    placeholder="Honorar Dolmetscher (€)"
                                    control={form.control}
                                    type="number"
                                />
                                <RHFInput
                                    name="kmRateInterpreter"
                                    label="km-Pauschale Dolmetscher (€)"
                                    placeholder="km-Pauschale Dolmetscher (€)"
                                    control={form.control}
                                    type="number"
                                />
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </form>
        </Form>
    );

    const trigger = (
        <Button variant="default" size="sm">
            <HiPlus />
            Neuer Auftrag
        </Button>
    );

    return (
        <Modal
            trigger={trigger}
            size="md"
            title="Neuen Auftrag erstellen"
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
