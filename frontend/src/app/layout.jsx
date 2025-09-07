import { Toaster } from 'react-hot-toast';
import './globals.css';
import { AuthProvider } from '@/components/AuthContext';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
export const metadata = {
  title: "GOLD-RUSH",
  description: "Browse and manage Visual Studio Code extensions",
  icons: {
    icon: "/sq.ico", // Path to your logo in the public folder
    shortcut: "/sq.ico",
    apple: "/whiteLogo.png",
    other: [
      { rel: "icon", url: "/whiteLogo.png" },
      { rel: "apple-touch-icon", url: "/whiteLogo.png" }
    ]
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-white">
      <body className="min-h-screen flex flex-col bg-white">
        <Toaster position='top-right' />
        <AuthProvider>
          {/* Main Content */}
          <main className="flex-1 relative z-10 min-h-screen">
            <Navbar />
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
