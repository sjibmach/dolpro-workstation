import { TInterpreterAddressEdit } from '@/components/modals/app-modals/interpreter-address-edit-modal';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    console.log('-----------------INTERPRETER EDIT ADDRESS------------');
    const body: TInterpreterAddressEdit = await req.json();

    const { id, street, zip, cityId } = body;

    // Validate required fields
    if (!id) {
        return NextResponse.json(
            { error: 'Id ist erforderlich' },
            { status: 400 }
        );
    }

    let newCityId = cityId;
    if (cityId?.startsWith('new_')) {
        // If cityId starts with 'new_', it means it's a new city being created
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

    try {
        await prisma.interpreter.update({
            where: { id },
            data: {
                street,
                zip,
                cityId: newCityId ? newCityId : null,
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
