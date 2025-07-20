import { redirect } from 'next/navigation';

export type paramsType = Promise<{ clientId: string }>;

async function ClientPage({ params }: { params: paramsType }) {
    const { clientId } = await params;
    redirect(`/clients/${clientId}/edit`);
}

export default ClientPage;
