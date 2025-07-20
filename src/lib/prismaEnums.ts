// enums/clientStatus.ts

import { ClientStatusEnum } from '@prisma/client';

export { ClientStatusEnum }; // einfacher Re-Export

// optional für Dropdowns etc.:
export const clientStatusLabels: Record<ClientStatusEnum, string> = {
    [ClientStatusEnum.new]: 'Neu - noch kein Kontakt',
    [ClientStatusEnum.contacting]: 'Kontaktaufnahme läuft',
    [ClientStatusEnum.failedContact]: 'Kontaktaufnahme erfolglos',
    [ClientStatusEnum.interested]: 'Interessiert - weitere Gespräche geplant',
    [ClientStatusEnum.offerToSend]: 'Angebot senden',
    [ClientStatusEnum.offerSent]: 'Angebot verschickt',
    [ClientStatusEnum.negotiation]: 'Vertragsverhandlung',
    [ClientStatusEnum.contactLater]: 'Später erneut kontaktieren',
    [ClientStatusEnum.activeWithoutContract]: 'Zusammenarbeit ohne Vertrag',
    [ClientStatusEnum.contracted]: 'Zusammenarbeit mit Vertrag',
    [ClientStatusEnum.inactive]: 'Inaktiv - aktuell keine Zusammenarbeit',
    [ClientStatusEnum.notInterested]: 'Kein Interesse',
    [ClientStatusEnum.blacklisted]: 'Nicht weiter kontaktieren (gesperrt)',
};

export function clientStatusIsNotInterested(
    statusId: string | null | undefined
): boolean {
    return (
        statusId === ClientStatusEnum.notInterested ||
        statusId === ClientStatusEnum.blacklisted
    );
}
