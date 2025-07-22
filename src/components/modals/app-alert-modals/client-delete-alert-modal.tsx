'use client';
import { AlertModal } from '@/components/modals/ui/alert-modal';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { HiOutlineTrash } from 'react-icons/hi2';
import { toast } from 'sonner';

const ClientDeleteAlertModal = ({ clientId }: { clientId: string }) => {
    const router = useRouter();
    const handleDelete = async (clientId: string) => {
        const promise = axios.post('/api/client/delete', { clientId });

        toast.promise(promise, {
            loading: 'Lösche Auftraggeber...',
            success: 'Auftraggeber erfolgreich gelöscht',
            error: 'Fehler beim Löschen des Auftraggebers',
        });

        try {
            await promise;
        } catch (error) {
            console.error('Fehler beim Senden des Formulars:', error);
        } finally {
            router.refresh();
        }
    };
    return (
        <AlertModal
            title="Auftraggeber löschen"
            description="Bist du sicher, dass du diesen Auftraggeber löschen möchtest? Diese Aktion kann nicht rückgängig gemacht werden."
            actionLabel="Löschen"
            trigger={
                <div className="group flex w-full cursor-pointer items-center gap-2">
                    <HiOutlineTrash className="text-red-500" />
                    Löschen
                </div>
            }
            action={() => handleDelete(clientId)}
        />
    );
};

export default ClientDeleteAlertModal;
