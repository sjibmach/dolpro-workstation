'use client';

import { Switch } from '@/components/ui/switch';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export type TJobDateConfirmation = {
    jobId: string;
    isConfirmed: boolean;
    type: 'interpreter' | 'client';
    title?: string;
};

const JobDateConfirmation = ({
    jobId,
    isConfirmed,
    type,
    title,
}: TJobDateConfirmation) => {
    const router = useRouter();
    const [checked, setChecked] = useState(isConfirmed);
    const [isLoading, setIsLoading] = useState(false);
    const handleCheckChange = async () => {
        setChecked(prev => !prev);
        setIsLoading(true);

        const promise = axios.post('/api/job/toggle-date-confirmation', {
            jobId,
            type,
            isConfirmed,
        });

        toast.promise(promise, {
            loading: 'Speichern...',
            success: 'Erfolgreich gespeichert',
            error: 'Fehler beim Speichern',
            position: 'top-right',
        });

        try {
            await promise;
        } catch (error) {
            console.error('Fehler beim Senden des Formulars:', error);
        } finally {
            router.refresh();
            setIsLoading(false);
        }
    };
    return (
        <>
            <div className="flex flex-row items-center justify-between">
                {title && <div>{title}</div>}
                <div className="flex items-center space-x-2">
                    <Switch
                        id="airplane-mode"
                        checked={checked}
                        onCheckedChange={handleCheckChange}
                        disabled={isLoading}
                    />
                </div>
            </div>

            {/* <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                    <FormLabel>Marketing emails</FormLabel>
                    <FormDescription>
                        Receive emails about new products, features, and more.
                    </FormDescription>
                </div>
                <FormControl>
                    <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                    />
                </FormControl>
            </FormItem> */}
        </>
    );
};

export default JobDateConfirmation;
