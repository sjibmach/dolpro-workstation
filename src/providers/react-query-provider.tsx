'use client';
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools';
import { ReactNode, useState } from 'react';

const queryClient = new QueryClient();

const ReactQueryProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            {/* Button to toggle the devtools panel */}
            {/* <button
                onClick={() => setIsOpen(!isOpen)}
            >{`${isOpen ? 'Close' : 'Open'} the devtools panel`}</button>
            {isOpen && (
                <ReactQueryDevtoolsPanel onClose={() => setIsOpen(false)} />
            )} */}
        </QueryClientProvider>
    );
};

export default ReactQueryProvider;
