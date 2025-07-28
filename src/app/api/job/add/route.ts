import { TJobAdd } from '@/components/modals/app-modals/job-add-modal';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    console.log('------------------------------------ Job Add API called');
    const body: TJobAdd = await req.json();

    const {
        clientId,
        statusId,
        languageToId,
        jobTypeId,
        priorityId,
        description,
        jobDate,
        startTime,
        endTime,
        modeId,
        fee,
        interpreterFee,
        note,
        addressStreet,
        addressZip,
        addressCityId: cityId,
        entryDate,
        kmRateClient,
        kmRateInterpreter,
        rhythm,
        surchargeRareLanguage,
        surchargeUrgency,
    } = body;

    // Validate required fields
    if (!clientId) {
        return NextResponse.json(
            { error: 'Auftraggeber ist erforderlich' },
            { status: 400 }
        );
    }
    if (!statusId) {
        return NextResponse.json(
            { error: 'Status ID ist erforderlich' },
            { status: 400 }
        );
    }
    if (!languageToId) {
        return NextResponse.json(
            { error: 'Zielsprache ist erforderlich' },
            { status: 400 }
        );
    }

    // Handle new city creation
    let newCityId = cityId;
    if (cityId?.startsWith('new_')) {
        newCityId = cityId.replace('new_', '').toLowerCase();
        await prisma.city.create({
            data: {
                id: newCityId.toLowerCase(),
                name:
                    newCityId.trim().charAt(0).toUpperCase() +
                    newCityId.slice(1),
            },
        });
    }

    // Handle new language creation
    let newLanguageToId = languageToId;
    if (languageToId?.startsWith('new_')) {
        newLanguageToId = languageToId.replace('new_', '').toLowerCase();
        await prisma.language.create({
            data: {
                id: newLanguageToId.toLowerCase(),
                name:
                    newLanguageToId.trim().charAt(0).toUpperCase() +
                    newLanguageToId.slice(1),
            },
        });
    }

    // Handle new job type creation
    let newJobTypeId = jobTypeId;
    if (jobTypeId?.startsWith('new_')) {
        newJobTypeId = jobTypeId.replace('new_', '').toLowerCase();
        await prisma.jobType.create({
            data: {
                id: newJobTypeId.toLowerCase(),
                name:
                    newJobTypeId.trim().charAt(0).toUpperCase() +
                    newJobTypeId.slice(1),
            },
        });
    }

    const lastCodeNumber = await prisma.job.findMany({
        orderBy: { codeNumber: 'desc' },
        select: { codeNumber: true },
        // where: { codeNumber: { not: null } },
    });

    const nextCodeNumber = !!lastCodeNumber[0]
        ? lastCodeNumber[0].codeNumber! + 1
        : 1;

    const newCode = `JO${nextCodeNumber.toString().padStart(5, '0')}`;

    // console.log('newCode:', newCode);

    try {
        const newJob = await prisma.job.create({
            data: {
                clientId,
                statusId,
                languageToId: newLanguageToId,
                jobTypeId: newJobTypeId || null,
                priorityId: priorityId || 'medium',
                description: description || null,
                jobDate: jobDate ? new Date(jobDate) : null,
                startTime: startTime || null,
                endTime: endTime || null,
                jobModeId: modeId || null,
                fee: fee || null,
                interpreterFee: interpreterFee || null,
                // note: note || null,
                addressStreet: addressStreet || null,
                addressZip: addressZip || null,
                addressCityId: newCityId || null,
                entryDate: entryDate ? new Date(entryDate) : null,
                kmRateClient: kmRateClient || 0,
                kmRateInterpreter: kmRateInterpreter || 0,
                // rhythm: rhythm || 'normal',
                surchargeRareLanguage: surchargeRareLanguage || 0,
                surchargeUrgency: surchargeUrgency || 0,

                codeNumber: nextCodeNumber, // Add codeNumber
                code: newCode, // Add code
            },
        });

        await prisma.jobHistory.create({
            data: {
                jobId: newJob.id,
                field: null,
                comment: 'Erstellung',
                creatorId: 'ibrahim',
            },
        });

        return NextResponse.json({
            message: 'success',
            data: { id: newJob.id },
        });
    } catch (error) {
        console.log(error);

        return NextResponse.json(
            { error: 'Auftragsgeber konnte nicht hinzugefügt werden' },
            { status: 400 }
        );
    }
}
