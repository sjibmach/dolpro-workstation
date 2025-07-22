import { TJobDateConfirmation } from '@/app/job/[jobId]/_components/job-date-confirmation';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    console.log('------------------------------------ Job Add API called');
    const body: TJobDateConfirmation = await req.json();

    const { jobId, type, isConfirmed } = body;

    // Validate required fields
    if (!jobId) {
        return NextResponse.json(
            { error: 'Job Id ist erforderlich' },
            { status: 400 }
        );
    }

    if (!type) {
        return NextResponse.json(
            { error: 'Type (interpreter oder client) ist erforderlich' },
            { status: 400 }
        );
    }

    try {
        if (type === 'interpreter')
            await prisma.job.update({
                where: { id: jobId },
                data: { isConfirmedInterpreter: !isConfirmed },
            });
        else if (type === 'client')
            await prisma.job.update({
                where: { id: jobId },
                data: { isConfirmedClient: !isConfirmed },
            });

        return NextResponse.json({
            message: 'success',
        });
    } catch (error) {
        console.log(error);

        return NextResponse.json(
            { error: 'Date Confirmation konnte nicht gespeichert werden' },
            { status: 400 }
        );
    }
}
