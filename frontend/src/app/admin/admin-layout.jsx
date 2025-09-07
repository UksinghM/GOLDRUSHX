'use client';
import { Toaster } from 'react-hot-toast';
import { AdminAuthProvider, useAdminAuth } from '@/components/AuthContext';
import AdminNavbar from '@/components/AdminNavbar';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function AdminAuthGate({ children }) {
  const { isAuthenticated, loading } = useAdminAuth();
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!loading && !isAuthenticated) {
        router.replace('/admin-login');
      }
    }, 3000); // 3 seconds delay

    return () => clearTimeout(timer);
  }, [isAuthenticated, loading, router]);

  if (loading || !isAuthenticated) {
    // Optionally, show a loading spinner or nothing while checking auth
    return null;
  }

  return <>{children}</>;
}

export default function AdminRootLayout({ children }) {
  return (
    <>
      <Toaster position='top-right' />
      <AdminAuthProvider>
        {/* Removed blue gradient overlays */}
        {/* Main Content */}
        <AdminNavbar />
        <main className="flex-1 py-4 relative z-10 min-h-screen bg-white">
          <AdminAuthGate>{children}</AdminAuthGate>
        </main>
        
      </AdminAuthProvider>
    </>
  );
}