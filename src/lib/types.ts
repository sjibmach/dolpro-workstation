import { TJobStatusEditForm } from '@/app/job/[jobId]/_components/job-status-edit-form';

export type TIdAndNameObject = {
    id: string;
    name: string;
    [key: string]: any;
};

export type THistoryEntry = {
    field: string | null;
    newValue: string | null;
    comment?: string | null;
};

export type TUpdateJobStatusPayload = {
    values: TJobStatusEditForm;
    historyEntries: THistoryEntry[];
};
