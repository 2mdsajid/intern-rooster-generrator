// app/lib/excelGenerator.ts
import * as XLSX from 'xlsx';

// Define the types we'll be working with, matching your other files
type Schedule = { [key: string]: string[] };
type CompleteSchedule = { [key: string]: Schedule };
type AllSchedules = { [key: string]: CompleteSchedule };
type DepartmentData = { [key: string]: string[] };

/**
 * Transforms the schedule data for one department into a flat array of objects,
 * which is a suitable format for creating an Excel sheet.
 */
function formatScheduleForSheet(scheduleData: CompleteSchedule, subunits: string[]) {
    // Using `index` from the map function to get the week number
    return Object.keys(scheduleData).map((weekRange, index) => {
        // --- MODIFIED ROW ---
        // Prepending the 'Wk' number to each row object
        const row: { [key: string]: string | number } = { 
            'Wk': index + 1,
            'Week': weekRange 
        };
        
        for (const subunit of subunits) {
            const interns = scheduleData[weekRange][subunit] || [];
            row[subunit] = interns.join(' & ');
        }
        return row;
    });
}

/**
 * Generates an Excel file from all department schedules and triggers a download.
 * Each department will be on its own sheet.
 * @param schedules - The complete generated schedule data.
 * @param departmentData - The data mapping departments to their subunits.
 * @param filename - The desired name for the downloaded file.
 */
export function exportSchedulesToExcel(
    schedules: AllSchedules,
    departmentData: DepartmentData,
    filename: string = "Internship_Schedule.xlsx"
) {
    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Iterate over each department in the schedule
    for (const departmentName in schedules) {
        if (departmentData[departmentName]) {
            const departmentSchedule = schedules[departmentName];
            const subunits = departmentData[departmentName];

            // Format the data into an array of objects
            const sheetData = formatScheduleForSheet(departmentSchedule, subunits);
            
            // Create a new worksheet from the formatted data
            const worksheet = XLSX.utils.json_to_sheet(sheetData);
            
            // Append the worksheet to the workbook, using the department name as the sheet name
            XLSX.utils.book_append_sheet(workbook, worksheet, departmentName);
        }
    }

    // Trigger the file download
    XLSX.writeFile(workbook, filename);
}