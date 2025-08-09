# Intern Duty Scheduler 🩺

An advanced, web-based application for generating, managing, and viewing complex rotational duty schedules for medical interns. This tool provides a powerful admin interface for creating and manually adjusting schedules with a drag-and-drop interface, and a public-facing portal for easy searching.

-----

## **Features**

  * **Automated Schedule Generation**: Creates complex, multi-department rotational schedules based on predefined templates (e.g., Nepali, Indian, SAARC curriculums).
  * **Interactive Admin Grid**: Admins can manually adjust the generated schedule with an intuitive drag-and-drop interface.
      * Move interns between different dates and subunits.
      * Add interns to a specific duty cell from a master list.
      * Remove interns from any duty with a single click.
  * **Database Persistence**: Schedules can be saved to a database using Prisma ORM, preventing data loss and enabling permanent records. The save logic is idempotent, preventing duplicate entries.
  * **Public Search Portal**: A clean, user-friendly homepage where anyone can search the saved schedules.
      * **Search by Intern**: View the complete duty roster for a specific intern across all departments.
      * **Search by Department**: See all scheduled duties for an entire department.
  * **Autocomplete Suggestions**: The search functionality is enhanced with real-time suggestions fetched from the database, making it faster to find interns and departments.
  * **Excel Export**: Download any generated or edited schedule as a multi-sheet `.xlsx` file, with each department on its own sheet.

-----

## **Technology Stack**

  * **Framework**: [Next.js](https://nextjs.org/) (App Router)
  * **Language**: [TypeScript](https://www.typescriptlang.org/)
  * **Styling**: [Tailwind CSS](https://tailwindcss.com/)
  * **Database ORM**: [Prisma](https://www.prisma.io/)
  * **Database**: [SQLite](https://www.sqlite.org/index.html) (for simple, file-based setup)
  * **Drag & Drop**: [dnd-kit](https://dndkit.com/)
  * **Excel Generation**: [SheetJS (xlsx)](https://sheetjs.com/)

-----

## **Project Structure**

The project is organized into public and admin sections for clear separation of concerns.

```
/
├── app/
│   ├── (public)/                 # Public-facing pages
│   │   ├── components/
│   │   │   └── PublicScheduleSearch.tsx
│   │   └── page.tsx              # The main homepage (Search)
│   ├── admin/                    # Admin-only pages
│   │   ├── components/           # Admin-specific components
│   │   └── page.tsx              # Admin dashboard (Generator)
│   ├── api/                      # API routes for saving and searching
│   └── lib/                      # Core logic, data, and utilities
├── prisma/
│   ├── schema.prisma             # Database schema definition
│   └── migrations/               # Database migration history
└── README.md
```

-----

## **Getting Started**

Follow these steps to get the project running on your local machine.

### **1. Prerequisites**

  * [Node.js](https://nodejs.org/en/) (v18.0 or later)
  * npm or yarn

### **2. Installation**

First, clone the repository and navigate into the project directory.

```bash
git clone <your-repository-url>
cd intern-scheduler
```

Next, install the project dependencies.

```bash
npm install
```

### **3. Database Setup**

This project uses Prisma with a SQLite database, which requires no external database server.

1.  **Check the Schema**: Ensure the `prisma/schema.prisma` file accurately defines your data models (`Intern`, `Department`, `Duty`, etc.).

2.  **Run the Migration**: This command will create the SQLite database file (`dev.db`) and set up all the necessary tables based on your schema.

    ```bash
    npx prisma migrate dev
    ```

    If you ever need to start over with a clean database during development, you can run:

    ```bash
    npx prisma migrate reset
    ```

3.  **Generate the Prisma Client**: Ensure your Prisma Client is up-to-date with your schema. This is usually run automatically by `migrate`, but can be run manually if needed.

    ```bash
    npx prisma generate
    ```

### **4. Running the Application**

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

  * **Public Search Page**: Navigate to `http://localhost:3000/`
  * **Admin Generator Page**: Navigate to `http://localhost:3000/admin`