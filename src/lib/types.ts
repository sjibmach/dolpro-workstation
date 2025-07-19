import {
    City,
    Client,
    ClientContactperson,
    ClientStatus,
    ClientStatusReason,
    ClientType,
    Prisma,
} from '@prisma/client';

export type TIdAndNameObject = {
    id: string;
    name: string;
    [key: string]: any;
};

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
