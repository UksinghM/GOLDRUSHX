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
    <div className="w-full z-50 fixed top-0 left-0 right-0 shadow-lg">
      <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white backdrop-blur-md border-b border-yellow-500/20">
        <div className="px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <img
              src="/goldLogo.png" // Replace with your jewelry logo
              alt="Logo"
              className="h-10 w-auto"
            />
            <span className="hidden sm:inline font-serif font-bold text-lg text-yellow-400 tracking-wide drop-shadow-md">
              GoldRushX
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex flex-1 justify-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-medium text-gray-100 hover:text-yellow-400 transition-colors duration-200 hover:scale-105 transform"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Search + Auth */}
          <div className="flex items-center space-x-3">
            {/* Search */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowSearch(prev => !prev);
                  setTimeout(() => {
                    const input = document.getElementById('navbar-search-input');
                    if (input) input.focus();
                  }, 50);
                }}
                className="text-gray-100 hover:text-yellow-400 transition-colors duration-200 p-1"
              >
                <FaSearch className="text-lg" />
              </button>
              {showSearch && (
                <form onSubmit={handleSearch} className="absolute right-0 top-full mt-2 bg-gray-100 rounded-lg shadow-lg border border-yellow-400 p-2 flex items-center z-50">
                  <FaSearch className="text-gray-400 text-sm mr-2" />
                  <input
                    id="navbar-search-input"
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent focus:outline-none text-sm text-gray-800 placeholder-gray-500 flex-1"
                  />
                </form>
              )}
            </div>

            {/* Auth */}
            {isAuthenticated ? (
              <>
                <span className="text-sm font-medium">{user?.email}</span>
                <button onClick={logout} className="text-sm font-medium hover:text-yellow-400 transition-colors duration-200">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium hover:text-yellow-400 transition-colors duration-200">
                  Sign In
                </Link>
                <Link href="/signup">
                  <FaUserCircle className="text-2xl text-gray-100 hover:text-yellow-400 transition-colors duration-200" />
                </Link>
              </>
            )}

            {/* Mobile Menu */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-md hover:bg-yellow-200/20 transition-colors duration-200"
            >
              {isMobileMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-gray-900 border-t border-yellow-500/20">
            <div className="px-4 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-100 hover:text-yellow-400 hover:bg-gray-800/50 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="px-3 py-2">
                <div className="flex items-center bg-gray-100 rounded-full px-3 py-2 border border-yellow-400">
                  <FaSearch className="text-gray-400 text-sm" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="ml-2 bg-transparent focus:outline-none text-sm text-gray-800 placeholder-gray-500 flex-1"
                  />
                </div>
              </form>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
