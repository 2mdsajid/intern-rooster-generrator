// app/lib/types.ts
export type Schedule = { [key: string]: string[] };
export type CompleteSchedule = { [key: string]: Schedule };
export type AllSchedules = { [key: string]: CompleteSchedule };
export type DepartmentData = { [key: string]: string[] };