import { City, ClientStatus, ClientType } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';

export const useQueryClientTypes = () => {
    return useQuery<ClientType[]>({
        queryKey: ['client-types'],
        queryFn: async () =>
            fetch('/api/base-data/client-types').then(res => res.json()),
    });
};

export const useQueryClientStatuses = () => {
    return useQuery<ClientStatus[]>({
        queryKey: ['client-statuses'],
        queryFn: async () =>
            fetch('/api/base-data/client-statuses').then(res => res.json()),
    });
};

export const useQueryCities = () => {
    return useQuery<City[]>({
        queryKey: ['cities'],
        queryFn: async () =>
            fetch('/api/base-data/cities').then(res => res.json()),
    });
};
