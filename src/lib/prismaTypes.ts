import { JobHistory, Prisma } from '@prisma/client';

export type TClientFullOverview = Prisma.ClientGetPayload<{
    include: {
        status: true;
        type: true;
        statusReason: true;
        city: true;
        contactPersons: {
            include: {
                city: true;
            };
        };
        clientHistory: {
            include: {
                newStatus: true;
                reason: true;
                creator: true;
            };
        };
    };
}>;

export type TClientWithStatus = Prisma.ClientGetPayload<{
    include: {
        status: true;
    };
}>;

export type TJobForSideTable = Prisma.JobGetPayload<{
    include: {
        status: true;
        client: true;
    };
}>;

export type TJobFullOverview = Prisma.JobGetPayload<{
    include: {
        client: true;
        addressCity: true;
        interpreter: true;
        jobContactperson: true;
        jobType: true;
        languageTo: true;
        priority: true;
        status: true;
        jobMode: true;
    };
}>;

export type TInterpreterWithStatus = Prisma.InterpreterGetPayload<{
    include: {
        status: true;
    };
}>;

export type TInterpreterFullOverview = Prisma.InterpreterGetPayload<{
    include: {
        city: true;
        languages: {
            include: {
                language: true;
            };
        };
        preferredCities: {
            include: {
                city: true;
            };
        };
        status: true;
        jobs: true;
        interpreterHistory: {
            include: {
                newStatus: true;
                reason: true;
                creator: true;
            };
        };
    };
}>;

export type TJobOverviewTable = Prisma.JobGetPayload<{
    include: {
        client: true;
        interpreter: true;
        status: true;
        languageTo: true;
        addressCity: true;
        priority: true;
        jobType: true;
        jobMode: true;
        creator: true;
    };
}>;
