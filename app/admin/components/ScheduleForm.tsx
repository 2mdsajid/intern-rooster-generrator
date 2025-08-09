// app/components/ScheduleForm.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { SCHEDULE_DATA } from '../../lib/data';

// Define types for props
interface ScheduleFormProps {
    onSubmit: (formData: any) => void;
    isLoading: boolean;
}

export default function ScheduleForm({ onSubmit, isLoading }: ScheduleFormProps) {
    const [country, setCountry] = useState<'nepali' | 'indian' | 'saarc'>('nepali');
    const [departments, setDepartments] = useState<string[]>([]);
    const [startDepartment, setStartDepartment] = useState('');
    const [interns, setInterns] = useState('');
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]); // YYYY-MM-DD format

    // Effect to update departments when country changes
    useEffect(() => {
        const countryData = SCHEDULE_DATA[country];
        const deptNames = countryData.departments.map(d => d.name);
        setDepartments(deptNames);
        if (deptNames.length > 0) {
            setStartDepartment(deptNames[0]); // Default to the first department
        }
    }, [country]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const internsList = interns.split('\n').map(name => name.trim()).filter(name => name);
        onSubmit({
            countryKey: country,
            internsList,
            startingDate: new Date(startDate),
            startDepartmentName: startDepartment,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="p-8 bg-white rounded-xl shadow-lg space-y-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-center text-gray-800">Intern Schedule Generator</h2>

            {/* Country and Department Selection */}
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
            </div>

            {/* Interns Input */}
            <div>
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

            {/* Start Date */}
            <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">First Rotation Start Date</label>
                <input type="date" id="startDate" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" required />
            </div>

            {/* Submit Button */}
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