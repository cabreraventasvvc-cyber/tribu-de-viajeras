import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { db } from '@/lib/db';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function getSupabaseClient(useServiceRole = false) {
  const key = useServiceRole && supabaseServiceRoleKey ? supabaseServiceRoleKey : supabaseAnonKey;
  return createClient(supabaseUrl, key);
}

export async function GET() {
  try {
    if (isSupabaseConfigured && supabaseServiceRoleKey) {
      const { data, error } = await getSupabaseClient(true)
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return NextResponse.json({ success: true, count: data?.length || 0, data: data || [] });
    }

    const leads = db.getLeads();
    return NextResponse.json({ success: true, count: leads.length, data: leads });
  } catch (error) {
    console.error('Error in /api/leads GET:', error);
    return NextResponse.json(
      { success: false, error: 'Error al consultar leads' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.fullName || !body.email) {
      return NextResponse.json(
        { success: false, error: 'Nombre y email son obligatorios.' },
        { status: 400 }
      );
    }

    if (isSupabaseConfigured) {
      const leadPayload = {
        trip_id: body.tripId && uuidPattern.test(body.tripId) ? body.tripId : null,
        trip_name: body.tripName || 'Consulta General',
        full_name: body.fullName,
        email: body.email,
        phone: body.phone || 'No informado',
        city: body.city || '',
        passengers_count: Number(body.passengersCount) || 1,
        age: body.age || null,
        attraction_reason: body.attractionReason || '',
        concern_reason: body.concernReason || '',
        stage: body.stage || 'Solo estoy averiguando',
        message: body.message || '',
        status: 'Nuevo',
        origin: body.origin || 'Sitio Web Directo',
        utm_source: body.utmSource || null,
        utm_medium: body.utmMedium || null,
        utm_campaign: body.utmCampaign || null,
        utm_content: body.utmContent || null,
        utm_term: body.utmTerm || null,
      };

      const { data, error } = await getSupabaseClient(Boolean(supabaseServiceRoleKey))
        .from('leads')
        .insert(leadPayload)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return NextResponse.json({ success: true, data }, { status: 201 });
    }

    const lead = db.createLead({
      tripId: body.tripId,
      tripName: body.tripName || 'Consulta General',
      fullName: body.fullName,
      email: body.email,
      phone: body.phone || 'No informado',
      city: body.city || '',
      passengersCount: Number(body.passengersCount) || 1,
      age: body.age || undefined,
      attractionReason: body.attractionReason || '',
      concernReason: body.concernReason || '',
      stage: body.stage || 'Solo estoy averiguando',
      message: body.message || '',
      status: 'Nuevo',
      origin: body.origin || 'Sitio Web Directo',
      utmSource: body.utmSource,
      utmMedium: body.utmMedium,
      utmCampaign: body.utmCampaign,
      utmContent: body.utmContent,
      utmTerm: body.utmTerm,
    });

    return NextResponse.json({ success: true, data: lead }, { status: 201 });
  } catch (error) {
    console.error('Error in /api/leads POST:', error);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor al procesar consulta' },
      { status: 500 }
    );
  }
}
