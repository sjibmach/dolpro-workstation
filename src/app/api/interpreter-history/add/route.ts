import { TClientHistroyAdd } from '@/app/client/[clientId]/_components/client-history-add-form';
import { TInterpreterHistroyAdd } from '@/app/interpreter/[interpreterId]/_components/interpreter-history-add-form';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    console.log('POST /api/client-history/add');
    const body: TInterpreterHistroyAdd = await req.json();

    const {
        interpreterId,
        statusId,
        statusReasonId,
        followUpDate,
        note,
        statusIdHasChanged,
        statusReasonIdHasChanged,
        followUpDateHasChanged,
        interviewDateHasChanged,
        interviewDate,
    } = body;

    // Validate required fields
    if (!interpreterId) {
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
            followUpDateHasChanged ||
            interviewDateHasChanged
        ) {
            await prisma.interpreter.update({
                where: { id: interpreterId },
                data: {
                    statusId,
                    statusReasonId: statusReasonId || null,
                    statusFollowUpDate: followUpDate
                        ? new Date(followUpDate)
                        : null,
                    interviewDate: interviewDate
                        ? new Date(interviewDate)
                        : null,
                    updatedAt: new Date(),
                },
            });
        }

        await prisma.interpreterHistory.create({
            data: {
                interpreterId,
                newStatusId: statusIdHasChanged
                    ? !!statusId
                        ? statusId
                        : null
                    : null,
                reasonId: statusIdHasChanged
                    ? !!statusReasonId
                        ? statusReasonId
                        : null
                    : null,
                followUpDate: statusIdHasChanged
                    ? followUpDate
                        ? new Date(followUpDate)
                        : null
                    : null,

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
