import { ReactNode } from 'react';

export type paramsType = Promise<{ jobId: string }>;

const JobIdLayout = async ({
    children,
    params,
}: {
    children: ReactNode;
    params: paramsType;
}) => {
    const { jobId } = await params;

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold">Test Layout for Job Id</h1>
                <p>This is the job page for job with ID: {jobId} </p>
            </div>
            {children}
        </div>
    );
};

export default JobIdLayout;
