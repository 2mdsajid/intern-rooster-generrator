'use client';
import { useState } from 'react';
import { ChevronRight, Users, Calendar, Download, Database, LucideDraftingCompass, Search, CheckCircle, ArrowRight, BookOpen, Lightbulb, AlertCircle } from 'lucide-react';

export default function AdminGuidePage() {
    const [activeStep, setActiveStep] = useState(1);

    const steps = [
        {
            id: 1,
            title: "Getting Started",
            icon: BookOpen,
            description: "Learn the basics of the Intern Duty Scheduler",
            content: {
                overview: "Welcome to the Intern Duty Scheduler! This powerful tool helps medical institutions create, manage, and distribute complex rotational duty schedules for medical interns.",
                keyFeatures: [
                    "Automated schedule generation based on curriculum templates",
                    "Interactive drag-and-drop editing interface",
                    "Database persistence for permanent records",
                    "Excel export functionality",
                    "Public search portal for easy access"
                ]
            }
        },
        {
            id: 2,
            title: "Creating Schedules",
            icon: Calendar,
            description: "Step-by-step guide to generate new schedules",
            content: {
                overview: "Creating a new schedule involves selecting your curriculum, configuring priorities, and adding intern names.",
                steps: [
                    "Select your curriculum (Nepali, Indian, or SAARC)",
                    "Choose the starting department for rotations",
                    "Adjust posting priorities using drag-and-drop",
                    "Enter intern names (one per line)",
                    "Set the first rotation start date",
                    "Click 'Generate Schedule' to create your rotations"
                ]
            }
        },
        {
            id: 3,
            title: "Priority Management",
            icon: LucideDraftingCompass,
            description: "Customize department posting priorities",
            content: {
                overview: "Priority management allows you to customize the order in which interns are assigned to different subunits within each department.",
                features: [
                    "Drag and drop subunits to reorder priorities",
                    "Changes apply immediately to schedule generation",
                    "Each department has its own priority list",
                    "Mobile-friendly touch interface",
                    "Visual feedback during reordering"
                ]
            }
        },
        {
            id: 4,
            title: "Editing Schedules",
            icon: Users,
            description: "Modify generated schedules with drag-and-drop",
            content: {
                overview: "After generating a schedule, you can make manual adjustments using the interactive editing interface.",
                capabilities: [
                    "Drag interns between different dates and subunits",
                    "Add interns to specific duty cells from dropdown",
                    "Remove interns from any duty with one click",
                    "Changes are reflected immediately",
                    "All edits are preserved when saving"
                ]
            }
        },
        {
            id: 5,
            title: "Saving & Exporting",
            icon: Database,
            description: "Preserve your work and share schedules",
            content: {
                overview: "Once you're satisfied with your schedule, you can save it to the database and export it for distribution.",
                options: [
                    "Save to Database: Permanent storage with search capability",
                    "Download Excel: Multi-sheet file with each department",
                    "Idempotent saving prevents duplicate entries",
                    "Saved schedules appear in public search portal",
                    "Excel files are formatted for easy printing"
                ]
            }
        },
        {
            id: 6,
            title: "Public Access",
            icon: Search,
            description: "How others can access the schedules",
            content: {
                overview: "Saved schedules become available through the public search portal for easy access by interns and staff.",
                features: [
                    "Search by intern name to see complete duty roster",
                    "Search by department to view all scheduled duties",
                    "Autocomplete suggestions for faster searching",
                    "Clean, user-friendly interface",
                    "No login required for viewing schedules"
                ]
            }
        }
    ];

    const currentStep = steps.find(step => step.id === activeStep);

    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Admin Guide</h1>
                        </div>
                        <div className="flex items-center">
                            <a
                                href="/admin"
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                            >
                                <ArrowRight size={16} />
                                Go to Admin Panel
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar Navigation */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Guide Sections</h3>
                            <nav className="space-y-2">
                                {steps.map((step) => {
                                    const Icon = step.icon;
                                    return (
                                        <button
                                            key={step.id}
                                            onClick={() => setActiveStep(step.id)}
                                            className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center gap-3 ${activeStep === step.id
                                                ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-500'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                                }`}
                                        >
                                            <Icon size={20} />
                                            <div>
                                                <div className="font-medium">{step.title}</div>
                                                <div className="text-sm opacity-75">{step.description}</div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            {/* Step Header */}
                            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8">
                                <div className="flex items-center gap-4">
                                    {currentStep && (
                                        <>
                                            <div className="bg-white/20 p-3 rounded-lg">
                                                <currentStep.icon size={32} />
                                            </div>
                                            <div>
                                                <div className="text-sm opacity-90">Step {currentStep.id} of {steps.length}</div>
                                                <h2 className="text-3xl font-bold">{currentStep.title}</h2>
                                                <p className="text-lg opacity-90 mt-1">{currentStep.description}</p>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Step Content */}
                            <div className="p-8">
                                {currentStep && (
                                    <div className="space-y-8">
                                        {/* Overview */}
                                        <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
                                            <div className="flex items-start gap-3">
                                                <Lightbulb className="text-blue-600 mt-1" size={20} />
                                                <div>
                                                    <h3 className="text-lg font-semibold text-blue-900 mb-2">Overview</h3>
                                                    <p className="text-blue-800">{currentStep.content.overview}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Key Features or Steps */}
                                        {currentStep.content.keyFeatures && (
                                            <div>
                                                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                                    <CheckCircle className="text-green-600" size={24} />
                                                    Key Features
                                                </h3>
                                                <div className="grid gap-4">
                                                    {currentStep.content.keyFeatures.map((feature, index) => (
                                                        <div key={index} className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                                                            <CheckCircle className="text-green-600 mt-0.5" size={16} />
                                                            <span className="text-green-800">{feature}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {currentStep.content.steps && (
                                            <div>
                                                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                                    <Calendar className="text-blue-600" size={24} />
                                                    Step-by-Step Process
                                                </h3>
                                                <div className="space-y-4">
                                                    {currentStep.content.steps.map((step, index) => (
                                                        <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                                            <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                                                                {index + 1}
                                                            </div>
                                                            <span className="text-gray-800 pt-1">{step}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {currentStep.content.features && (
                                            <div>
                                                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                                    <LucideDraftingCompass className="text-purple-600" size={24} />
                                                    Features & Capabilities
                                                </h3>
                                                <div className="grid gap-4">
                                                    {currentStep.content.features.map((feature, index) => (
                                                        <div key={index} className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                                                            <ChevronRight className="text-purple-600 mt-0.5" size={16} />
                                                            <span className="text-purple-800">{feature}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {currentStep.content.capabilities && (
                                            <div>
                                                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                                    <Users className="text-indigo-600" size={24} />
                                                    Editing Capabilities
                                                </h3>
                                                <div className="grid gap-4">
                                                    {currentStep.content.capabilities.map((capability, index) => (
                                                        <div key={index} className="flex items-start gap-3 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                                                            <ChevronRight className="text-indigo-600 mt-0.5" size={16} />
                                                            <span className="text-indigo-800">{capability}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {currentStep.content.options && (
                                            <div>
                                                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                                    <Database className="text-green-600" size={24} />
                                                    Available Options
                                                </h3>
                                                <div className="grid gap-4">
                                                    {currentStep.content.options.map((option, index) => (
                                                        <div key={index} className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                                                            <ChevronRight className="text-green-600 mt-0.5" size={16} />
                                                            <span className="text-green-800">{option}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Tips Section */}
                                        {activeStep === 2 && (
                                            <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-lg">
                                                <div className="flex items-start gap-3">
                                                    <AlertCircle className="text-amber-600 mt-1" size={20} />
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-amber-900 mb-2">Pro Tips</h3>
                                                        <ul className="text-amber-800 space-y-1">
                                                            <li>• Make sure intern names are spelled correctly - they'll appear exactly as entered</li>
                                                            <li>• Adjust priorities before generating to get optimal initial assignments</li>
                                                            <li>• You can always edit the schedule after generation using drag-and-drop</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {activeStep === 4 && (
                                            <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-lg">
                                                <div className="flex items-start gap-3">
                                                    <AlertCircle className="text-amber-600 mt-1" size={20} />
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-amber-900 mb-2">Editing Tips</h3>
                                                        <ul className="text-amber-800 space-y-1">
                                                            <li>• Drag from the intern's name, not the remove button</li>
                                                            <li>• Drop zones are highlighted when dragging</li>
                                                            <li>• Use the dropdown to add interns who aren't currently assigned</li>
                                                            <li>• Changes are saved automatically when you save to database</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Navigation Footer */}
                            <div className="bg-gray-50 px-8 py-6 flex justify-between items-center border-t">
                                <button
                                    onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
                                    disabled={activeStep === 1}
                                    className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronRight size={16} className="rotate-180" />
                                    Previous
                                </button>

                                <div className="flex items-center gap-2">
                                    {steps.map((step) => (
                                        <div
                                            key={step.id}
                                            className={`w-3 h-3 rounded-full ${step.id === activeStep ? 'bg-blue-600' : 'bg-gray-300'
                                                }`}
                                        />
                                    ))}
                                </div>

                                <button
                                    onClick={() => setActiveStep(Math.min(steps.length, activeStep + 1))}
                                    disabled={activeStep === steps.length}
                                    className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Next
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}