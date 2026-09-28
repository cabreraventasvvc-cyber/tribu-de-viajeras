'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Compass,
  LayoutDashboard,
  Map,
  PlusCircle,
  Users,
  Calendar,
  CreditCard,
  Settings,
  LogOut,
  ExternalLink,
} from 'lucide-react';
import { signOutAdmin } from '@/lib/admin/data';

export default function AdminNavbar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await signOutAdmin();
    router.push('/admin/login');
  };

  const navItems = [
    { label: 'Inicio', href: '/admin', icon: LayoutDashboard },
    { label: 'Viajes', href: '/admin/viajes', icon: Map },
    { label: 'Agregar Viaje', href: '/admin/viajes/nuevo', icon: PlusCircle },
    { label: 'Mis Leads', href: '/admin/leads', icon: Users },
    { label: 'Seguimientos', href: '/admin/seguimientos', icon: Calendar },
    { label: 'Reservas', href: '/admin/reservas', icon: CreditCard },
    { label: 'Configuración', href: '/admin/configuracion', icon: Settings },
  ];

  return (
    <header className="bg-white border-b border-sand-200 shadow-xs sticky top-0 z-30">
      {/* Top Header Bar (Fiel a la foto: Logo/Brand izquierda, Settings y Salir derecha) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-tribu-600 text-white flex items-center justify-center">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <span className="font-serif text-lg sm:text-xl font-bold text-stone-900 leading-tight block">
                Rutas del Alma
              </span>
              <span className="text-[10px] text-stone-500 uppercase tracking-wider font-semibold">
                Panel de Gestión
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-stone-600 hover:text-tribu-600 hover:bg-sand-100 transition-colors"
            >
              <span>Ver Sitio</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/admin/configuracion"
              className="p-2 rounded-full hover:bg-sand-100 text-stone-600 transition-colors"
              aria-label="Configuración"
            >
              <Settings className="w-4 h-4" />
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Salir</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sub Navigation Tabs */}
      <div className="border-t border-sand-200 bg-sand-50/70 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-1 sm:space-x-4 whitespace-nowrap py-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-white text-tribu-700 shadow-xs border border-sand-200'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
