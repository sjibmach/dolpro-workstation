import { prisma } from '@/lib/prisma';

export const getClientTypes = async () => {
    const result = await prisma.clientType.findMany({});
    const convertedResult = result.map(item => ({
        id: item.id,
        name: item.name,
    }));

    return convertedResult;
};

export const getClientStatuses = async () => {
    const result = await prisma.clientStatus.findMany({});
    const convertedResult = result
        .map(item => ({
            id: item.id,
            name: item.name,
            sortOrder: item.sortOrder,
        }))
        .sort((a, b) => {
            // null should come last
            if (a.sortOrder === null) return 1;
            if (b.sortOrder === null) return -1;
            return (a.sortOrder ?? 0) - (b.sortOrder ?? 0);
        });

    return convertedResult;
};
