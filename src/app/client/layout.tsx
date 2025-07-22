import TwoColumnsLayout from '@/components/layout/two-column-layout';
import { ReactNode } from 'react';
import ClientsSideBar from '@/components/sidetables/clients-sidebar';

const ClientsLayout = async ({ children }: { children: ReactNode }) => {
    return (
        <TwoColumnsLayout asideContent={<ClientsSideBar />}>
            {children}
        </TwoColumnsLayout>
    );
};

export default ClientsLayout;
