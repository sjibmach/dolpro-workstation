import { TClientHistroy } from '@/components/modals/app-modals/client-add-modal';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const body: TClientHistroy = await req.json();

    const {
        name,
        nameShortcut,
        clientTypeId,
        statusId,
        phone,
        email,
        street,
        zip,
        cityId,
    } = body;

    // Validate required fields
    if (!name) {
        return NextResponse.json(
            { error: 'Name ist erforderlich' },
            { status: 400 }
        );
    }
    if (!clientTypeId) {
        return NextResponse.json(
            { error: 'Client Type ID ist erforderlich' },
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

    const lastCodeNumber = await prisma.client.findMany({
        orderBy: { codeNumber: 'desc' },
        select: { codeNumber: true },
        where: { codeNumber: { not: null } },
    });

    const nextCodeNumber = !!lastCodeNumber[0]
        ? lastCodeNumber[0].codeNumber! + 1
        : 1;

    const newCode = `AG${nextCodeNumber.toString().padStart(5, '0')}`;

    try {
        const newClient = await prisma.client.create({
            data: {
                name,
                code: newCode,
                codeNumber: nextCodeNumber,
                typeId: clientTypeId!,
                statusId: statusId, // Optional statusId

                nameShortcut: nameShortcut || null,
                email: email || null,
                phone: phone || null,
                street: street || null,
                zip: zip || null,
                cityId: newCityId || null,
            },
        });

        return NextResponse.json({
            message: 'success',
            data: { id: newClient.id },
        });
    } catch (error) {
        console.log(error);

        return NextResponse.json(
            { error: 'Auftragsgeber konnte nicht hinzugefügt werden' },
            { status: 400 }
        );
    }
}
