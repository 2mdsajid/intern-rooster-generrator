// app/lib/scheduleGenerator.ts

import { SCHEDULE_DATA, ALL_PRIORITIES } from './data';

// Define types for better code quality and safety
type Schedule = { [key: string]: string[] };
type CompleteSchedule = { [key: string]: Schedule };
type AllSchedules = { [key: string]: CompleteSchedule };
type DepartmentData = { [key: string]: string[] };

// --- MODIFIED ---
// New helper to format dates like '08 Aug 2025'
const formatFullDate = (date: Date): string => {
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

// --- Main Generation Logic ---

// Equivalent to get_department_divisions
export function getDepartmentDivisions(countryKey: keyof typeof SCHEDULE_DATA): DepartmentData {
    const departmentsData = SCHEDULE_DATA[countryKey];
    if (!departmentsData) return {};

    const result: DepartmentData = {};
    for (const department of departmentsData.departments) {
        const allDivisions = department.subdepartments.flatMap(sub => sub.divisions);
        result[department.name] = allDivisions;
    }
    return result;
}

// Equivalent to generate_initial_schedule
function generateInitialSchedule(subunitsList: string[], internsList: string[], priorityList: string[]): Schedule {
    const schedule: Schedule = {};
    subunitsList.forEach(subunit => schedule[subunit] = []);

    if (!internsList.length || !priorityList.length) return schedule;

    internsList.forEach((intern, i) => {
        const assignedSubunit = priorityList[i % priorityList.length];
        if (schedule.hasOwnProperty(assignedSubunit)) {
            schedule[assignedSubunit].push(intern);
        }
    });
    return schedule;
}

// Equivalent to rotate_schedule
function rotateSchedule(currentSchedule: Schedule, subunitsList: string[]): Schedule {
    const newSchedule: Schedule = {};
    subunitsList.forEach(subunit => newSchedule[subunit] = []);
    
    if (subunitsList.length === 0) return newSchedule;

    for (let i = 0; i < subunitsList.length; i++) {
        const currentSubunit = subunitsList[i];
        const nextSubunit = subunitsList[(i + 1) % subunitsList.length];
        newSchedule[nextSubunit] = [...(currentSchedule[currentSubunit] || [])];
    }
    return newSchedule;
}

// Equivalent to build_complete_rotational_schedule
function buildCompleteRotationalSchedule(initialSchedule: Schedule, subunitsList: string[], numRotations: number, todayDate: Date): CompleteSchedule {
    const completeSchedule: CompleteSchedule = {};
    let currentSchedule = { ...initialSchedule };
    let currentStartDate = new Date(todayDate);

    for (let i = 0; i < numRotations; i++) {
        const endDate = new Date(currentStartDate);
        endDate.setDate(currentStartDate.getDate() + 6);
        
        // --- MODIFIED ---
        // The schedule key now uses the new, more descriptive format
        const scheduleKey = `${formatFullDate(currentStartDate)} to ${formatFullDate(endDate)}`;

        completeSchedule[scheduleKey] = JSON.parse(JSON.stringify(currentSchedule)); // Deep copy

        currentSchedule = rotateSchedule(currentSchedule, subunitsList);
        currentStartDate.setDate(currentStartDate.getDate() + 7);
    }
    return completeSchedule;
}


// --- Main Orchestrator Function ---
interface GenerateSchedulesParams {
    countryKey: 'nepali' | 'indian' | 'saarc';
    internsList: string[];
    startingDate: Date;
    startDepartmentName: string;
}

export function generateSchedules({
    countryKey,
    internsList,
    startingDate,
    startDepartmentName,
}: GenerateSchedulesParams): { finalSchedules: AllSchedules; departmentData: DepartmentData } {
    
    const departmentData = getDepartmentDivisions(countryKey);
    const priorityList = ALL_PRIORITIES[countryKey];
    
    const allGeneratedSchedules: AllSchedules = {};
    let currentDate = new Date(startingDate);

    const departmentNames = Object.keys(departmentData);
    const numRotations = SCHEDULE_DATA[countryKey].departments[0]?.duration_weeks || 13;

    // Reorder departments based on user's starting choice
    const startIdx = departmentNames.indexOf(startDepartmentName);
    const reorderedDepartmentNames = [...departmentNames.slice(startIdx), ...departmentNames.slice(0, startIdx)];

    for (const deptName of reorderedDepartmentNames) {
        const subunits = departmentData[deptName];
        const priorityKey = `${deptName}_PRIORITY` as keyof typeof priorityList;
        
        if (priorityList[priorityKey]) {
            const priority = priorityList[priorityKey];
            const initialSchedule = generateInitialSchedule(subunits, internsList, priority);
            
            const finalSchedule = buildCompleteRotationalSchedule(
                initialSchedule,
                subunits,
                numRotations,
                currentDate
            );
            allGeneratedSchedules[deptName] = finalSchedule;

            currentDate.setDate(currentDate.getDate() + (numRotations * 7));
        }
    }
    return { finalSchedules: allGeneratedSchedules, departmentData };
}