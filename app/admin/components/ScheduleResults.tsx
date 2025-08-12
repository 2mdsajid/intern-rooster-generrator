'use client';
import { useState, useEffect } from 'react';
import { DndContext, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import ScheduleTable from "./ScheduleTable";
import { exportSchedulesToExcel } from "../../lib/excelGenerator";
import type { AllSchedules, DepartmentData, CompleteSchedule } from '@/app/lib/types';

interface ScheduleResultsProps {
  isLoading: boolean;
  schedules: AllSchedules;
  departmentData: DepartmentData | null;
  masterInternList: string[];
}

export default function ScheduleResults({ isLoading, schedules, departmentData, masterInternList }: ScheduleResultsProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [editableSchedules, setEditableSchedules] = useState<AllSchedules>({});

  useEffect(() => {
    // Deep copy to prevent state mutation issues
    setEditableSchedules(JSON.parse(JSON.stringify(schedules)));
  }, [schedules]);

  const sensors = useSensors(useSensor(PointerSensor));

  // Main handler for when a drag operation ends
  const handleDragEnd = (event: DragEndEvent, deptName: string) => {
    const { active, over } = event;

    // Ensure we are dropping over a valid droppable area and it's not the same place
    if (over && active.data.current) {
      const fromCellId = active.data.current.cellId as string;
      const toCellId = over.id as string;
      const internId = active.id as string;

      if (fromCellId !== toCellId) {
        handleInternMove(deptName, internId, fromCellId, toCellId);
      }
    }
  };

  // Helper function to update a specific department's schedule
  const updateScheduleForDept = (deptName: string, updateFn: (schedule: CompleteSchedule) => CompleteSchedule) => {
    setEditableSchedules(prev => ({
      ...prev,
      [deptName]: updateFn(prev[deptName]),
    }));
  };

  // Logic to move an intern from one cell to another
  const handleInternMove = (deptName: string, internId: string, fromCellId: string, toCellId: string) => {
    updateScheduleForDept(deptName, currentSchedule => {
      const newSchedule = JSON.parse(JSON.stringify(currentSchedule));
      const [fromWeek, fromSubunit] = fromCellId.split('-');
      const [toWeek, toSubunit] = toCellId.split('-');
      const [, , , internName, internIndexStr] = internId.split('-');
      const internIndex = parseInt(internIndexStr, 10);

      // Add to destination
      if (!newSchedule[toWeek][toSubunit]) newSchedule[toWeek][toSubunit] = [];
      newSchedule[toWeek][toSubunit].push(internName);

      // Remove from source
      newSchedule[fromWeek][fromSubunit].splice(internIndex, 1);

      return newSchedule;
    });
  };

  // Logic to remove an intern from a cell
  const handleInternRemove = (deptName: string, internId: string, fromCellId: string) => {
    updateScheduleForDept(deptName, currentSchedule => {
      const newSchedule = JSON.parse(JSON.stringify(currentSchedule));
      const [fromWeek, fromSubunit] = fromCellId.split('-');
      const [, , , internName, internIndexStr] = internId.split('-');
      const internIndex = parseInt(internIndexStr, 10);

      newSchedule[fromWeek][fromSubunit].splice(internIndex, 1);
      return newSchedule;
    });
  };

  // Logic to add an intern to a cell from the dropdown
  const handleInternAdd = (deptName: string, internName: string, toCellId: string) => {
    updateScheduleForDept(deptName, currentSchedule => {
      const newSchedule = JSON.parse(JSON.stringify(currentSchedule));
      const [toWeek, toSubunit] = toCellId.split('-');

      if (!newSchedule[toWeek][toSubunit]) newSchedule[toWeek][toSubunit] = [];
      newSchedule[toWeek][toSubunit].push(internName);
      return newSchedule;
    });
  };

  // Handler for the Download button
  const handleDownload = () => {
    if (hasData) {
      exportSchedulesToExcel(editableSchedules, departmentData!);
    }
  };

  // Handler for the Save button
  const handleSaveToDb = async () => {
    if (!hasData) return;
    setIsSaving(true);
    setSaveMessage('');
    try {
      const response = await fetch('/api/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ schedules: editableSchedules, departmentData }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      setSaveMessage(result.message);
    } catch (error: any) {
      setSaveMessage(error.message || 'An error occurred.');
    } finally {
      setIsSaving(false);
    }
  };

  const hasData = departmentData && Object.keys(editableSchedules).length > 0;
  const departmentOrder = hasData ? Object.keys(editableSchedules) : [];

  if (isLoading) {
    return (
      <div className="text-center p-10">
        <p className="text-lg text-gray-600">Generating schedules, please wait...</p>
      </div>
    );
  }

  if (!hasData) {
    return (
      <div className="text-center p-10 mt-8 bg-gray-50 rounded-lg">
        <p className="text-gray-500">Your generated schedules will appear here.</p>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <div className="flex justify-between items-center mb-6 pb-2 border-b-2 border-blue-500">
        <h1 className="text-3xl font-extrabold text-gray-900">Complete Rotational Schedule</h1>

        {/* --- ACTION BUTTONS ARE HERE --- */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleSaveToDb}
            disabled={isSaving}
            className="bg-purple-600 text-white font-bold py-2 px-4 rounded-md hover:bg-purple-700 disabled:bg-gray-400 transition-colors flex items-center gap-2"
          >
            {isSaving ? 'Saving...' : 'Save to Database'}
          </button>

          <button
            onClick={handleDownload}
            className="bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            Download Excel
          </button>
        </div>
      </div>

      {saveMessage && <p className="text-center my-2 font-semibold text-purple-700">{saveMessage}</p>}

      {departmentData && departmentOrder.map(deptName => (
        <div key={deptName} className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{deptName}</h2>
          <DndContext sensors={sensors} onDragEnd={(e) => handleDragEnd(e, deptName)}>
            <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
              <ScheduleTable
                subunits={departmentData[deptName]}
                scheduleData={editableSchedules[deptName]}
                masterInternList={masterInternList}
                onInternMove={(internId, from, to) => handleInternMove(deptName, internId, from, to)}
                onInternRemove={(internId, from) => handleInternRemove(deptName, internId, from)}
                onInternAdd={(name, to) => handleInternAdd(deptName, name, to)}
              />
            </div>
          </DndContext>
        </div>
      ))}
    </div>
  );
}