import { TClientContactPersonEdit } from '@/components/modals/app-modals/client-contact-person-edit-modal';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const body: TClientContactPersonEdit = await req.json();

    const {
        id,
        salutation,
        firstName,
        lastName,
        email,
        phone,
        street,
        zip,
        cityId,
    } = body;

    try {
        await prisma.clientContactperson.update({
            where: { id },
            data: {
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
        });
    } catch (error) {
        console.log(error);

        return NextResponse.json(
            { error: 'Fehler beim Aktualisieren des Kontakts' },
            { status: 400 }
        );
    }
}
