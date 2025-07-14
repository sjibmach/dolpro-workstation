import Modal from '../modal';
import { Button } from '@/components/ui/button';
import { HiPlus } from 'react-icons/hi2';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import RHFInput from '@/components/rhf/rhf-input';
import RHFCombobox from '@/components/rhf/rhf-combobox';
import { useQuery } from '@tanstack/react-query';

const clientSchema = z.object({
    name: z.string().min(2, {
        message: 'Name muss mindestens 2 Zeichen lang sein.',
    }),
    clientTypeId: z.string().nullable(),
});

export function ClientAddModal() {
    const { data: clientTypes, isLoading: isLoadingClientTypes } = useQuery({
        queryKey: ['client-types'],
        queryFn: async () =>
            fetch('/api/base-data/client-types').then(res => res.json()),
    });

    console.log('Client Types:', clientTypes);

    const form = useForm<z.infer<typeof clientSchema>>({
        resolver: zodResolver(clientSchema),
        defaultValues: {
            name: '',
            clientTypeId: null,
        },
    });

    function onSubmit(values: z.infer<typeof clientSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    }

    const body = (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <RHFInput
                    name="name"
                    control={form.control}
                    label="Auftragsgeber"
                    placeholder="Enter client firstname"
                    showError
                />
                <RHFCombobox
                    name="clientTypeId"
                    control={form.control}
                    label="Sprache"
                    // placeholder="Auswählen"
                    options={clientTypes || []}
                    setValue={form.setValue}
                />
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
        />
    );
}
