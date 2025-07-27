import { prisma } from '@/lib/prisma';

export const sortBySortIndex = <T extends { sortIndex: number | null }>(
    a: T,
    b: T
) => {
    if (a.sortIndex === null) return 1;
    if (b.sortIndex === null) return -1;
    return (a.sortIndex ?? 0) - (b.sortIndex ?? 0);
};

export const getClientTypes = async () => {
    const result = await prisma.clientType.findMany();
    return result.sort(sortBySortIndex);
};

export const getClientStatuses = async () => {
    const result = await prisma.clientStatus.findMany();
    return result.sort(sortBySortIndex);
};

export const getCities = async () => {
    const result = await prisma.city.findMany();
    return result.sort(sortBySortIndex);
};

export const getJobStatuses = async () => {
    const result = await prisma.jobStatus.findMany();
    return result.sort(sortBySortIndex);
};

export const getJobPriorities = async () => {
    const result = await prisma.jobPriority.findMany();
    return result.sort(sortBySortIndex);
};

export const getJobTypes = async () => {
    const result = await prisma.jobType.findMany();
    return result.sort(sortBySortIndex);
};

export const getJobModes = async () => {
    const result = await prisma.jobMode.findMany();
    return result.sort(sortBySortIndex);
};

export const getLanguages = async () => {
    const result = await prisma.language.findMany();
    return result.sort(sortBySortIndex);
};

export const getClientStatusReasons = async () => {
    const result = await prisma.clientStatusReason.findMany();
    return result.sort(sortBySortIndex);
};

export const getInterpreterStatuses = async () => {
    const result = await prisma.interpreterStatus.findMany();
    // console.log('interpreterStatuses: ', result);
    return result.sort(sortBySortIndex);
};

export const getInterpreterStatusReasons = async () => {
    const result = await prisma.interpreterStatusReason.findMany();
    return result.sort(sortBySortIndex);
};

export const getClientsForAddingJobs = async () => {
    const result = await prisma.client.findMany({
        select: {
            id: true,
            name: true,
        },
    });
    return result;
};

export const getInterpretersForJobs = async () => {
    const result = await prisma.interpreter.findMany({
        select: {
            id: true,
            code: true,
            firstName: true,
            lastName: true,
        },
    });

    const convertedToName = result.map(interpreter => ({
        id: interpreter.id,
        name: `${interpreter.code} - ${interpreter.firstName} ${interpreter.lastName}`,
    }));

    return convertedToName;
};
