import { AdminAuthProvider } from '@/components/AuthContext';
import Navbar from '@/components/Navbar';

export default function MainLayout({ children }) {
  return (
    <>
    <AdminAuthProvider>
      <Navbar/>
      <div className="pt-16">
        {children}
      </div>
      </AdminAuthProvider>
    </>
  );
}
