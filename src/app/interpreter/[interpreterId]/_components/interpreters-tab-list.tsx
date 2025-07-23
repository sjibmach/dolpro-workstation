'use client';
import TabsList from '@/components/custom-ui/tabs-list';
import { usePathname } from 'next/navigation';
import { HiMiniPencil, HiQueueList } from 'react-icons/hi2';

export const InterpreterTabList = ({
    interpreterId,
}: {
    interpreterId: string;
}) => {
    const pathname = usePathname();

    const tabs = [
        {
            name: 'jobs',
            href: `/interpreter/${interpreterId}/jobs`,
            title: 'Aufträge',
            icon: HiQueueList,
            current: !!pathname?.includes('jobs'),
        },
        {
            name: 'edit',
            href: `/interpreter/${interpreterId}/edit`,
            title: 'Bearbeiten',
            icon: HiMiniPencil,
            current: !!pathname?.includes('edit'),
        },
    ];
    return <TabsList tabs={tabs} />;
};
