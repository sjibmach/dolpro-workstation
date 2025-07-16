import { TClientAddressEdit } from '@/components/modals/app-modals/client-address-edit-modal';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const body: TClientAddressEdit = await req.json();

    const { id, street, zip, cityId } = body;

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
        await prisma.client.update({
            where: { id },
            data: {
                street: street || null,
                zip: zip || null,
                cityId: newCityId || null,
            },
        });

        return NextResponse.json({
            message: 'success',
        });
    } catch (error) {
        console.log(error);

        return NextResponse.json(
            { error: 'Fehler beim Aktualisieren des Auftragsgeber' },
            { status: 400 }
        );
    }
}
