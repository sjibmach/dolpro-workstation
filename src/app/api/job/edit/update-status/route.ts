import { prisma } from '@/lib/prisma';
import { TUpdateJobStatusPayload } from '@/lib/types';
import { NextResponse } from 'next/server';
import { nanoid } from 'nanoid';

export async function POST(req: Request) {
    // console.log('------------------------------------ JOB UPDATE INTERPRETER');
    const body: TUpdateJobStatusPayload = await req.json();

    const {
        values: {
            id,
            statusId,
            isConfirmedClient,
            isConfirmedInterpreter,
            interpreterId,
            jobCompletionStatusId,
            jobDate,
            note,
        },
        historyEntries,
    } = body;

    // Validate required fields
    if (!id) {
        return NextResponse.json(
            { error: 'Job Id ist erforderlich' },
            { status: 400 }
        );
    }

    try {
        await prisma.job.update({
            where: { id },
            data: {
                interpreterId,
                isConfirmedClient,
                isConfirmedInterpreter,
                jobDate: jobDate ? new Date(jobDate) : null,
                statusId,
                jobCompletionStatusId,
            },
        });

        // 2. Historieneinträge speichern (falls vorhanden)

        const hasFieldUpdates = historyEntries.some(
            entry => entry.field !== null
        );
        const shouldGroup = historyEntries.length > 1 && hasFieldUpdates;
        const updateGroupId = shouldGroup ? nanoid() : null;

        if (historyEntries.length > 0) {
            const creatorId = 'ibrahim'; // TODO: aus Session holen

            await prisma.jobHistory.createMany({
                data: historyEntries.map(entry => ({
                    jobId: id,
                    field: entry.field ?? null,
                    newValue: entry.newValue ?? null,
                    comment: entry.comment ?? null,
                    updateGroupId,
                    creatorId,
                })),
            });
        }

        return NextResponse.json({
            message: 'success',
        });
    } catch (error) {
        console.log(error);

        return NextResponse.json(
            { error: 'Job Interpreter was not updated' },
            { status: 400 }
        );
    }
}
