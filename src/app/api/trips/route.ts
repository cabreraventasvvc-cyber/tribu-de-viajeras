import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const trips = db.getPublishedTrips();
    return NextResponse.json({ success: true, count: trips.length, data: trips });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Error al consultar viajes' },
      { status: 500 }
    );
  }
}
