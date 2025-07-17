import { getJobTypes } from '@/actions/get-base-data';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    console.log('================== GET /api/base-data/job-types');

    try {
        const result = await getJobTypes();

        return NextResponse.json(result);
    } catch (error) {
        console.log(error);
        return NextResponse.error();
    }
}
