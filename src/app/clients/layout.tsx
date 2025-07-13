import TwoColumnsLayout from '@/components/layout/two-column-layout';
import ClientsSidetable from '@/components/sidetables/clients-sidetable';
import React, { ReactNode } from 'react';

const ClientsLayout = ({ children }: { children: ReactNode }) => {
    return (
        <TwoColumnsLayout asideContent={<ClientsSidetable />}>
            {children}
        </TwoColumnsLayout>
    );
};

export default ClientsLayout;
