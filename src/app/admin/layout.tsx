'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import AdminNavbar from '@/components/admin/AdminNavbar';
import { getAdminSession } from '@/lib/admin/data';
import { isSupabaseConfigured } from '@/lib/supabase/client';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // If we're on login page, skip check
    if (pathname === '/admin/login') {
      setIsAuthenticated(true);
      return;
    }

    const checkSession = async () => {
      if (isSupabaseConfigured) {
        const session = await getAdminSession();
        if (session) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          router.push('/admin/login');
        }
        return;
      }

      const session = localStorage.getItem('rutas_del_alma_admin_session');
      if (session === 'authenticated') {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        router.push('/admin/login');
      }
    };

    if (typeof window !== 'undefined') {
      checkSession();
    }
  }, [pathname, router]);

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-sand-50 flex items-center justify-center text-stone-500 text-sm">
        <p className="animate-pulse">Cargando panel de administración...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-sand-50/60 text-stone-900 flex flex-col">
      <AdminNavbar />
      <main className="grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {children}
      </main>
    </div>
  );
}
