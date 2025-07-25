import { Badge } from '@/components/ui/badge';
import { useQueryJobTypes } from '@/hooks/react-query/react-query-hooks';
import Link from 'next/link';
import React from 'react';

const DescriptionCell = ({
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
        <div className="flex space-x-2">
            {jobType && jobTypeId && (
                <Badge variant="outline">
                    {jobType.find(type => type.id === jobTypeId)?.name}
                </Badge>
            )}
            <Link
                className="max-w-[400px] truncate font-medium hover:underline"
                href={'/job/' + jobId}
            >
                {description || 'Keine Beschereibung vorhanden'}
            </Link>
        </div>
    );
};

export default DescriptionCell;
