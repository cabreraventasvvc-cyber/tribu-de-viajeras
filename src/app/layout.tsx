import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/layout/FloatingWhatsApp';

export const metadata: Metadata = {
  title: 'Tribu de Viajeras | Viajes grupales exclusivos para mujeres',
  description:
    'Descubrí el mundo en comunidad. Próximas salidas grupales para mujeres a Japón 2027, Italia 2027 y China 2027. Seguridad, libertad y recuerdos para toda la vida.',
  keywords: [
    'viajes para mujeres',
    'tribu de viajeras',
    'viajes grupales mujeres',
    'japon 2027',
    'italia 2027',
    'china 2027',
    'viajar sola en grupo',
    'turismo para mujeres'
  ],
  openGraph: {
    title: 'Tribu de Viajeras | Viajes grupales para mujeres',
    description:
      'Viajar es descubrir el mundo, compartir experiencias y crear recuerdos para toda la vida. Sumate a la Tribu.',
    type: 'website',
    locale: 'es_AR',
    siteName: 'Tribu de Viajeras',
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
