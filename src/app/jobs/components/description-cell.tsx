import { Badge } from '@/components/ui/badge';
import { useQueryJobTypes } from '@/hooks/react-query/react-query-hooks';
import React from 'react';

const DescriptionCell = ({
    description,
    jobTypeId,
}: {
    description?: string | null;
    jobTypeId?: string | null;
}) => {
    const { data: jobType, isLoading: isLoadingJobTypes } = useQueryJobTypes();
    return (
        <div className="flex space-x-2">
            {jobType && jobTypeId && (
                <Badge variant="outline">
                    {jobType.find(type => type.id === jobTypeId)?.name}
                </Badge>
            )}
            <span className="max-w-[400px] truncate font-medium">
                {description || 'Keine Beschereibung vorhanden'}
            </span>
        </div>
    );
};

export default DescriptionCell;
