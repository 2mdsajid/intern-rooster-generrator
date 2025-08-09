// app/components/PublicScheduleSearch.tsx
'use client';
import { useState, useEffect, useCallback, useRef } from 'react';

const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric'
});

export default function PublicScheduleSearch() {
    const [searchType, setSearchType] = useState('intern');
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    // --- NEW: State for suggestions ---
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const searchRef = useRef<HTMLDivElement>(null);
    const [showSuggestions, setShowSuggestions] = useState(true);

    // --- NEW: Debounced fetch for suggestions ---
    useEffect(() => {
        if (query.length < 2) {
            setSuggestions([]);
            return;
        }

        const fetchSuggestions = async () => {
            const response = await fetch(`/api/suggestions?type=${searchType}&query=${query}`);
            const data = await response.json();
            setSuggestions(data);
        };

        // Debounce: Wait 300ms after user stops typing
        const debounceTimer = setTimeout(() => {
            fetchSuggestions();
        }, 300);

        return () => clearTimeout(debounceTimer);
    }, [query, searchType]);

    // --- NEW: Close suggestions when clicking outside ---
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setSuggestions([]);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const performSearch = async (searchQuery: string) => {
        if (!searchQuery) return;
        setIsLoading(true);
        setResults([]);
        setSearched(true);
        setSuggestions([]); // Hide suggestions
        setShowSuggestions(false); // --- HIDE suggestions after search ---

        const response = await fetch(`/api/search/${searchType}?name=${searchQuery}`);
        const data = await response.json();

        setResults(data);
        setIsLoading(false);
    }

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        performSearch(query);
    };

    const handleSuggestionClick = (suggestion: string) => {
        setQuery(suggestion);
        performSearch(suggestion);
    };

    const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        setShowSuggestions(true); // Allow suggestions to show again
        setSearched(false); // Reset searched state
    };



    return (
        <div className="my-10 p-8 bg-white rounded-xl shadow-lg border border-gray-200">
            <form onSubmit={handleFormSubmit} className="flex flex-col sm:flex-row gap-4">
                <div className="flex-grow relative"> {/* --- Added relative positioning --- */}
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={`Enter ${searchType} name...`}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-lg"
                        autoComplete="off"
                    />
                    {/* --- NEW: Suggestions Dropdown --- */}
                    {suggestions.length > 0 && (
                        <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-md mt-1 shadow-lg max-h-60 overflow-y-auto">
                            {suggestions.map((suggestion, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleSuggestionClick(suggestion)}
                                    className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-gray-800"
                                >
                                    {suggestion}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="flex gap-2">
                    <select
                        value={searchType}
                        onChange={(e) => {
                            setSearchType(e.target.value);
                            setQuery(''); // Clear query on type change
                            setSuggestions([]);
                        }}
                        className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    >
                        <option value="intern">By Intern</option>
                        <option value="department">By Department</option>
                    </select>
                    <button type="submit" disabled={isLoading} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400">
                        {isLoading ? 'Searching...' : 'Search'}
                    </button>
                </div>
            </form>

            <div className="mt-8">
                {isLoading && <p className="text-center text-gray-600">Loading results...</p>}
                {!isLoading && searched && results.length === 0 && (
                    <p className="text-center text-gray-500">No results found for your query.</p>
                )}
                {results.length > 0 && searchType === 'intern' && (
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">Duties for <span className="text-blue-600">{results[0].intern.name}</span></h3>
                        <ul className="mt-4 divide-y divide-gray-200 border rounded-lg">
                            {results.map(duty => (
                                <li key={duty.id} className="py-4 px-4 grid grid-cols-3 gap-4 items-center hover:bg-gray-50">
                                    <span className="font-mono text-gray-700">{formatDate(duty.startDate)} to {formatDate(duty.endDate)}</span>
                                    <span className="font-semibold text-gray-900">{duty.subunit.department.name}</span>
                                    <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-md justify-self-start">{duty.subunit.name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {results.length > 0 && searchType === 'department' && (
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">Schedule for <span className="text-blue-600">{query}</span></h3>
                        <ul className="mt-4 divide-y divide-gray-200 border rounded-lg">
                            {results.map(duty => (
                                <li key={duty.id} className="py-4 px-4 grid grid-cols-3 gap-4 items-center hover:bg-gray-50">
                                    <span className="font-mono text-gray-700">{formatDate(duty.startDate)} to {formatDate(duty.endDate)}</span>
                                    <span className="font-semibold text-gray-900">{duty.intern.name}</span>
                                    <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-md justify-self-start">{duty.subunit.name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}