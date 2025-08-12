import { SCHEDULE_DATA } from './data';

// Define types for better code quality and safety
type Schedule = { [key: string]: string[] };
type CompleteSchedule = { [key: string]: Schedule };
type AllSchedules = { [key: string]: CompleteSchedule };
type DepartmentData = { [key: string]: string[] };

const formatFullDate = (date: Date): string => {
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

// --- Main Generation Logic ---

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

// This function correctly uses the custom `priorityList` for the initial assignment.
// The `subunitsList` (default order) is used to create the schedule keys, ensuring the columns display correctly.
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


// --- MODIFIED: This function now rotates based on the default display order ---
// This creates the simple "shift one step forward" rotation for weeks 2 onwards.
function rotateSchedule(currentSchedule: Schedule, subunitsList: string[]): Schedule {
    const newSchedule: Schedule = {};
    subunitsList.forEach(subunit => newSchedule[subunit] = []);
    
    if (subunitsList.length === 0) return newSchedule;

    for (let i = 0; i < subunitsList.length; i++) {
        const currentSubunit = subunitsList[i];
        const nextSubunit = subunitsList[(i + 1) % subunitsList.length];

        const internsToMove = currentSchedule[currentSubunit] || [];
        newSchedule[nextSubunit] = internsToMove;
    }
    return newSchedule;
}


// --- MODIFIED: This function now accepts the default `subunitsList` for rotation logic ---
function buildCompleteRotationalSchedule(
    initialSchedule: Schedule,
    subunitsList: string[], // <-- Use the default list for rotation
    numRotations: number,
    todayDate: Date
): CompleteSchedule {
    const completeSchedule: CompleteSchedule = {};
    let currentSchedule = { ...initialSchedule };
    let currentStartDate = new Date(todayDate);

    for (let i = 0; i < numRotations; i++) {
        const endDate = new Date(currentStartDate);
        endDate.setDate(currentStartDate.getDate() + 6);
        
        const scheduleKey = `${formatFullDate(currentStartDate)} to ${formatFullDate(endDate)}`;
        completeSchedule[scheduleKey] = JSON.parse(JSON.stringify(currentSchedule));

        // Pass the default `subunitsList` to the rotate function for predictable rotation.
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
    customPriorities: { [key: string]: string[] };
}

export function generateSchedules({
    countryKey,
    internsList,
    startingDate,
    startDepartmentName,
    customPriorities,
}: GenerateSchedulesParams): { finalSchedules: AllSchedules; departmentData: DepartmentData } {
    
    const departmentData = getDepartmentDivisions(countryKey);
    const priorityList = customPriorities;
    
    const allGeneratedSchedules: AllSchedules = {};
    let currentDate = new Date(startingDate);

    const departmentNames = Object.keys(departmentData);
    const numRotations = SCHEDULE_DATA[countryKey].departments[0]?.duration_weeks || 13;

    const startIdx = departmentNames.indexOf(startDepartmentName);
    const reorderedDepartmentNames = [...departmentNames.slice(startIdx), ...departmentNames.slice(0, startIdx)];

    for (const deptName of reorderedDepartmentNames) {
        // This is the original, default-ordered list of subunits for display and for rotation after week 1.
        const subunits = departmentData[deptName];
        const priorityKey = `${deptName}_PRIORITY`;
        
        if (priorityList[priorityKey]) {
            // This is the custom, reordered list for the initial assignment in week 1.
            const priority = priorityList[priorityKey];
            
            const initialSchedule = generateInitialSchedule(subunits, internsList, priority);
            
            // --- MODIFIED: Pass the default `subunits` list for rotation logic ---
            const finalSchedule = buildCompleteRotationalSchedule(
                initialSchedule,
                subunits, // Use the default list for simple rotation
                numRotations,
                currentDate
            );
            allGeneratedSchedules[deptName] = finalSchedule;

            currentDate.setDate(currentDate.getDate() + (numRotations * 7));
        }
    }
    return { finalSchedules: allGeneratedSchedules, departmentData };
}