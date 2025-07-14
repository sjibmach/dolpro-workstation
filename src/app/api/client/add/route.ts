import { TAddClient } from '@/components/modals/app-modals/client-add-modal';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { name, clientTypeId, statusId }: TAddClient = await req.json();

    if (!name || !clientTypeId) {
        return NextResponse.json(
            { error: 'Name und Auftragsgeber-Typ sind erforderlich' },
            { status: 400 }
        );
    }

    try {
        const newClient = await prisma.client.create({
            data: {
                name,
                typeId: clientTypeId!,
                statusId: statusId || null, // Optional statusId
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
