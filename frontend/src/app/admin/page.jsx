'use client';


// import AdminNavbar from '../../components/AdminNavbar';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/admin/dashboard');
  }, [router]);

  return (
    <>
      {/* <AdminNavbar /> */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-indigo-900 to-blue-900">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Redirecting to admin dashboard...</p>
        </div>
      </div>
    </>
  );
} 