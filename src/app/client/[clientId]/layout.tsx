import { ReactNode } from 'react';
import { ClientTabList } from './_components/clients-tab-list';

export type paramsType = Promise<{ clientId: string }>;

const ClientsLayout = async ({
    children,
    params,
}: {
    children: ReactNode;
    params: paramsType;
}) => {
    const { clientId } = await params;

    return (
        <div>
            {/* {<pre>{JSON.stringify(client, null, 2)}</pre>} */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold">
                    Test Layout for Client Id
                </h1>
                <p>This is the client page for client with ID: {clientId} </p>
                <ClientTabList clientId={clientId} />
            </div>
            {children}
        </div>
    );
};

export default ClientsLayout;
