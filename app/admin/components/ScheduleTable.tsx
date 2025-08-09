'use client';
import DroppableCell from './DroppableCell';
import InternPill from './InternPill';
import { useState } from 'react';
import type { CompleteSchedule } from '@/app/lib/types';

interface EditableTableProps {
  scheduleData: CompleteSchedule;
  subunits: string[];
  masterInternList: string[];
  onInternMove: (internId: string, fromCellId: string, toCellId: string) => void;
  onInternRemove: (internId: string, fromCellId: string) => void;
  onInternAdd: (internName: string, toCellId: string) => void;
}

export default function ScheduleTable({
  scheduleData,
  subunits,
  masterInternList,
  onInternMove,
  onInternRemove,
  onInternAdd,
}: EditableTableProps) {
  const weekRanges = Object.keys(scheduleData);

  const AddInternDropdown = ({ cellId }: { cellId: string }) => {
    const [selectedIntern, setSelectedIntern] = useState('');

    const handleAdd = () => {
      if (selectedIntern) {
        onInternAdd(selectedIntern, cellId);
        setSelectedIntern('');
      }
    };

    return (
      <div className="flex items-center gap-1 mt-1">
        <select
          value={selectedIntern}
          onChange={(e) => setSelectedIntern(e.target.value)}
          className="text-xs border-gray-300 rounded w-full text-gray-900"
        >
          <option value="">+ Add Intern</option>
          {masterInternList.map((intern) => (
            <option key={intern} value={intern}>
              {intern}
            </option>
          ))}
        </select>
        <button
          onClick={handleAdd}
          className="text-xs bg-gray-200 rounded px-1 hover:bg-gray-300"
        >
          +
        </button>
      </div>
    );
  };

  return (
    <table className="min-w-full bg-white">
      <thead className="bg-gray-100 border-b-2 border-gray-300">
        <tr>
          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
            Wk
          </th>
          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
            Week
          </th>
          {subunits.map((subunit) => (
            <th
              key={subunit}
              className="px-4 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider"
            >
              {subunit}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {weekRanges.map((week, index) => (
          <tr key={week}>
            <td className="px-4 py-4 whitespace-nowrap font-semibold text-sm text-gray-700">
              {index + 1}
            </td>
            <td className="px-4 py-4 font-mono text-sm text-gray-700">
              {week}
            </td>
            {subunits.map((subunit) => {
              const cellId = `${week}-${subunit}`;
              const internsInCell = scheduleData[week]?.[subunit] || [];
              return (
                <DroppableCell key={cellId} id={cellId}>
                  {internsInCell.map((internName, internIndex) => {
                    const internId = `${cellId}-${internName}-${internIndex}`;
                    return (
                      <InternPill
                        key={internId}
                        id={internId}
                        name={internName}
                        cellId={cellId}
                        onRemove={() => onInternRemove(internId, cellId)}
                      />
                    );
                  })}
                  <AddInternDropdown cellId={cellId} />
                </DroppableCell>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}