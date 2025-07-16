import { ReactNode } from 'react';

const ClientsLayout = async ({ children }: { children: ReactNode }) => {
    return <div className="bg-white">{children}</div>;
};

export default ClientsLayout;
