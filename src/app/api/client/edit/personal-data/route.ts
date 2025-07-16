import { TClientPersonalDataEdit } from '@/components/modals/app-modals/client-personal-data-edit-modal';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    console.log('------ POST /api/client/edit/personal-data ---');
    const body: TClientPersonalDataEdit = await req.json();

    const { id, name, nameShortcut, clientTypeId, statusId, phone, email } =
        body;

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

    try {
        const newClient = await prisma.client.update({
            where: { id },
            data: {
                name,
                typeId: clientTypeId!,
                statusId: statusId, // Optional statusId
                nameShortcut: nameShortcut || null,
                email: email || null,
                phone: phone || null,
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
