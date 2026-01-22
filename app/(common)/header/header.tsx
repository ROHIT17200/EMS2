'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  UserButton,
  SignedIn,
  SignedOut,
  useClerk,
} from "@clerk/nextjs";

import { Moon, Sun, Menu, X } from 'lucide-react';

export default function Header() {
  const { openSignIn } = useClerk();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <>
      
      <style jsx global>{`
        body {
          --bg-primary: #0f172a;
          --bg-secondary: #1e293b;
          --bg-tertiary: #2563eb;
          --text-primary: #f1f5f9;
          --text-secondary: #cbd5e1;
          --text-tertiary: #94a3b8;
          --border-color: #334155;
          --shadow: rgba(0, 0, 0, 0.3);
          --card-bg: #1e293b;
          --header-bg: rgba(15, 23, 42, 0.95);
          transition: background-color 0.3s, color 0.3s;
        }
        /* Dark theme utility classes */
        .bg-primary { background-color: var(--bg-primary); }
        .bg-secondary { background-color: var(--bg-secondary); }
        .bg-card { background-color: var(--card-bg); }
        .text-primary { color: var(--text-primary); }
        .text-secondary { color: var(--text-secondary); }
        .text-tertiary { color: var(--text-tertiary); }
        .border-custom { border-color: var(--border-color); }
      `}</style>

      <header
        className="sticky top-0 z-50 shadow-md backdrop-blur-sm transition-all duration-300"
        style={{
          backgroundColor: '#0F172A',
          borderBottom: '1px solid rgba(51, 65, 85, 0.5)'
        }}
      >

        <div className="max-w-7xl mx-auto px-1">
          <nav className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center">
              <div
                className="text-3xl font-bold"
                style={{ color: '#60a5fa' }}
              >
                RD<span className="text-amber-500">COMPANY</span>
              </div>
            </Link>
            
            <div className="hidden md:flex items-center gap-2">
              <Link
                href="/"
                className="px-6 py-2 text-white rounded-full font-semibold transform hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden group"
                style={{ backgroundColor: '#2563eb' }}
              >
                <span className="relative z-10">Home</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
              </Link>

              <Link
                href="/management"
                className="px-6 py-2 text-white rounded-full font-semibold transform hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden group"
                style={{ backgroundColor: '#2563eb' }}
              >
                <span className="relative z-10">Management</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
              </Link>

              {/* Auth Section */}
              <SignedIn>
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      userButtonAvatarBox:
                        "w-9 h-9 rounded-full ring-2 ring-blue-500",
                      userButtonTrigger:
                        "transition-transform duration-300 hover:-translate-y-0.5",
                    },
                  }}
                />
              </SignedIn>

              <SignedOut>
                <button
                  onClick={() => openSignIn()}
                  className="px-6 py-2 text-white rounded-full font-semibold transform hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden group"
                  style={{ backgroundColor: "#2563eb" }}
                >
                  <span className="relative z-10">Sign In</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                </button>
              </SignedOut>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden"
              style={{ color: '#e5e7eb' }}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </nav>
          
          {mobileMenuOpen && (
            <div className="md:hidden py-4 flex flex-col gap-4">
              {/* Mobile Auth */}
              <SignedIn>
                <div className="flex justify-center py-2">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </SignedIn>

              <SignedOut>
                <button
                  onClick={() => openSignIn()}
                  className="px-6 py-2 bg-blue-700 text-white rounded-full font-semibold text-center"
                >
                  Sign In
                </button>
              </SignedOut>

              <Link
                href="/"
                className="px-6 py-2 bg-blue-700 text-white rounded-full font-semibold text-center"
              >
                Home
              </Link>
              <Link
                href="/management"
                className="px-6 py-2 bg-blue-700 text-white rounded-full font-semibold text-center"
              >
                Management
              </Link>

              {/* Mobile theme toggle - decorative */}
              <button
                className="w-9 h-9 mx-auto rounded-full border-2 flex items-center justify-center transition-all"
                style={{
                  borderColor: '#ffffff',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                }}
              >
                <Moon className="w-5 h-5 text-white" />
              </button>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
