'use client';
import { useParams } from 'next/navigation';

import {
    NewCard,
    NewCardBody,
    NewCardHeader,
    NewCardItem,
} from '@/components/custom-ui/new-card';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

import { TClientWithStatus } from '@/lib/prismaTypes';
import { ClientAddModal } from '@/components/modals/app-modals/client-add-modal';
import { InterpreterAddModal } from '../modals/app-modals/interpreter-add-modal';

const InterpretersSidetable = ({
    interpreters,
}: {
    interpreters: TClientWithStatus[] | undefined;
}) => {
    const params = useParams();
    const interpreterId = params.interpreterId as string;
    const [searchQuery, setSearchQuery] = useState('');

    const filteredInterpreters = interpreters?.filter(interpreter =>
        interpreter.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <NewCard>
            <NewCardHeader className="flex items-center justify-between">
                Dolmetscher
                <InterpreterAddModal />
            </NewCardHeader>
            <Input
                placeholder="Suchen"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="mb-2"
            />
            <NewCardBody className="max-h-[calc(100vh-200px)] overflow-y-auto">
                {filteredInterpreters && filteredInterpreters.length > 0 ? (
                    // <>
                    //     {filteredInterpreters.map((interpreter, index) => (
                    //         <Link
                    //             href={`/client/${client.id}/edit`}
                    //             title={client.name}
                    //             key={client.id}
                    //         >
                    //             <NewCardItem
                    //                 compact
                    //                 last={index === filteredClients.length - 1}
                    //                 className={cn(
                    //                     'flex items-center justify-between',
                    //                     client.id === clientId
                    //                         ? 'bg-amber-100 dark:bg-amber-800'
                    //                         : 'hover:bg-amber-50 dark:hover:bg-amber-700'
                    //                 )}
                    //             >
                    //                 <div className="flex w-full flex-col justify-between">
                    //                     <div className="flex items-center justify-between">
                    //                         <span className="text-sm">
                    //                             {client.code ? client.code : ''}{' '}
                    //                             {client.name}
                    //                         </span>
                    //                         <DropdownMenu>
                    //                             <DropdownMenuTrigger
                    //                                 asChild
                    //                                 className="flex-none cursor-pointer"
                    //                             >
                    //                                 <button
                    //                                     type="button"
                    //                                     className="flex items-center justify-center p-1"
                    //                                     aria-label="Mehr Aktionen"
                    //                                 >
                    //                                     <HiOutlineDotsHorizontal />
                    //                                 </button>
                    //                             </DropdownMenuTrigger>
                    //                             <DropdownMenuContent
                    //                                 className="w-56"
                    //                                 align="start"
                    //                             >
                    //                                 <DropdownMenuItem
                    //                                     onClick={e => {
                    //                                         e.preventDefault();
                    //                                         e.stopPropagation();
                    //                                     }}
                    //                                 >
                    //                                     <ClientDeleteAlertModal
                    //                                         clientId={client.id}
                    //                                     />
                    //                                 </DropdownMenuItem>
                    //                             </DropdownMenuContent>
                    //                         </DropdownMenu>
                    //                     </div>
                    //                     {client.statusId && (
                    //                         <Badge
                    //                             className="text-xs"
                    //                             variant="secondary"
                    //                         >
                    //                             {client?.status?.name}
                    //                         </Badge>
                    //                     )}
                    //                 </div>
                    //             </NewCardItem>
                    //         </Link>
                    //     ))}
                    // </>
                    <></>
                ) : (
                    <NewCardItem compact>
                        <span className="text-sm text-gray-500">
                            Keine Dolmetscher gefunden.
                        </span>
                    </NewCardItem>
                )}
            </NewCardBody>
        </NewCard>
    );
};

export default InterpretersSidetable;
