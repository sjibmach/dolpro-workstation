'use client';

import { Badge } from '@/components/ui/badge';
import { NewCardBody, NewCardItem } from '@/components/custom-ui/new-card';
import { format } from 'date-fns';
import { TJobFullOverview } from '@/lib/prismaTypes';
import {
    useQueryInterpretersList,
    useQueryJobStatuses,
} from '@/hooks/react-query/react-query-hooks';

type Props = {
    history: TJobFullOverview['jobHistory'];
};

export function JobHistoryList({ history }: Props) {
    const { data: interpreters } = useQueryInterpretersList();
    const { data: jobStatuses } = useQueryJobStatuses();

    if (!history || history.length === 0) {
        return (
            <NewCardBody>
                <NewCardItem first last className="text-gray-500">
                    Keine Verlaufsdaten vorhanden.
                </NewCardItem>
            </NewCardBody>
        );
    }

    const sorted = [...history].sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
    });

    return (
        <NewCardBody>
            {sorted.map((entry, index) => {
                const { updateGroupId, field } = entry;

                const groupEntries = updateGroupId
                    ? sorted.filter(e => e.updateGroupId === updateGroupId)
                    : [];

                const isGrouped = updateGroupId && groupEntries.length > 1;
                const isFirstInGroup =
                    isGrouped && groupEntries[0].id === entry.id;

                // Gruppierte Änderung
                if (isGrouped && isFirstInGroup) {
                    return (
                        <NewCardItem
                            key={updateGroupId}
                            first={index === 0}
                            last={index === sorted.length - 1}
                        >
                            <div className="mb-1 text-xs text-gray-600 dark:text-gray-400">
                                <Badge variant="secondary" className="mr-1">
                                    Änderung
                                </Badge>
                                {formatEntryTime(entry)}
                            </div>
                            <ul className="mb-1 list-disc pl-5 text-sm text-gray-900 dark:text-gray-100">
                                {groupEntries
                                    .filter(e => e.field !== null)
                                    .map(e => {
                                        if (fieldLabel(e.field) === 'Kommentar')
                                            return null;
                                        else
                                            return (
                                                <li key={e.id}>
                                                    <strong>
                                                        {fieldLabel(e.field)}
                                                    </strong>
                                                    :{' '}
                                                    {renderFieldValue(
                                                        e,
                                                        interpreters,
                                                        jobStatuses
                                                    )}
                                                </li>
                                            );
                                    })}
                            </ul>
                            {groupEntries.some(e => e.comment) && (
                                <div className="text-xs text-gray-600 dark:text-gray-400">
                                    Kommentar:{' '}
                                    {groupEntries.find(e => e.comment)
                                        ?.comment || '-'}
                                </div>
                            )}
                        </NewCardItem>
                    );
                }

                // Einzelne Feldänderung ohne updateGroupId
                if (!updateGroupId && field !== null) {
                    return (
                        <NewCardItem
                            key={entry.id}
                            first={index === 0}
                            last={index === sorted.length - 1}
                        >
                            <div className="mb-1 text-xs text-gray-600 dark:text-gray-400">
                                <Badge variant="secondary" className="mr-1">
                                    Änderung
                                </Badge>
                                {formatEntryTime(entry)}
                            </div>
                            <ul className="mb-1 list-disc pl-5 text-sm text-gray-900 dark:text-gray-100">
                                <li>
                                    <strong>{fieldLabel(field)}</strong>:{' '}
                                    {renderFieldValue(
                                        entry,
                                        interpreters,
                                        jobStatuses
                                    )}
                                </li>
                            </ul>
                            {entry.comment && (
                                <div className="text-xs text-gray-600 dark:text-gray-400">
                                    Kommentar: {entry.comment}
                                </div>
                            )}
                        </NewCardItem>
                    );
                }

                // Freier Kommentar (Eintrag)
                if (field === null) {
                    return (
                        <NewCardItem
                            key={entry.id}
                            first={index === 0}
                            last={index === sorted.length - 1}
                        >
                            <div className="mb-1 text-xs text-gray-600 dark:text-gray-400">
                                <Badge variant="secondary" className="mr-1">
                                    Eintrag
                                </Badge>
                                {formatEntryTime(entry)}
                            </div>
                            <div className="text-sm text-gray-900 dark:text-gray-100">
                                {entry.comment || 'Kein Kommentar hinterlegt'}
                            </div>
                        </NewCardItem>
                    );
                }

                return null; // sollte nie erreicht werden
            })}
        </NewCardBody>
    );
}

// Hilfsfunktionen
function formatEntryTime(entry: {
    createdAt?: Date;
    creator?: {
        firstName?: string | null;
        lastName?: string | null;
    } | null;
}) {
    const name =
        entry.creator?.firstName || entry.creator?.lastName || 'unbekannt';

    return entry.createdAt
        ? `${format(entry.createdAt, 'dd.MM.yyyy HH:mm')} von ${name}`
        : 'Zeitpunkt unbekannt';
}

function fieldLabel(field: string | null): string {
    const map: Record<string, string> = {
        interpreterId: 'Dolmetscher',
        jobDate: 'Auftragsdatum',
        isConfirmedInterpreter: 'Bestätigung Dolmetscher',
        isConfirmedClient: 'Bestätigung Auftraggeber',
        statusId: 'Jobstatus',
        note: 'Kommentar',
    };
    return field && map[field] ? map[field] : (field ?? 'Unbekanntes Feld');
}

function renderFieldValue(
    entry: { field: string | null; newValue: string | null | undefined },
    interpreters?: { id: string; name: string }[],
    statuses?: { id: string; name: string }[]
) {
    if (!entry.field) return '-';
    switch (entry.field) {
        case 'interpreterId':
            return getInterpreterName(entry.newValue, interpreters);
        case 'statusId':
            return getStatusName(entry.newValue, statuses);
        default:
            return entry.newValue ?? '-';
    }
}

function getInterpreterName(
    id: string | null | undefined,
    list?: { id: string; name: string }[]
) {
    if (!id || !list) return '-';
    const match = list.find(i => i.id === id);
    return match?.name || 'Unbekannter Dolmetscher';
}

function getStatusName(
    id: string | null | undefined,
    list?: { id: string; name: string }[]
) {
    if (!id || !list) return '-';
    const match = list.find(s => s.id === id);
    return match?.name || 'Unbekannter Status';
}
