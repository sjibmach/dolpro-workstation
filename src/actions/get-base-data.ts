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

export const getLanguages = async () => {
    const result = await prisma.language.findMany();
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
