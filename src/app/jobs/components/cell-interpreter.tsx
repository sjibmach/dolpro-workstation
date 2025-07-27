'use client';
import { Combobox } from '@/components/custom-ui/combobox';
import { useQueryInterpretersForJobs } from '@/hooks/react-query/react-query-hooks';
import { TJobOverviewTable } from '@/lib/prismaTypes';
import { Row } from '@tanstack/react-table';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const CellInterpreter = ({ row }: { row: Row<TJobOverviewTable> }) => {
    const router = useRouter();
    const { data: interpreters, isLoading: isLoadingInterpreters } =
        useQueryInterpretersForJobs();
    const interpreter = row.original.interpreter;
    const onChange = async (value: string) => {
        // console.log('Changed:,', value);

        const promise = axios.post('/api/job/update-interpreter', {
            jobId: row.original.id,
            interpreterId: value,
        });

        toast.promise(promise, {
            loading: 'Dolmetscher wird gespeichert...',
            success: 'Dolmetscher erfolgreich gespeichert',
            error: 'Fehler beim Speichern',
            position: 'top-center',
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
        <>
            {isLoadingInterpreters ? (
                <>Lade Dolmetscher...</>
            ) : (
                <Combobox
                    options={interpreters || []}
                    initialValue={interpreter?.id}
                    onChange={onChange}
                />
            )}
        </>
    );
};

export default CellInterpreter;
