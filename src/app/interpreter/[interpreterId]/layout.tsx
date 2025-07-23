import { ReactNode } from 'react';
import { prisma } from '@/lib/prisma';
import { InterpreterTabList } from './_components/interpreters-tab-list';

export const dynamic = 'force-dynamic';

export type paramsType = Promise<{ interpreterId: string }>;

const ClientsLayout = async ({
    children,
    params,
}: {
    children: ReactNode;
    params: paramsType;
}) => {
    const { interpreterId } = await params;
    const interpreter = await prisma.interpreter.findFirst({
        where: { id: interpreterId },
    });

    if (!interpreter) return <>Keine Dolmetscher</>;
    const interpreterName =
        `${interpreter.code ? interpreter.code : ''}` +
        `${interpreter.lastName ? interpreter.lastName : ''}`;

    return (
        <>
            {/* {<pre>{JSON.stringify(client, null, 2)}</pre>} */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold">{interpreterName}</h1>
                <p>
                    This is the interpreter page for interpreter with ID:{' '}
                    {interpreterId}
                </p>
                <InterpreterTabList interpreterId={interpreterId} />
            </div>
            {children}
        </>
    );
};

export default ClientsLayout;
