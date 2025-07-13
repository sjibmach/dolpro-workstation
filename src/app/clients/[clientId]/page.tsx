const ClientPage = ({
    params: { clientId },
}: {
    params: { clientId: string };
}) => {
    return (
        <div>
            <h1 className="text-2xl font-bold">Client ID: {clientId}</h1>
            <p>This is the client page for client with ID: {clientId}</p>
        </div>
    );
};

export default ClientPage;
