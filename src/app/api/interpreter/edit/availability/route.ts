import { TInterpreterAvailabilityEdit } from '@/components/modals/app-modals/interpreter-availability-edit-modal';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    console.log('-----------------INTERPRETER EDIT AVAILABILTY------------');
    const body: TInterpreterAvailabilityEdit = await req.json();

    const {
        id,
        offersOnSite,
        offersRemote,
        car,
        availability,
        endDate,
        startDate,
        preferredCities,
    } = body;

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
                offersRemote,
                offersOnSite,
                car,
                availability,
                startDate: startDate ? new Date() : null,
                endDate: endDate ? new Date() : null,
                preferredCities: {
                    deleteMany: {},
                    createMany: {
                        data: preferredCities.map(cityId => ({
                            cityId,
                        })),
                    },
                },
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
