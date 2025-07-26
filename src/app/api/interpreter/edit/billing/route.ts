import { TInterpreterBillingEdit } from '@/components/modals/app-modals/interpreter-billing-edit-modal';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    console.log('-----------------INTERPRETER EDIT AVAILABILTY------------');
    const body: TInterpreterBillingEdit = await req.json();

    const { id, defaultHourlyRate, kmRate, iban, notes } = body;

    // Validate required fields
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
                defaultHourlyRate,
                kmRate,
                iban,
                notes,
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
