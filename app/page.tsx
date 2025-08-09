// app/page.tsx

import PublicScheduleSearch from "./components/PublicScheduleSearch";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Internship Duty Roster 🔎
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Search for intern or department schedules.
          </p>
        </header>

        <PublicScheduleSearch />
      </div>
    </main>
  );
}