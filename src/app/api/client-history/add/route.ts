import { TClientHistroyAdd } from '@/app/clients/[clientId]/_components/client-history-add-form';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    console.log('POST /api/client-history/add');
    const body: TClientHistroyAdd = await req.json();

    const {
        clientId,
        statusId,
        statusReasonId,
        followUpDate,
        note,
        statusIdHasChanged,
        statusReasonIdHasChanged,
        followUpDateHasChanged,
    } = body;

    // Validate required fields
    if (!clientId) {
        return NextResponse.json(
            { error: 'Name ist erforderlich' },
            { status: 400 }
        );
    }
    if (statusIdHasChanged && !statusId) {
        return NextResponse.json(
            {
                error: 'Status ist erforderlich, wenn sich der Status geändert hat',
            },
            { status: 400 }
        );
    }
    try {
        if (
            statusIdHasChanged ||
            statusReasonIdHasChanged ||
            followUpDateHasChanged
        ) {
            await prisma.client.update({
                where: { id: clientId },
                data: {
                    statusId,
                    statusReasonId: statusReasonId || null,
                    statusFollowUpDate: followUpDate
                        ? new Date(followUpDate)
                        : null,
                    updatedAt: new Date(),
                },
            });
        }

        await prisma.clientHistory.create({
            data: {
                clientId,
                newStatusId: !!statusId ? statusId : null,
                reasonId: !!statusReasonId ? statusReasonId : null,
                followUpDate: followUpDate ? new Date(followUpDate) : null,
                note: note || null,
                creatorId: 'ibrahim', // TODO: Replace with actual user ID
                updatorId: 'ibrahim', // TODO: Replace with actual user ID
            },
        });

        return NextResponse.json({
            message: 'success',
        });
    } catch (error) {
        console.log(error);

        return NextResponse.json(
            { error: 'Fehler beim Hinzufügen der Historie' },
            { status: 400 }
        );
    }
}
