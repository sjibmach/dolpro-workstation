import { TJobBasicDetailsEdit } from '@/components/modals/app-modals/job-basic-details-edit-modal';
import { prisma } from '@/lib/prisma';
import { IdentificationIcon } from '@heroicons/react/24/outline';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    console.log('-------------------------------- API job edit basic details');
    const body: TJobBasicDetailsEdit = await req.json();

    const { id, clientId, jobTypeId, languageToId, priorityId } = body;

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
                clientId,
                jobTypeId,
                languageToId,
                priorityId,
            },
        });

        return NextResponse.json({
            message: 'success',
        });
    } catch (error) {
        console.log(error);

        return NextResponse.json(
            { error: 'Error While Updating Job Basic Details' },
            { status: 400 }
        );
    }
}
