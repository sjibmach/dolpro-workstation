import { Badge } from '@/components/ui/badge';
import { useQueryJobTypes } from '@/hooks/react-query/react-query-hooks';
import Link from 'next/link';
import React from 'react';

const CellDescription = ({
    description,
    jobTypeId,
    jobId,
}: {
    description?: string | null;
    jobTypeId?: string | null;
    jobId: string;
}) => {
    const { data: jobType, isLoading: isLoadingJobTypes } = useQueryJobTypes();
    return (
        <div className="flex max-w-[300px] space-x-2 md:max-w-[450px]">
            {jobType && jobTypeId && (
                <Badge variant="outline">
                    {jobType.find(type => type.id === jobTypeId)?.name}
                </Badge>
            )}
            <Link
                className="truncate font-medium hover:underline"
                href={'/job/' + jobId}
                title={description || ''}
            >
                {description || 'Keine Beschereibung vorhanden'}
            </Link>
        </div>
    );
};

export default CellDescription;
