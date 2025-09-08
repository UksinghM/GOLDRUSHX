'use client';
import React, { useState, useEffect } from "react"; // Added useEffect for debugging
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  // Debug multiple renders
  useEffect(() => {
    console.log('Navbar rendered');
  }, []);

  return (
    <nav className="bg-ivory-50 text-charcoal-900 px-4 sm:px-8 py-4 shadow-md sticky top-0 z-50">
      <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push('/')}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/8/89/HD_transparent_picture.png"
            alt="LUXE JEWELS"
            className="h-10 w-10"
          />
          <span className="font-serif text-2xl font-bold text-gold-500 tracking-tight">LUXE JEWELS</span>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 flex flex-wrap gap-4 md:gap-6 items-center justify-center py-2">
          <Link href="/" className="font-serif text-base hover:text-amber-500 transition">
            Home
          </Link>
          <Link href="/collections" className="font-serif text-base hover:text-amber-500 transition">
            Collections
          </Link>
          <Link href="/bespoke" className="font-serif text-base hover:text-amber-500 transition">
            Bespoke
          </Link>
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
              <div className="absolute left-0 mt-2 w-80 bg-ivory-50 text-charcoal-900 rounded-lg shadow-xl z-10 grid grid-cols-2 gap-2 p-4">
                {/* Necklaces Submenu */}
                <div className="col-span-1">
                  <p className="font-serif text-sm font-bold text-gold-500 px-4 py-2">Necklaces</p>
                  <Link href="/categories/necklaces" className="block px-4 py-2 font-serif text-sm hover:bg-ivory-100 hover:text-amber-500">All Necklaces</Link>
                  <Link href="/categories/necklaces/pendant" className="block px-4 py-2 font-serif text-sm hover:bg-ivory-100 hover:text-amber-500">Pendant Necklaces</Link>
                  <Link href="/categories/necklaces/choker" className="block px-4 py-2 font-serif text-sm hover:bg-ivory-100 hover:text-amber-500">Choker Necklaces</Link>
                  <Link href="/categories/necklaces/layered" className="block px-4 py-2 font-serif text-sm hover:bg-ivory-100 hover:text-amber-500">Layered Necklaces</Link>
                  <Link href="/categories/necklaces/statement" className="block px-4 py-2 font-serif text-sm hover:bg-ivory-100 hover:text-amber-500">Statement Necklaces</Link>
                  <Link href="/categories/necklaces/chains" className="block px-4 py-2 font-serif text-sm hover:bg-ivory-100 hover:text-amber-500">Chains</Link>
                  <Link href="/categories/necklaces/pearl" className="block px-4 py-2 font-serif text-sm hover:bg-ivory-100 hover:text-amber-500">Pearl Necklaces</Link>
                  <Link href="/categories/necklaces/lariat" className="block px-4 py-2 font-serif text-sm hover:bg-ivory-100 hover:text-amber-500">Lariat Necklaces</Link>
                  <Link href="/categories/necklaces/religious" className="block px-4 py-2 font-serif text-sm hover:bg-ivory-100 hover:text-amber-500">Religious/Symbolic</Link>
                  <p className="font-serif text-sm font-bold text-gold-500 px-4 py-2 mt-2">By Metal</p>
                  <Link href="/categories/necklaces/metal/gold" className="block px-4 py-2 font-serif text-sm hover:bg-ivory-100 hover:text-amber-500">Gold</Link>
                  <Link href="/categories/necklaces/metal/silver" className="block px-4 py-2 font-serif text-sm hover:bg-ivory-100 hover:text-amber-500">Silver</Link>
                  <Link href="/categories/necklaces/metal/rose-gold" className="block px-4 py-2 font-serif text-sm hover:bg-ivory-100 hover:text-amber-500">Rose Gold</Link>
                  <Link href="/categories/necklaces/metal/platinum" className="block px-4 py-2 font-serif text-sm hover:bg-ivory-100 hover:text-amber-500">Platinum</Link>
                </div>
                <div className="col-span-1">
                  <p className="font-serif text-sm font-bold text-gold-500 px-4 py-2">By Stone</p>
                  <Link href="/categories/necklaces/stone/diamonds" className="block px-4 py-2 font-serif text-sm hover:bg-ivory-100 hover:text-amber-500">Diamonds</Link>
                  <Link href="/categories/necklaces/stone/pearls" className="block px-4 py-2 font-serif text-sm hover:bg-ivory-100 hover:text-amber-500">Pearls</Link>
                  <Link href="/categories/necklaces/stone/colored-stones" className="block px-4 py-2 font-serif text-sm hover:bg-ivory-100 hover:text-amber-500">Colored Stones</Link>
                  <p className="font-serif text-sm font-bold text-gold-500 px-4 py-2 mt-2">By Occasion</p>
                  <Link href="/categories/necklaces/occasion/everyday" className="block px-4 py-2 font-serif text-sm hover:bg-ivory-100 hover:text-amber-500">Everyday</Link>
                  <Link href="/categories/necklaces/occasion/wedding" className="block px-4 py-2 font-serif text-sm hover:bg-ivory-100 hover:text-amber-500">Wedding</Link>
                  <Link href="/categories/necklaces/occasion/party" className="block px-4 py-2 font-serif text-sm hover:bg-ivory-100 hover:text-amber-500">Party</Link>
                  <Link href="/categories/necklaces/occasion/gifting" className="block px-4 py-2 font-serif text-sm hover:bg-ivory-100 hover:text-amber-500">Gifting</Link>
                  <p className="font-serif text-sm font-bold text-gold-500 px-4 py-2 mt-2">By Style</p>
                  <Link href="/categories/necklaces/style/traditional" className="block px-4 py-2 font-serif text-sm hover:bg-ivory-100 hover:text-amber-500">Traditional</Link>
                  <Link href="/categories/necklaces/style/contemporary" className="block px-4 py-2 font-serif text-sm hover:bg-ivory-100 hover:text-amber-500">Contemporary</Link>
                  <Link href="/categories/necklaces/style/minimalist" className="block px-4 py-2 font-serif text-sm hover:bg-ivory-100 hover:text-amber-500">Minimalist</Link>
                  <Link href="/categories/necklaces/style/boho" className="block px-4 py-2 font-serif text-sm hover:bg-ivory-100 hover:text-amber-500">Boho</Link>
                </div>
                {/* Other Categories */}
                <div className="col-span-2 border-t border-ivory-200 mt-2 pt-2">
                  <Link href="/categories/rings" className="block px-4 py-2 font-serif text-sm hover:bg-ivory-100 hover:text-amber-500">Rings</Link>
                  <Link href="/categories/earrings" className="block px-4 py-2 font-serif text-sm hover:bg-ivory-100 hover:text-amber-500">Earrings</Link>
                  <Link href="/categories/bracelets" className="block px-4 py-2 font-serif text-sm hover:bg-ivory-100 hover:text-amber-500">Bracelets</Link>
                  <Link href="/promotions" className="block px-4 py-2 font-serif text-sm text-gold-500 hover:bg-ivory-100">Special Offers</Link>
                  <Link href="/gift-cards" className="block px-4 py-2 font-serif text-sm text-gold-500 hover:bg-ivory-100">Gift Cards</Link>
                </div>
              </div>
            )}
          </div>
          <Link href="/about-us" className="font-serif text-base hover:text-amber-500 transition">
            About
          </Link>
          <Link href="/contact" className="font-serif text-base hover:text-amber-500 transition">
            Contact
          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex w-full md:w-auto max-w-sm mt-2 md:mt-0">
          <input
            type="text"
            name="search"
            placeholder="Search Luxe Jewels"
            className="w-full px-4 py-2 rounded-l-md text-charcoal-900 bg-ivory-100 focus:outline-none focus:ring-2 focus:ring-gold-500 text-base font-serif"
          />
          <button className="bg-gold-500 hover:bg-gold-600 px-4 py-2 rounded-r-md" type="submit">
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
          <Link href="/account" className="font-serif text-base hover:text-amber-500 transition">
            Account
          </Link>
          <Link href="/cart" className="relative flex items-center">
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
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;