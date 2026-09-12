'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import TripFormBuilder from '@/components/admin/TripFormBuilder';
import { db } from '@/lib/db';
import { Trip } from '@/types';

export default function EditTripPage() {
  const params = useParams();
  const id = params?.id as string;
  const [trip, setTrip] = useState<Trip | null | undefined>(undefined);

  useEffect(() => {
    if (id) {
      const found = db.getTripById(id);
      setTrip(found || null);
    }
  }, [id]);

  if (trip === undefined) {
    return (
      <div className="py-20 text-center text-stone-500 text-sm animate-pulse">
        Cargando datos del viaje...
      </div>
    );
  }

  if (trip === null) {
    return (
      <div className="py-20 text-center text-stone-700 font-bold">
        El viaje con ID {id} no existe.
      </div>
    );
  }

  return <TripFormBuilder initialData={trip} isEditing={true} />;
}
