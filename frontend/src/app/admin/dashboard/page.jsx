'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
  const router = useRouter();

  React.useEffect(() => {
    // No changes to the effect logic, keeping it clean
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    sessionStorage.removeItem('adminToken');
    sessionStorage.removeItem('adminUser');
    router.push('/admin-login');
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-500 animate-gradient-bg opacity-90"></div>
      <div className="absolute inset-0 backdrop-blur-sm"></div>

      {/* Header */}
      <header className="relative bg-white/95 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center shadow-md">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-6">
              <span className="text-sm font-medium text-gray-600">Welcome, Admin</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-5 py-2 rounded-full font-semibold hover:bg-red-600 transition-all duration-300 shadow-md"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <Link
            href="/admin/pending-Publishers"
            className="bg-white/95 rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300"
          >
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-semibold text-gray-500">Total Users</p>
                <p className="text-3xl font-bold text-gray-800">1,234</p>
              </div>
            </div>
          </Link>

          <Link
            href="/admin/pending-Publishers"
            className="bg-white/95 rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300"
          >
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-semibold text-gray-500">Active Extensions</p>
                <p className="text-3xl font-bold text-gray-800">567</p>
              </div>
            </div>
          </Link>

          <Link
            href="/admin/pending-Publishers"
            className="bg-white/95 rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300"
          >
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-full">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-semibold text-gray-500">Pending Publisher Registrations</p>
                <p className="text-3xl font-bold text-gray-800">89</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="bg-white/95 rounded-xl shadow-lg mb-10">
          <div className="px-6 py-5 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800">Navigation</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <Link
                href="/browse-extensions"
                target="_blank"
                className="flex items-center p-5 bg-gray-50/80 rounded-lg hover:bg-indigo-50 transition-all duration-300 shadow-sm"
              >
                <div className="p-3 bg-blue-100 rounded-full mr-4">
                  <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Browse Extensions</h3>
                  <p className="text-sm text-gray-500">Manage and review extensions</p>
                </div>
              </Link>

              <Link
                href="/admin/manage-extensions"
                className="flex items-center p-5 bg-gray-50/80 rounded-lg hover:bg-green-50 transition-all duration-300 shadow-sm"
              >
                <div className="p-3 bg-green-100 rounded-full mr-4">
                  <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Add Extension</h3>
                  <p className="text-sm text-gray-500">Create new extension</p>
                </div>
              </Link>

              <Link
                href="/admin/pending-Publishers"
                className="flex items-center p-5 bg-gray-50/80 rounded-lg hover:bg-orange-50 transition-all duration-300 shadow-sm"
              >
                <div className="p-3 bg-orange-100 rounded-full mr-4">
                  <svg className="w-7 h-7 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Review Pending Publishers</h3>
                  <p className="text-sm text-gray-500">Manage pending publisher registrations</p>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white/95 rounded-xl shadow-lg">
          <div className="px-6 py-5 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800">Recent Activity</h2>
          </div>
          <div className="p-6">
            <div className="space-y-5">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <span className="text-sm font-medium text-gray-600">New extension "Weather Widget" was approved</span>
                <span className="ml-auto text-xs text-gray-400">2 hours ago</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                <span className="text-sm font-medium text-gray-600">User "john.doe@example.com" registered</span>
                <span className="ml-auto text-xs text-gray-400">4 hours ago</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                <span className="text-sm font-medium text-gray-600">Extension "Task Manager" needs review</span>
                <span className="ml-auto text-xs text-gray-400">6 hours ago</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Custom CSS for Animated Background */}
      <style jsx>{`
        @keyframes gradient-bg {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient-bg {
          background-size: 200% 200%;
          animation: gradient-bg 15s ease infinite;
        }
      `}</style>
    </div>
  );
}