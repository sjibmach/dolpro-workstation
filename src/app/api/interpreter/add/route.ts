import { TInterpreterAdd } from '@/components/modals/app-modals/interpreter-add-modal';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const body: TInterpreterAdd = await req.json();

    const {
        firstName,
        lastName,
        email,
        phone1,
        phone2,
        gender,
        birthDate,
        street,
        zip,
        cityId,
        offersRemote,
        offersOnSite,
        car,
        availability,
        startDate,
        endDate,
        interviewDate,
        defaultHourlyRate,
        kmRate,
        iban,
        notes,
        languages,
        preferredCities,
        statusId,
    } = body;

    // Validate required fields
    if (!lastName) {
        return NextResponse.json(
            { error: 'lastName ist erforderlich' },
            { status: 400 }
        );
    }
    if (!statusId) {
        return NextResponse.json(
            { error: 'statusId ist erforderlich' },
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

    const lastCodeNumber = await prisma.interpreter.findMany({
        orderBy: { codeNumber: 'desc' },
        select: { codeNumber: true },
    });

    const nextCodeNumber = !!lastCodeNumber[0]
        ? lastCodeNumber[0].codeNumber! + 1
        : 1;

    console.log('newCityId:', newCityId);

    const newCode = `DO${nextCodeNumber.toString().padStart(5, '0')}`;

    try {
        const newClient = await prisma.interpreter.create({
            data: {
                code: newCode,
                codeNumber: nextCodeNumber,
                firstName,
                lastName,
                email,
                phone1,
                phone2,
                gender,
                birthDate: birthDate ? new Date(birthDate) : null,
                street,
                zip,
                cityId: newCityId ? newCityId : null,
                offersRemote,
                offersOnSite,
                car,
                availability,
                startDate: startDate ? new Date(startDate) : null,
                endDate: endDate ? new Date(endDate) : null,
                interviewDate: interviewDate ? new Date(interviewDate) : null,
                defaultHourlyRate,
                kmRate,
                iban,
                notes,
                statusId,

                languages: {
                    createMany: {
                        data: languages.map(language => ({
                            languageId: language.id,
                        })),
                    },
                },

                preferredCities: {
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
