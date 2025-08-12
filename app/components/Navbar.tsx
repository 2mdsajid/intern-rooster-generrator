// app/components/Navbar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // --- UPDATED: Unified color scheme logic ---
  const navLinkClasses = (path: string) => {
    const isActive = pathname === path;
    return `block md:inline-block px-3 py-2 rounded-md text-base md:text-sm font-medium transition-colors ${
      isActive
        ? 'bg-blue-100 text-blue-700' // Active link color for both mobile and desktop
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900' // Inactive link color
    }`;
  };

  return (
    // --- UPDATED: Solid white background for a cleaner look ---
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side: Title */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-slate-800" onClick={() => setIsOpen(false)}>
              Manipal Intern Roster
            </Link>
          </div>

          {/* Right side: Desktop Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/" className={navLinkClasses('/')}>
                Home
              </Link>
              <Link href="/admin" className={navLinkClasses('/admin')}>
                Admin
              </Link>
              <Link href="/about" className={navLinkClasses('/about')}>
                About
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-slate-100 inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-200 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, with updated light theme */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-200" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className={navLinkClasses('/')} onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link href="/admin" className={navLinkClasses('/admin')} onClick={() => setIsOpen(false)}>
              Admin
            </Link>
            <Link href="/about" className={navLinkClasses('/about')} onClick={() => setIsOpen(false)}>
              About
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}