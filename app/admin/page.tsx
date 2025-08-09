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
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                Admin: Schedule Generator
            </h1>
            <p className="mt-2 text-lg text-gray-600">
                Create and save new rotational schedules to the database.
            </p>
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