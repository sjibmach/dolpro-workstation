// Jobstatus-IDs (Status der Vermittlung)
export const jobStatusIds = [
    'aborted',
    'canceledByClient',
    'canceledByInterpreter',
    'canceledByOther',
    'completed',
    'noShowClient',
    'noShowInterpreter',
    'openAwaitingClient',
    'openAwaitingConfirmation',
    'openAwaitingInterpreter',
    'openFindDate',
    'openFindInterpreter',
    'scheduled',
] as const;

export type JobStatusId = (typeof jobStatusIds)[number];

// Durchführungstatus-IDs (was beim Termin passiert ist)
export const jobCompletionStatusIds = [
    'aborted',
    'canceledByClient',
    'canceledByInterpreter',
    'canceledByOther',
    'completed',
    'inProgress',
    'noShowByClient',
    'noShowByInterpreter',
    'scheduled',
] as const;

export type JobCompletionStatusId = (typeof jobCompletionStatusIds)[number];
type Input = {
    interpreterId?: string | null;
    jobDate?: string | null;
    isConfirmedInterpreter?: boolean;
    isConfirmedClient?: boolean;
    jobCompletionStatusId?: string | null; // <- string statt union
};

export function isValidJobCompletionStatusId(
    value: any
): value is JobCompletionStatusId {
    return jobCompletionStatusIds.includes(value);
}

export function calculateJobStatus(input: Input): {
    jobStatusId: JobStatusId;
    jobCompletionStatusId: JobCompletionStatusId;
} {
    const {
        interpreterId,
        jobDate,
        isConfirmedInterpreter,
        isConfirmedClient,
        jobCompletionStatusId,
    } = input;

    // Wenn ungültiger Wert übergeben wurde → als null behandeln
    const validCompletionStatus: JobCompletionStatusId | null =
        isValidJobCompletionStatusId(jobCompletionStatusId)
            ? jobCompletionStatusId
            : null;

    console.log('interpreterId: ', interpreterId);
    console.log('validCompletionStatus: ', validCompletionStatus);

    if (
        validCompletionStatus === 'canceledByClient' ||
        validCompletionStatus === 'canceledByInterpreter' ||
        validCompletionStatus === 'canceledByOther'
    ) {
        return {
            jobStatusId: validCompletionStatus,
            jobCompletionStatusId: validCompletionStatus,
        };
    }

    if (!interpreterId) {
        return {
            jobStatusId: 'openFindInterpreter',
            jobCompletionStatusId: 'inProgress',
        };
    }

    if (!jobDate) {
        return {
            jobStatusId: 'openFindDate',
            jobCompletionStatusId: 'inProgress',
        };
    }

    const allSet =
        !!interpreterId &&
        !!jobDate &&
        !!isConfirmedClient &&
        !!isConfirmedInterpreter;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const jobDateObj = new Date(jobDate);
    jobDateObj.setHours(0, 0, 0, 0);

    const isFuture = jobDateObj > today;
    const isTodayOrPast = jobDateObj <= today;

    if (!isConfirmedClient && !isConfirmedInterpreter) {
        return {
            jobStatusId: 'openAwaitingConfirmation',
            jobCompletionStatusId: 'inProgress',
        };
    }

    if (!isConfirmedInterpreter) {
        return {
            jobStatusId: 'openAwaitingInterpreter',
            jobCompletionStatusId: 'inProgress',
        };
    }

    if (!isConfirmedClient) {
        return {
            jobStatusId: 'openAwaitingClient',
            jobCompletionStatusId: 'inProgress',
        };
    }

    if (allSet && isFuture) {
        return {
            jobStatusId: 'scheduled',
            jobCompletionStatusId: 'scheduled',
        };
    }

    if (allSet && isTodayOrPast && validCompletionStatus) {
        const mapped: Partial<Record<JobCompletionStatusId, JobStatusId>> = {
            completed: 'completed',
            aborted: 'aborted',
            noShowByClient: 'noShowClient',
            noShowByInterpreter: 'noShowInterpreter',
        };

        return {
            jobStatusId: mapped[validCompletionStatus] ?? 'scheduled',
            jobCompletionStatusId: validCompletionStatus,
        };
    }

    return {
        jobStatusId: 'openAwaitingConfirmation',
        jobCompletionStatusId: 'inProgress',
    };
}
