'use client';

import React, { useState, useEffect } from 'react';
import { SCHEDULE_DATA, ALL_PRIORITIES } from '../../lib/data';
import EditablePriorityList from './EditablePriorityList';

interface ScheduleFormProps {
    onSubmit: (formData: any) => void;
    isLoading: boolean;
}

export default function ScheduleForm({ onSubmit, isLoading }: ScheduleFormProps) {
    const [country, setCountry] = useState<'nepali' | 'indian' | 'saarc'>('nepali');
    
    // Initialize all states with valid defaults derived from the initial country ('nepali')
    const [departments, setDepartments] = useState(() => SCHEDULE_DATA.nepali.departments.map(d => d.name));
    const [startDepartment, setStartDepartment] = useState(() => SCHEDULE_DATA.nepali.departments[0].name);
    const [interns, setInterns] = useState('');
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [editablePriorities, setEditablePriorities] = useState<{ [key: string]: string[] }>(
        () => JSON.parse(JSON.stringify(ALL_PRIORITIES.nepali))
    );

    // This effect correctly handles changing the entire context when the country selection changes.
    useEffect(() => {
        const countryData = SCHEDULE_DATA[country];
        const deptNames = countryData.departments.map(d => d.name);
        
        setDepartments(deptNames);
        // Set the start department to the first in the new list
        if (deptNames.length > 0) {
            setStartDepartment(deptNames[0]);
        }
        // Reset the priorities to the defaults for the newly selected country
        setEditablePriorities(JSON.parse(JSON.stringify(ALL_PRIORITIES[country])));
    }, [country]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const internsList = interns.split('\n').map(name => name.trim()).filter(name => name);
        
        if (Object.keys(editablePriorities).length === 0) {
            // This is a safeguard, though the new initialization should prevent this.
            alert("Priorities have not loaded correctly. Please change the curriculum and try again.");
            return;
        }

        onSubmit({
            countryKey: country,
            internsList,
            startingDate: new Date(startDate),
            startDepartmentName: startDepartment,
            customPriorities: editablePriorities, // Ensure custom priorities are passed
        });
    };

    // Helper to update a specific priority list when it's reordered
    const handlePriorityChange = (newOrder: string[]) => {
        const priorityKey = `${startDepartment}_PRIORITY`;
        setEditablePriorities(prev => ({
            ...prev,
            [priorityKey]: newOrder,
        }));
    };

    // Reliably derive the current list to be displayed and edited
    const currentPriorityKey = `${startDepartment}_PRIORITY`;
    const currentPriorityList = editablePriorities[currentPriorityKey] || [];

    return (
        <form onSubmit={handleSubmit} className="p-8 bg-white rounded-xl shadow-lg space-y-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-center text-gray-800">Intern Schedule Generator</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Curriculum</label>
                    <select id="country" value={country} onChange={e => setCountry(e.target.value as any)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900">
                        <option value="nepali">Nepali</option>
                        <option value="indian">Indian</option>
                        <option value="saarc">SAARC</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="startDepartment" className="block text-sm font-medium text-gray-700 mb-1">Starting Department</label>
                    <select id="startDepartment" value={startDepartment} onChange={e => setStartDepartment(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" required>
                        {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                    </select>
                </div>

                {startDepartment && (
                <div className="p-4 bg-slate-50 rounded-lg border col-span-2">
                    <h3 className="text-lg font-bold text-slate-700 mb-2">Adjust Posting Priority for {startDepartment}</h3>
                    <p className="text-sm text-slate-500 mb-4">Drag and drop the subunits to reorder them. The schedule will be generated based on this new order.</p>
                    {currentPriorityList.length > 0 ? (
                        <EditablePriorityList
                            items={currentPriorityList}
                            setItems={handlePriorityChange}
                        />
                    ) : (
                        <p className="text-sm text-slate-500">No priority list available for this department.</p>
                    )}
                </div>
            )}
                
                <div className="md:col-span-2">
                    <label htmlFor="interns" className="block text-sm font-medium text-gray-700 mb-1">Intern Names (one per line)</label>
                    <textarea
                        id="interns"
                        rows={8}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-gray-900"
                        placeholder="CHITRA LAL&#10;LAXMI&#10;MEGHA&#10;RAJSHREE..."
                        value={interns}
                        onChange={e => setInterns(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">First Rotation Start Date</label>
                    <input type="date" id="startDate" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" required />
                </div>
            </div>



            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
                {isLoading ? 'Generating...' : 'Generate Schedule'}
            </button>
        </form>
    );
}