import { prisma } from '@/lib/prisma';

export const getClientTypes = async () => {
    const result = await prisma.clientTypes.findMany({});
    const convertedResult = result.map(item => ({
        id: item.id,
        name: item.name,
    }));

    return convertedResult;
};
