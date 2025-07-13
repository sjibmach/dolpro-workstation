import TwoColumnsLayout from '@/components/layout/two-column-layout';
import React, { ReactNode } from 'react';

const ClientsLayout = ({ children }: { children: ReactNode }) => {
    return (
        <TwoColumnsLayout asideContent={<div>Aside Content</div>}>
            {children}
        </TwoColumnsLayout>
    );
};

export default ClientsLayout;
