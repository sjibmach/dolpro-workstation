'use client';
import TabsList from '@/components/custom-ui/tabs-list';
import { usePathname } from 'next/navigation';
import { HiMiniPencil, HiQueueList } from 'react-icons/hi2';

export const ClientTabList = ({ clientId }: { clientId: string }) => {
    const pathname = usePathname();

    const tabs = [
        {
            name: 'jobs',
            href: `/client/${clientId}/jobs`,
            title: 'Aufträge',
            icon: HiQueueList,
            current: !!pathname?.includes('jobs'),
        },
        {
            name: 'edit',
            href: `/client/${clientId}/edit`,
            title: 'Bearbeiten',
            icon: HiMiniPencil,
            current: !!pathname?.includes('edit'),
        },
    ];
    return <TabsList tabs={tabs} />;
};
