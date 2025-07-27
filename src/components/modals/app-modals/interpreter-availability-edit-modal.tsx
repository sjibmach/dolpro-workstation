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
import { RHFTextArea } from '@/components/rhf/rhf-textarea';
import { TIdAndNameObject } from '@/lib/types';
import { RHFMultiSelect } from '@/components/rhf/rhf-multi-select';
import { RHFSwitch } from '@/components/rhf/rhf-switch';
import { useQueryCities } from '@/hooks/react-query/react-query-hooks';

const InterpreterAvailabilityEditSchema = z.object({
    id: z.string(),
    offersRemote: z.boolean().nullable().optional(),
    offersOnSite: z.boolean().nullable().optional(),
    car: z.boolean().nullable().optional(),
    availability: z.string().nullable().optional(),

    startDate: z.string().nullable().optional(),
    endDate: z.string().nullable().optional(),
    preferredCities: z.array(z.string()),
});

export type TInterpreterAvailabilityEdit = z.infer<
    typeof InterpreterAvailabilityEditSchema
>;

export function InterpreterAvailabilityEditModal({
    interpreter,
}: {
    interpreter: TInterpreterFullOverview;
}) {
    const { data: cities, isLoading: isLoadingCities } = useQueryCities();

    const [open, setOpen] = useState(false);
    const router = useRouter();

    const form = useForm<TInterpreterAvailabilityEdit>({
        resolver: zodResolver(InterpreterAvailabilityEditSchema),
        defaultValues: {
            id: interpreter.id,
            offersRemote: interpreter.offersRemote,
            offersOnSite: interpreter.offersOnSite,
            car: interpreter.car,
            availability: interpreter.availability
                ? interpreter.availability
                : '',
            startDate: interpreter.startDate
                ? interpreter.startDate.toISOString().split('T')[0]
                : '',
            endDate: interpreter.endDate
                ? interpreter.endDate.toISOString().split('T')[0]
                : '',
            preferredCities: interpreter.preferredCities.map(
                city => city.cityId
            ),
        },
        values: {
            id: interpreter.id,
            offersRemote: interpreter.offersRemote,
            offersOnSite: interpreter.offersOnSite,
            car: interpreter.car,
            availability: interpreter.availability
                ? interpreter.availability
                : '',
            startDate: interpreter.startDate
                ? interpreter.startDate.toISOString().split('T')[0]
                : '',
            endDate: interpreter.endDate
                ? interpreter.endDate.toISOString().split('T')[0]
                : '',
            preferredCities: interpreter.preferredCities.map(
                city => city.cityId
            ),
        },
    });

    const offersOnSite = form.watch('offersOnSite');
    const preferredCities = form.watch('preferredCities');

    const onSubmit = async (values: TInterpreterAvailabilityEdit) => {
        console.log('values', values);

        const promise = axios.post(
            '/api/interpreter/edit/availability',
            values
        );

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
                    {offersOnSite && (
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
                    )}
                    <div className="col-span-full mb-8">
                        <RHFTextArea
                            name="availability"
                            control={form.control}
                            label="Bevorzugte Zeiten"
                        />
                    </div>
                    <RHFInput
                        name="startDate"
                        control={form.control}
                        label="Startdatum"
                        type="date"
                    />
                    <RHFInput
                        name="endDate"
                        control={form.control}
                        label="Enddatum "
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
            title="Verfügbarkeit des Dolmetschers bearbeiten"
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
