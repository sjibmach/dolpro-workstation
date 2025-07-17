import {
    City,
    ClientStatus,
    ClientType,
    JobPriority,
    JobStatus,
    JobType,
    Language,
} from '@prisma/client';
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

export const useQueryJobStatuses = () => {
    return useQuery<JobStatus[]>({
        queryKey: ['job-statuses'],
        queryFn: async () =>
            fetch('/api/base-data/job-statuses').then(res => res.json()),
    });
};

export const useQueryJobPriorities = () => {
    return useQuery<JobPriority[]>({
        queryKey: ['job-priorities'],
        queryFn: async () =>
            fetch('/api/base-data/job-priorities').then(res => res.json()),
    });
};

export const useQueryJobTypes = () => {
    return useQuery<JobType[]>({
        queryKey: ['job-types'],
        queryFn: async () =>
            fetch('/api/base-data/job-types').then(res => res.json()),
    });
};

export const useQueryLanguages = () => {
    return useQuery<Language[]>({
        queryKey: ['languages'],
        queryFn: async () =>
            fetch('/api/base-data/languages').then(res => res.json()),
    });
};
