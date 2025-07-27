import { TIdAndNameObject } from '@/lib/types';
import {
    City,
    ClientStatus,
    ClientStatusReason,
    ClientType,
    InterpreterStatus,
    InterpreterStatusReason,
    JobCompletionStatus,
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

export const useQueryJobCompletionStatuses = () => {
    return useQuery<JobCompletionStatus[]>({
        queryKey: ['job-completion-statuses'],
        queryFn: async () =>
            fetch('/api/base-data/job-completion-statuses').then(res =>
                res.json()
            ),
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

export const useQueryJobModes = () => {
    return useQuery<JobType[]>({
        queryKey: ['job-modes'],
        queryFn: async () =>
            fetch('/api/base-data/job-modes').then(res => res.json()),
    });
};

export const useQueryLanguages = () => {
    return useQuery<Language[]>({
        queryKey: ['languages'],
        queryFn: async () =>
            fetch('/api/base-data/languages').then(res => res.json()),
    });
};

export const useQueryClientStatusReasons = () => {
    return useQuery<ClientStatusReason[]>({
        queryKey: ['client-status-reasons'],
        queryFn: async () =>
            fetch('/api/base-data/client-status-reasons').then(res =>
                res.json()
            ),
    });
};

export const useQueryClientsList = () => {
    return useQuery<TIdAndNameObject[]>({
        queryKey: ['clients-list'],
        queryFn: async () =>
            fetch('/api/base-data/clients-list').then(res => res.json()),
    });
};

export const useQueryInterpreterStatuses = () => {
    return useQuery<InterpreterStatus[]>({
        queryKey: ['interpreter-statuses'],
        queryFn: async () =>
            fetch('/api/base-data/interpreter-statuses').then(res =>
                res.json()
            ),
    });
};

export const useQueryInterpreterStatusReasons = () => {
    return useQuery<InterpreterStatusReason[]>({
        queryKey: ['interpreter-status-reason'],
        queryFn: async () =>
            fetch('/api/base-data/interpreter-status-reasons').then(res =>
                res.json()
            ),
    });
};

export const useQueryInterpretersList = () => {
    return useQuery<TIdAndNameObject[]>({
        queryKey: ['interpreters-list'],
        queryFn: async () =>
            fetch('/api/base-data/interpreters-list').then(res => res.json()),
    });
};
