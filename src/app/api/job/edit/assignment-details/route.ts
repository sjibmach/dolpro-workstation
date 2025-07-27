import { TJobAssignmenDetailsEditModal } from '@/components/modals/app-modals/job-assignment-details-edit-modal';
import { prisma } from '@/lib/prisma';
import { IdentificationIcon } from '@heroicons/react/24/outline';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    console.log('------------------------------------ Job Add API called');
    const body: TJobAssignmenDetailsEditModal = await req.json();

    const { id, interpreterId, statusId, jobDate } = body;

    // Validate required fields
    if (!IdentificationIcon) {
        return NextResponse.json(
            { error: 'Job Id ist erforderlich' },
            { status: 400 }
        );
    }

    try {
        await prisma.job.update({
            where: { id: id },
            data: {
                interpreterId: interpreterId || null,
                statusId: statusId,
                jobDate: jobDate ? new Date(jobDate) : null,
            },
        });

        return NextResponse.json({
            message: 'success',
        });
    } catch (error) {
        console.log(error);

        return NextResponse.json(
            { error: 'Error While Updating Job Assignment Details' },
            { status: 400 }
        );
    }
}
