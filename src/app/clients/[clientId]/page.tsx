interface IParams {
    params: {
        clientId?: string;
    };
}

export type paramsType = Promise<{ clientId: string }>;

async function ClientPage(props: { params: paramsType }) {
    const { clientId } = await props.params;

    return (
        <div>
            <h1 className="text-2xl font-bold">Client ID: {clientId}</h1>
            <p>This is the client page for client with ID: {clientId}</p>
        </div>
    );
}

export default ClientPage;
