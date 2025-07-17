import { ReactNode } from 'react';

const ClientsLayout = async ({ children }: { children: ReactNode }) => {
    return <div className="bg-white dark:bg-gray-950">{children}</div>;
};

export default ClientsLayout;
