import { getInterpretersForJobs } from '@/actions/get-base-data';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    console.log('================== GET /api/base-data/interpreters-for-jobs');

    try {
        const result = await getInterpretersForJobs();

        return NextResponse.json(result);
    } catch (error) {
        console.log(error);
        return NextResponse.error();
    }
}
