// app/about/page.tsx
export default function AboutPage() {
    return (
      <main className="min-h-screen bg-slate-50 p-8">
        <div className="max-w-4xl mx-auto bg-white p-10 rounded-lg shadow-md">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            About This Project
          </h1>
          <div className="prose lg:prose-xl text-slate-700">
            <p>
              The <strong>Manipal Intern Roster</strong> is a comprehensive scheduling tool designed to simplify the complex process of managing medical internship rotations.
            </p>
            <p>
              It was built to automate the generation of duty schedules based on various curriculums, while providing a powerful and intuitive interface for administrators to make manual adjustments.
            </p>
            <h3 className="text-slate-800">Core Features:</h3>
            <ul>
              <li>Automated, template-based schedule generation.</li>
              <li>An interactive drag-and-drop grid for easy manual edits.</li>
              <li>Database persistence to securely store and retrieve schedules.</li>
              <li>A public-facing search portal with real-time suggestions.</li>
              <li>Excel export functionality for offline use and record-keeping.</li>
            </ul>
            <p>
              This project leverages a modern tech stack including Next.js, TypeScript, Prisma, and Tailwind CSS to deliver a fast, reliable, and user-friendly experience.
            </p>
          </div>
        </div>
      </main>
    );
  }