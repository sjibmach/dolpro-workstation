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
        clientHistory: {
            include: {
                newStatus: true;
                reason: true;
                creator: true;
            };
        };
    };
}>;

export type TClientWithStatus = Prisma.ClientGetPayload<{
    include: {
        status: true;
    };
}>;
