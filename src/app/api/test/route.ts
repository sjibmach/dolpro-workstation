import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const POST = async () => {
    const cities = await prisma.cities.findMany();
    console.log('cities: ', cities);
    return NextResponse.json({ message: 'success' });
};
