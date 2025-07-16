import { prisma } from '@/lib/prisma';

export const getClientTypes = async () => {
    const result = await prisma.clientType.findMany({});
    const sortedResult = result.sort((a, b) => {
        // null should come last
        if (a.sortIndex === null) return 1;
        if (b.sortIndex === null) return -1;
        return (a.sortIndex ?? 0) - (b.sortIndex ?? 0);
    });
    return sortedResult;
};

export const getClientStatuses = async () => {
    const result = await prisma.clientStatus.findMany({});
    const sortedResult = result.sort((a, b) => {
        // null should come last
        if (a.sortIndex === null) return 1;
        if (b.sortIndex === null) return -1;
        return (a.sortIndex ?? 0) - (b.sortIndex ?? 0);
    });

    return sortedResult;
};

export const getCities = async () => {
    const result = await prisma.city.findMany({});
    const sortedResult = result.sort((a, b) => {
        // null should come last
        if (a.sortIndex === null) return 1;
        if (b.sortIndex === null) return -1;
        return (a.sortIndex ?? 0) - (b.sortIndex ?? 0);
    });

    return sortedResult;
};
