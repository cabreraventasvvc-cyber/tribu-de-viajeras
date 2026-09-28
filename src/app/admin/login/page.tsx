'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Compass, Lock, Mail, ArrowRight } from 'lucide-react';
import { signInAdmin } from '@/lib/admin/data';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@rutasdelalma.demo');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signInAdmin(email, password);
      if (typeof window !== 'undefined') {
        localStorage.setItem('rutas_del_alma_admin_session', 'authenticated');
      }
      router.push('/admin');
    } catch {
      setError('Credenciales incorrectas. Verificá tu correo y contraseña.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-tribu-50 to-[#faf8f5] flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-sand-200">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-tribu-600 text-white flex items-center justify-center mx-auto shadow-md">
            <Compass className="w-8 h-8" />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            Rutas del Alma
          </h1>
          <p className="text-xs uppercase tracking-widest text-tribu-700 font-bold">
            Panel de Administración & CRM
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
              Correo Electrónico
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-sand-300 text-stone-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-tribu-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-sand-300 text-stone-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-tribu-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-tribu-600 hover:bg-tribu-700 text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{loading ? 'Iniciando sesión...' : 'Ingresar al panel'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 border-t border-sand-200 text-center">
          <Link href="/" className="text-xs text-stone-500 hover:text-stone-800">
            &larr; Volver a la página principal
          </Link>
        </div>
      </div>
    </div>
  );
}
