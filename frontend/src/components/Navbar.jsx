'use client';

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaSearch, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from './AuthContext';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/browse-extensions?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setShowSearch(false);
      setIsMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { href: "/browse-extensions", label: "All Extensions" },
    { href: "/features", label: "Features" },
    { href: "/about-us", label: "About" },
    { href: "/help", label: "Help" },
  ];

  return (
    <div className="w-full z-10 fixed top-0 left-0 right-0">
      <nav className="bg-gradient-to-r from-black via-indigo-900 to-blue-900 text-white shadow-lg bg-opacity-95 backdrop-blur-md border-b border-white/10 animate-fade-in">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between w-full">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <img
                src="/whiteLogo.png"
                alt="ExtendEase Logo"
                className="h-8 w-auto"
              />
              <span className="hidden sm:inline font-semibold text-white text-lg tracking-tight drop-shadow-lg">ExtendEase</span>
            </Link>

            {/* Navigation Links (centered and grow) */}
            <div className="hidden md:flex flex-1 items-center justify-center space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="hover:text-gray-300 transition-colors duration-200 text-xs font-medium hover:scale-105 transform"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Search + Auth (right) */}
            <div className="flex items-center space-x-3">
              {/* Search Icon */}
              <div className="relative">
                <button
                  type="button"
                  className="text-white hover:text-gray-300 transition-colors duration-200 p-1 hover:scale-110 transform"
                  aria-label="Search"
                  style={{ position: 'relative', zIndex: 2 }}
                  onClick={() => {
                    setShowSearch((prev) => !prev);
                    setTimeout(() => {
                      const input = document.getElementById('navbar-search-input');
                      if (input) input.focus();
                    }, 50);
                  }}
                >
                  <FaSearch className="text-lg" />
                </button>
                {showSearch && (
                  <form onSubmit={handleSearch} className="bg-white/95 backdrop-blur-md rounded-lg shadow-lg p-2 min-w-[200px] border border-white/20 flex items-center absolute right-0 top-full mt-2 z-50">
                    <FaSearch className="text-gray-500 text-sm mr-2" />
                    <input
                      id="navbar-search-input"
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-transparent focus:outline-none text-sm text-gray-800 placeholder:text-gray-500 flex-1"
                      aria-label="Search"
                      autoFocus
                    />
                  </form>
                )}
              </div>

              {/* Auth Links */}
              {isAuthenticated ? (
                <>
                  <span className="text-xs font-medium mr-2">{user?.email} ({user?.type})</span>
                  <button
                    onClick={logout}
                    className="hover:text-gray-300 transition-colors duration-200 text-xs font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="hover:text-gray-300 transition-colors duration-200 text-xs font-medium hover:scale-105 transform"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/signup"
                    className="hover:text-gray-300 transition-colors duration-200 hover:scale-110 transform"
                    aria-label="Sign up"
                  >
                    <FaUserCircle className="text-lg" />
                  </Link>
                </>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="md:hidden p-2 rounded-md hover:bg-indigo-300/20 transition-colors duration-200 hover:scale-110 transform"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <FaTimes className="h-6 w-6" />
                ) : (
                  <FaBars className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gradient-to-b from-black via-indigo-900 to-blue-900 mt-2 bg-opacity-95 backdrop-blur-md border-b border-white/10 animate-slide-down">
                {navLinks.map((link) => (
                                  <Link
                  key={link.label}
                  href={link.href}
                  className="block px-3 py-2 rounded-md text-base font-medium hover:text-gray-300 hover:bg-indigo-300/20 transition-colors duration-200 hover:scale-105 transform"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                    {link.label}
                  </Link>
                ))}
                <button className="w-full text-left px-3 py-2 rounded-md text-base font-medium bg-gray-800/50 hover:bg-gray-700/50 transition-colors duration-200 hover:scale-105 transform">
                  Free Visual Studio
                </button>

                {/* Mobile Search */}
                <form onSubmit={handleSearch} className="px-3 py-2">
                  <div className="flex items-center bg-white/95 backdrop-blur-md rounded-full px-3 py-2 border border-white/20">
                    <FaSearch className="text-gray-500 text-sm" />
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="ml-2 bg-transparent focus:outline-none text-sm text-gray-800 placeholder:text-gray-500 flex-1"
                      aria-label="Search"
                    />
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
