import { TClientContactPersonAdd } from '@/components/modals/app-modals/client-contact-person-add-modal';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const body: TClientContactPersonAdd = await req.json();

    const {
        clientId,
        salutation,
        firstName,
        lastName,
        email,
        phone,
        street,
        zip,
        cityId,
    } = body;

    // Validate required fields
    if (!clientId) {
        return NextResponse.json(
            { error: 'clientId ist erforderlich' },
            { status: 400 }
        );
    }

    if (!lastName) {
        return NextResponse.json(
            { error: 'Nachname ist erforderlich' },
            { status: 400 }
        );
    }

    try {
        const newClientContactPerson = await prisma.clientContactperson.create({
            data: {
                clientId,
                salutation: salutation || null,
                firstName: firstName || '',
                lastName,
                email: email || '',
                phone: phone || '',
                street: street || '',
                zip: zip || '',
                cityId: cityId || null,
            },
        });

        return NextResponse.json({
            message: 'success',
            data: { id: newClientContactPerson.id },
        });
    } catch (error) {
        console.log(error);

        return NextResponse.json(
            { error: 'Fehler beim Hinzufügen des Kontakts' },
            { status: 400 }
        );
    }
}
