'use client';
import React, { useState } from "react";
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  return (
    <nav className="bg-white text-gray-800 px-4 sm:px-8 py-4 shadow-md sticky top-0 z-50">
      <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push('/')}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/8/89/HD_transparent_picture.png"
            alt="LUXE JEWELS"
            className="h-10 w-10"
          />
          <span className="font-serif text-2xl font-bold text-amber-600 tracking-tight">LUXE JEWELS</span>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 flex flex-wrap gap-4 md:gap-6 items-center justify-center py-2">
          <a href="/" className="font-serif text-base hover:text-amber-500 transition">Home</a>
          <a href="/collections" className="font-serif text-base hover:text-amber-500 transition">Collections</a>
          <a href="/bespoke" className="font-serif text-base hover:text-amber-500 transition">Bespoke</a>
          {/* Jewelry Categories Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <button className="font-serif text-base hover:text-amber-500 flex items-center gap-1 transition">
              Categories
              <svg className="w-4 h-4 inline" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showDropdown && (
              <div className="absolute left-0 mt-2 w-80 bg-white text-gray-800 rounded-lg shadow-xl z-10 grid grid-cols-2 gap-2 p-4">
                {/* Necklaces Submenu */}
                <div className="col-span-1">
                  <p className="font-serif text-sm font-bold text-amber-600 px-4 py-2">Necklaces</p>
                  <a href="/categories/necklaces" className="block px-4 py-2 font-serif text-sm hover:bg-amber-50 hover:text-amber-500">All Necklaces</a>
                  <a href="/categories/necklaces/pendant" className="block px-4 py-2 font-serif text-sm hover:bg-amber-50 hover:text-amber-500">Pendant Necklaces</a>
                  <a href="/categories/necklaces/choker" className="block px-4 py-2 font-serif text-sm hover:bg-amber-50 hover:text-amber-500">Choker Necklaces</a>
                  <a href="/categories/necklaces/layered" className="block px-4 py-2 font-serif text-sm hover:bg-amber-50 hover:text-amber-500">Layered Necklaces</a>
                  <a href="/categories/necklaces/statement" className="block px-4 py-2 font-serif text-sm hover:bg-amber-50 hover:text-amber-500">Statement Necklaces</a>
                  <a href="/categories/necklaces/chains" className="block px-4 py-2 font-serif text-sm hover:bg-amber-50 hover:text-amber-500">Chains</a>
                  <a href="/categories/necklaces/pearl" className="block px-4 py-2 font-serif text-sm hover:bg-amber-50 hover:text-amber-500">Pearl Necklaces</a>
                  <a href="/categories/necklaces/lariat" className="block px-4 py-2 font-serif text-sm hover:bg-amber-50 hover:text-amber-500">Lariat Necklaces</a>
                  <a href="/categories/necklaces/religious" className="block px-4 py-2 font-serif text-sm hover:bg-amber-50 hover:text-amber-500">Religious/Symbolic</a>
                  <p className="font-serif text-sm font-bold text-amber-600 px-4 py-2 mt-2">By Metal</p>
                  <a href="/categories/necklaces/metal/gold" className="block px-4 py-2 font-serif text-sm hover:bg-amber-50 hover:text-amber-500">Gold</a>
                  <a href="/categories/necklaces/metal/silver" className="block px-4 py-2 font-serif text-sm hover:bg-amber-50 hover:text-amber-500">Silver</a>
                  <a href="/categories/necklaces/metal/rose-gold" className="block px-4 py-2 font-serif text-sm hover:bg-amber-50 hover:text-amber-500">Rose Gold</a>
                  <a href="/categories/necklaces/metal/platinum" className="block px-4 py-2 font-serif text-sm hover:bg-amber-50 hover:text-amber-500">Platinum</a>
                </div>
                <div className="col-span-1">
                  <p className="font-serif text-sm font-bold text-amber-600 px-4 py-2">By Stone</p>
                  <a href="/categories/necklaces/stone/diamonds" className="block px-4 py-2 font-serif text-sm hover:bg-amber-50 hover:text-amber-500">Diamonds</a>
                  <a href="/categories/necklaces/stone/pearls" className="block px-4 py-2 font-serif text-sm hover:bg-amber-50 hover:text-amber-500">Pearls</a>
                  <a href="/categories/necklaces/stone/colored-stones" className="block px-4 py-2 font-serif text-sm hover:bg-amber-50 hover:text-amber-500">Colored Stones</a>
                  <p className="font-serif text-sm font-bold text-amber-600 px-4 py-2 mt-2">By Occasion</p>
                  <a href="/categories/necklaces/occasion/everyday" className="block px-4 py-2 font-serif text-sm hover:bg-amber-50 hover:text-amber-500">Everyday</a>
                  <a href="/categories/necklaces/occasion/wedding" className="block px-4 py-2 font-serif text-sm hover:bg-amber-50 hover:text-amber-500">Wedding</a>
                  <a href="/categories/necklaces/occasion/party" className="block px-4 py-2 font-serif text-sm hover:bg-amber-50 hover:text-amber-500">Party</a>
                  <a href="/categories/necklaces/occasion/gifting" className="block px-4 py-2 font-serif text-sm hover:bg-amber-50 hover:text-amber-500">Gifting</a>
                  <p className="font-serif text-sm font-bold text-amber-600 px-4 py-2 mt-2">By Style</p>
                  <a href="/categories/necklaces/style/traditional" className="block px-4 py-2 font-serif text-sm hover:bg-amber-50 hover:text-amber-500">Traditional</a>
                  <a href="/categories/necklaces/style/contemporary" className="block px-4 py-2 font-serif text-sm hover:bg-amber-50 hover:text-amber-500">Contemporary</a>
                  <a href="/categories/necklaces/style/minimalist" className="block px-4 py-2 font-serif text-sm hover:bg-amber-50 hover:text-amber-500">Minimalist</a>
                  <a href="/categories/necklaces/style/boho" className="block px-4 py-2 font-serif text-sm hover:bg-amber-50 hover:text-amber-500">Boho</a>
                </div>
                {/* Other Categories */}
                <div className="col-span-2 border-t border-gray-200 mt-2 pt-2">
                  <a href="/categories/rings" className="block px-4 py-2 font-serif text-sm hover:bg-amber-50 hover:text-amber-500">Rings</a>
                  <a href="/categories/earrings" className="block px-4 py-2 font-serif text-sm hover:bg-amber-50 hover:text-amber-500">Earrings</a>
                  <a href="/categories/bracelets" className="block px-4 py-2 font-serif text-sm hover:bg-amber-50 hover:text-amber-500">Bracelets</a>
                  <a href="/promotions" className="block px-4 py-2 font-serif text-sm text-amber-600 hover:bg-amber-50">Special Offers</a>
                  <a href="/gift-cards" className="block px-4 py-2 font-serif text-sm text-amber-600 hover:bg-amber-50">Gift Cards</a>
                </div>
              </div>
            )}
          </div>
          <a href="/about" className="font-serif text-base hover:text-amber-500 transition">About</a>
          <a href="/contact" className="font-serif text-base hover:text-amber-500 transition">Contact</a>
        </div>

        {/* Search Bar */}
        <div className="flex w-full md:w-auto max-w-sm mt-2 md:mt-0">
          <input
            type="text"
            name="search"
            placeholder="Search Luxe Jewels"
            className="w-full px-4 py-2 rounded-l-md text-gray-800 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-400 text-base font-serif"
          />
          <button className="bg-amber-500 hover:bg-amber-600 px-4 py-2 rounded-r-md" type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 text-white"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
            </svg>
          </button>
        </div>

        {/* Right Side: Account & Cart */}
        <div className="flex items-center gap-4 mt-2 md:mt-0">
          <a href="/account" className="font-serif text-base hover:text-amber-500 transition">Account</a>
          <a href="/cart" className="relative flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 hover:text-amber-500"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007 17h10a1 1 0 00.95-.68l3.24-7.24A1 1 0 0020 8H6.21" />
            </svg>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;