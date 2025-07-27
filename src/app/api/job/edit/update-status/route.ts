import { TJobStatusEditForm } from '@/app/job/[jobId]/_components/job-status-edit-form';
import { calculateJobStatus } from '@/lib/calculate-status/calculate-job-status';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    // console.log('------------------------------------ JOB UPDATE INTERPRETER');
    const body: TJobStatusEditForm = await req.json();

    const {
        id,
        isConfirmedClient,
        isConfirmedInterpreter,
        statusId,
        interpreterId,
        jobCompletionStatusId,
        jobDate,
        note,
    } = body;

    // Validate required fields
    if (!id) {
        return NextResponse.json(
            { error: 'Job Id ist erforderlich' },
            { status: 400 }
        );
    }

    const newStatus = calculateJobStatus({
        interpreterId,
        isConfirmedClient,
        isConfirmedInterpreter,
        jobCompletionStatusId,
        jobDate,
    });

    try {
        await prisma.job.update({
            where: { id },
            data: {
                interpreterId,
                isConfirmedClient,
                isConfirmedInterpreter,
                jobDate: jobDate ? new Date(jobDate) : null,
                statusId: newStatus.jobStatusId,
                jobCompletionStatusId: newStatus.jobCompletionStatusId,
            },
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
