// app/admin/page.tsx
'use client';
import { useState } from 'react';
import ScheduleForm from './components/ScheduleForm';
import ScheduleResults from './components/ScheduleResults';
import { generateSchedules } from '../lib/scheduleGenerator';
import type { AllSchedules, DepartmentData } from '@/app/lib/types';

export default function AdminPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [scheduleOutput, setScheduleOutput] = useState<AllSchedules>({});
  const [departmentData, setDepartmentData] = useState<DepartmentData | null>(null);
  const [masterInternList, setMasterInternList] = useState<string[]>([]);

  const handleFormSubmit = (formData: any) => {
    setIsLoading(true);
    setScheduleOutput({});
    setDepartmentData(null);
    setMasterInternList(formData.internsList); // <-- Capture the intern list


    setTimeout(() => {
      try {
        const { finalSchedules, departmentData: newDeptData } = generateSchedules(formData);
        setScheduleOutput(finalSchedules);
        setDepartmentData(newDeptData);
      } catch (error) {
        console.error("Failed to generate schedule:", error);
      } finally {
        setIsLoading(false);
      }
    }, 50);
  };

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                Generate Schedule
              </h1>
            </div>
            <div className="flex items-center">
              <a
                href="/admin/guide"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                📖 User Guide
              </a>
            </div>
          </div>
        </header>

        <div className="mt-8">
          <ScheduleForm onSubmit={handleFormSubmit} isLoading={isLoading} />
          <ScheduleResults
            isLoading={isLoading}
            schedules={scheduleOutput}
            departmentData={departmentData}
            masterInternList={masterInternList} // <-- Pass it down
          />
        </div>
      </div>
    </main>
  );
}