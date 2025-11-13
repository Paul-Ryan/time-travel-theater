"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="bg-black/5 dark:bg-white/5 border-b border-black/10 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Title */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold">Time Travel Movie Theater</h1>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                href="/movies" 
                className="text-foreground hover:text-foreground/80 transition-colors"
              >
                Now Playing
              </Link>
              <Link 
                href="/dashboard" 
                className="text-foreground hover:text-foreground/80 transition-colors"
              >
                Dashboard
              </Link>
            </nav>

            {/* Login Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLoginDropdownOpen(!isLoginDropdownOpen)}
                className="bg-foreground text-background hover:bg-foreground/90 transition-colors px-4 py-2 rounded-md font-medium flex items-center gap-2"
              >
                Account
                <svg
                  className={`w-4 h-4 transition-transform ${isLoginDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isLoginDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-background border border-black/10 dark:border-white/10 rounded-md shadow-lg z-10">
                  <div className="py-1">
                    <button className="block w-full text-left px-4 py-2 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                      Sign In
                    </button>
                    <button className="block w-full text-left px-4 py-2 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                      Create Account
                    </button>
                    <div className="border-t border-black/10 dark:border-white/10 my-1"></div>
                    <button className="block w-full text-left px-4 py-2 hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-black/60 dark:text-white/60">
                      My Tickets
                    </button>
                    <button className="block w-full text-left px-4 py-2 hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-black/60 dark:text-white/60">
                      Settings
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden py-4 border-t border-black/10 dark:border-white/10">
            <nav className="flex space-x-6">
              <Link 
                href="/movies" 
                className="text-foreground hover:text-foreground/80 transition-colors"
              >
                Now Playing
              </Link>
              <Link 
                href="/dashboard" 
                className="text-foreground hover:text-foreground/80 transition-colors"
              >
                Dashboard
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Journey Through Time
          </h2>
          <p className="text-xl text-black/70 dark:text-white/70 mb-8 max-w-3xl mx-auto">
            Experience the magic of cinema across different eras. From classic time travel adventures to modern temporal thrillers, 
            discover stories that transcend the boundaries of time itself.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/movies"
              className="bg-foreground text-background hover:bg-foreground/90 transition-colors px-8 py-3 rounded-lg font-medium"
            >
              View Now Playing
            </Link>
            <button className="border border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors px-8 py-3 rounded-lg font-medium">
              Book Your Journey
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-black/5 dark:bg-white/5 rounded-lg p-6 border border-black/10 dark:border-white/10">
            <div className="w-12 h-12 bg-foreground/10 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">🎬</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Curated Collection</h3>
            <p className="text-black/70 dark:text-white/70">
              Handpicked selection of the best time travel films from every decade.
            </p>
          </div>
          
          <div className="bg-black/5 dark:bg-white/5 rounded-lg p-6 border border-black/10 dark:border-white/10">
            <div className="w-12 h-12 bg-foreground/10 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">🕰️</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Immersive Experience</h3>
            <p className="text-black/70 dark:text-white/70">
              State-of-the-art projection and sound systems for the ultimate viewing experience.
            </p>
          </div>
          
          <div className="bg-black/5 dark:bg-white/5 rounded-lg p-6 border border-black/10 dark:border-white/10">
            <div className="w-12 h-12 bg-foreground/10 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">🎟️</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
            <p className="text-black/70 dark:text-white/70">
              Simple online booking system with reserved seating and digital tickets.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-black/5 dark:bg-white/5 rounded-lg p-8 text-center border border-black/10 dark:border-white/10">
          <h3 className="text-2xl font-bold mb-4">Ready for Your Next Adventure?</h3>
          <p className="text-black/70 dark:text-white/70 mb-6">
            Join thousands of movie lovers who have discovered the magic of time travel cinema.
          </p>
          <Link 
            href="/movies"
            className="inline-block bg-foreground text-background hover:bg-foreground/90 transition-colors px-8 py-3 rounded-lg font-medium"
          >
            Explore Movies
          </Link>
        </div>
      </main>
    </div>
  );
}
