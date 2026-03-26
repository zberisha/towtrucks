import React, { useState, useEffect } from "react";
import { Button } from "./ui/button.jsx";
import { ModeToggle } from "./ui/mode-toggle.jsx";
import { TowTruckIcon } from "@/components/icons/TowTruckIcon";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => localStorage.getItem("theme") === "dark");

  const { userId, isAdmin } = useAuth();
  const isLoggedIn = Boolean(userId);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const navLinkClass =
    "inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-orange-50 hover:text-orange-700 dark:hover:bg-orange-950 dark:hover:text-orange-400";

  const mobileLinkClass =
    "block rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-orange-50 hover:text-orange-700 dark:hover:bg-orange-950 dark:hover:text-orange-400";

  return (
    <nav className="bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-100 shadow-sm border-b border-orange-100 dark:border-orange-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="/" className="flex items-center gap-2.5 text-xl font-bold tracking-tight">
              <TowTruckIcon className="h-9 w-9" />
              <span className="hidden sm:inline font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-orange-600 to-orange-500 dark:from-orange-400 dark:via-orange-500 dark:to-red-500">
                Karrotrec
              </span>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            {isLoggedIn ? (
              <>
                <a href="/" className={navLinkClass}>Home</a>
                <a href={`/list/${userId}`} className={navLinkClass}>List</a>
                <a href="/add" className={navLinkClass}>Add</a>
                {isAdmin && (
                  <a
                    href="/admin"
                    className="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-semibold transition-colors bg-orange-100 text-orange-800 hover:bg-orange-200 dark:bg-orange-950 dark:text-orange-300 dark:hover:bg-orange-900"
                  >
                    Admin
                  </a>
                )}
                <a href="/logout" className={navLinkClass}>Logout</a>
                <div className="ml-2">
                  <ModeToggle isDark={isDark} toggleTheme={toggleTheme} />
                </div>
              </>
            ) : (
              <>
                <a href="/" className={navLinkClass}>Home</a>
                <a href="/login" className={navLinkClass}>Login</a>
                <a href="/register" className={navLinkClass}>Register</a>
                <a href="/add" className={navLinkClass}>Add</a>
                <div className="ml-2">
                  <ModeToggle isDark={isDark} toggleTheme={toggleTheme} />
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-3 md:hidden">
            <ModeToggle isDark={isDark} toggleTheme={toggleTheme} />
            <Button
              onClick={toggleMobileMenu}
              variant="ghost"
              size="icon"
              className="hover:bg-orange-50 dark:hover:bg-orange-950"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-neutral-950 border-t border-orange-100 dark:border-orange-900/30">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {isLoggedIn ? (
              <>
                <a href="/" className={mobileLinkClass}>Home</a>
                <a href={`/list/${userId}`} className={mobileLinkClass}>List</a>
                <a href="/add" className={mobileLinkClass}>Add</a>
                {isAdmin && (
                  <a
                    href="/admin"
                    className="block rounded-md px-3 py-2 text-base font-semibold transition-colors bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300"
                  >
                    Admin
                  </a>
                )}
                <a href="/logout" className={mobileLinkClass}>Logout</a>
              </>
            ) : (
              <>
                <a href="/" className={mobileLinkClass}>Home</a>
                <a href="/login" className={mobileLinkClass}>Login</a>
                <a href="/register" className={mobileLinkClass}>Register</a>
                <a href="/add" className={mobileLinkClass}>Add</a>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
