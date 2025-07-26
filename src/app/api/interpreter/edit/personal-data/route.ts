import { TInterpreterPersonalDataEdit } from '@/components/modals/app-modals/interpreter-personal-data-edit-modal';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    console.log('-----------------INTERPRETER EDIT PERSONAL DATA------------');
    const body: TInterpreterPersonalDataEdit = await req.json();

    const {
        id,
        firstName,
        lastName,
        email,
        phone1,
        phone2,
        gender,
        birthDate,
        interviewDate,
    } = body;

    // Validate required fields
    if (!lastName) {
        return NextResponse.json(
            { error: 'lastName ist erforderlich' },
            { status: 400 }
        );
    }
    if (!id) {
        return NextResponse.json(
            { error: 'Id ist erforderlich' },
            { status: 400 }
        );
    }

    try {
        await prisma.interpreter.update({
            where: { id },
            data: {
                firstName,
                lastName,
                email,
                phone1,
                phone2,
                gender,
                birthDate: birthDate ? new Date(birthDate) : null,
                interviewDate: interviewDate ? new Date(interviewDate) : null,
            },
        });

        return NextResponse.json({
            message: 'success',
        });
    } catch (error) {
        console.log(error);

        return NextResponse.json(
            { error: 'Auftragsgeber konnte nicht gespeichert werden' },
            { status: 400 }
        );
    }
}
