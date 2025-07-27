import { TJobDateConfirmation } from '@/app/job/[jobId]/_components/job-date-confirmation';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    // console.log('------------------------------------ JOB UPDATE INTERPRETER');
    const body: { jobId: string; interpreterId: string | null } =
        await req.json();

    const { jobId, interpreterId } = body;

    // Validate required fields
    if (!jobId) {
        return NextResponse.json(
            { error: 'Job Id ist erforderlich' },
            { status: 400 }
        );
    }

    try {
        await prisma.job.update({
            where: { id: jobId },
            data: { interpreterId },
        });

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
