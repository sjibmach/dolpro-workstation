import { Prisma } from '@prisma/client';

export type TClientFullOverview = Prisma.ClientGetPayload<{
    include: {
        status: true;
        type: true;
        statusReason: true;
        city: true;
        contactPersons: {
            include: {
                city: true;
            };
        };
    };
}>;

export type TClientWithStatus = Prisma.ClientGetPayload<{
    include: {
        status: true;
    };
}>;
