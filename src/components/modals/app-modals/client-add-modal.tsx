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
import axios from 'axios';
import { useRouter } from 'next/navigation';
import useClientAddModal from './modal-hooks/use-client-add-modal';
import { toast } from 'sonner';

const clientSchema = z.object({
    name: z.string().min(2, {
        message: 'Name muss mindestens 2 Zeichen lang sein.',
    }),
    clientTypeId: z.string(),
    statusId: z.string().optional(),
});

export type TAddClient = z.infer<typeof clientSchema>;

export function ClientAddModal() {
    const router = useRouter();

    const { isOpen, onOpen, onOpenChange, onClose } = useClientAddModal();

    const { data: clientTypes, isLoading: isLoadingClientTypes } = useQuery({
        queryKey: ['client-types'],
        queryFn: async () =>
            fetch('/api/base-data/client-types').then(res => res.json()),
    });

    const { data: clientStatuses, isLoading: isLoadingClientStatuses } =
        useQuery({
            queryKey: ['client-statuses'],
            queryFn: async () =>
                fetch('/api/base-data/client-statuses').then(res => res.json()),
        });

    const form = useForm<TAddClient>({
        resolver: zodResolver(clientSchema),
        defaultValues: {
            name: '',
            statusId: 'new',
        },
    });

    const onSubmit = async (values: TAddClient) => {
        console.log('values', values);

        // const promise = axios.post('/api/client/add', values);

        // toast.promise(promise, {
        //     loading: 'Kunde wird hinzugefügt...',
        //     success: 'Kunde erfolgreich hinzugefügt',
        //     error: 'Fehler beim Hinzufügen des Kunden',
        // });

        // try {
        //     await promise;
        //     onClose();
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
                <div className="my-4 grid gap-x-4 gap-y-6 sm:grid-cols-2">
                    <div className="col-span-2">
                        <RHFInput
                            name="name"
                            control={form.control}
                            label="Auftragsgeber"
                            placeholder="Name des Auftragsgebers"
                            showError
                        />
                    </div>
                    <RHFCombobox
                        name="clientTypeId"
                        control={form.control}
                        label="Auftragsgeber-Typ"
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
        <>
            <Modal
                trigger={trigger}
                size="md"
                title="Auftragsgeber hinzufügen"
                body={body}
                dialogAction={form.handleSubmit(onSubmit)}
                dialogClose={true}
                dialogActionLabel="Hinzufügen"
                open={isOpen}
                onOpenChange={onOpenChange}
            />
        </>
    );
}
