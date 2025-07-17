import { z } from 'zod';

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
// export const taskSchema = z.object({
//     id: z.string(),
//     title: z.string(),
//     status: z.string(),
//     label: z.string(),
//     priority: z.string(),
// });

// export type Task = z.infer<typeof taskSchema>;

export const jobTableSchema = z.object({
    id: z.string(),
    code: z.string(),
    clientId: z.string(),
    clientName: z.string().nullable(),
    description: z.string().nullable(),
    jobTypeId: z.string().nullable(),
    jobTypeName: z.string().nullable(),
    statusId: z.string(),
    statusName: z.string().nullable(),
    languageToId: z.string(),
    languageToName: z.string().nullable(),
    priorityId: z.string().nullable().optional(),
    priorityName: z.string().nullable().optional(),
});

export type TJobTable = z.infer<typeof jobTableSchema>;
