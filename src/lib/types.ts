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
