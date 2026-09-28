import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/layout/FloatingWhatsApp';

export const metadata: Metadata = {
  title: 'Rutas del Alma Viajes | Viajes boutique y CRM turistico',
  description:
    'Demo de agencia de viajes boutique con paquetes, formularios, panel administrador, CRM de leads, seguimientos y reservas.',
  keywords: [
    'agencia de viajes',
    'crm turismo',
    'viajes boutique',
    'panel administrador turismo',
    'leads viajes',
    'reservas turismo'
  ],
  openGraph: {
    title: 'Rutas del Alma Viajes | Demo CRM turistico',
    description:
      'Web de viajes con administracion de paquetes, CRM de consultas, seguimientos y reservas.',
    type: 'website',
    locale: 'es_AR',
    siteName: 'Rutas del Alma Viajes',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-[#faf8f5] text-stone-900 selection:bg-tribu-100 selection:text-tribu-900 antialiased overflow-x-hidden">
        <Navbar />
        <main className="grow pt-16">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
