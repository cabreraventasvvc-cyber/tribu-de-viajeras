import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import TripDetailView from '@/components/public/TripDetailView';

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  const trips = db.getPublishedTrips();
  return trips.map((t) => ({
    slug: t.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const trip = db.getTripBySlug(params.slug);

  if (!trip) {
    return {
      title: 'Viaje no encontrado | Tribu de Viajeras',
    };
  }

  return {
    title: `${trip.title} | Tribu de Viajeras`,
    description: trip.shortDescription,
    openGraph: {
      title: `${trip.title} | Tribu de Viajeras`,
      description: trip.shortDescription,
      images: [
        {
          url: trip.heroImageUrl,
          width: 1200,
          height: 630,
          alt: trip.title,
        },
      ],
    },
  };
}

export default function TripPage({ params }: PageProps) {
  const trip = db.getTripBySlug(params.slug);

  if (!trip) {
    notFound();
  }

  return <TripDetailView initialTrip={trip} />;
}
