'use client';
import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaPinterest } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-tl from-black via-gray-900 to-gray-800 w-full py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto text-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-serif font-bold text-yellow-400 mb-3">GoldenAura</h3>
            <p className="text-gray-300 text-sm">
              Discover exquisite jewelry pieces crafted with passion and elegance. 
              Your perfect piece awaits.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-yellow-400 hover:text-white transition"><FaFacebookF /></a>
              <a href="#" className="text-yellow-400 hover:text-white transition"><FaInstagram /></a>
              <a href="#" className="text-yellow-400 hover:text-white transition"><FaTwitter /></a>
              <a href="#" className="text-yellow-400 hover:text-white transition"><FaPinterest /></a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-sm font-semibold text-yellow-400 uppercase tracking-wider mb-4">
              Shop
            </h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-yellow-400 text-sm transition">Necklaces</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-400 text-sm transition">Rings</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-400 text-sm transition">Earrings</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-400 text-sm transition">Bracelets</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-sm font-semibold text-yellow-400 uppercase tracking-wider mb-4">
              Customer Service
            </h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-yellow-400 text-sm transition">Help Center</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-400 text-sm transition">Shipping & Returns</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-400 text-sm transition">Warranty</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-400 text-sm transition">Contact Us</a></li>
            </ul>
          </div>

          {/* About & Policies */}
          <div>
            <h4 className="text-sm font-semibold text-yellow-400 uppercase tracking-wider mb-4">
              About
            </h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-yellow-400 text-sm transition">Our Story</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-400 text-sm transition">Sustainability</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-400 text-sm transition">Careers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-400 text-sm transition">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-yellow-400/20 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-xs mb-4 md:mb-0">
            © {new Date().getFullYear()} GoldenAura. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-yellow-400 text-xs transition">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-yellow-400 text-xs transition">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-yellow-400 text-xs transition">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
