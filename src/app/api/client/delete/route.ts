import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const body = await req.json();

    const { clientId } = body;

    // Validate required fields
    if (!clientId) {
        return NextResponse.json(
            { error: 'clientId ist erforderlich' },
            { status: 400 }
        );
    }

    try {
        await prisma.client.delete({
            where: { id: clientId },
        });

        return NextResponse.json({
            message: 'success',
        });
    } catch (error) {
        console.log(error);

        return NextResponse.json(
            { error: 'Fehler beim Löschen des Auftraggebers' },
            { status: 400 }
        );
    }
}
