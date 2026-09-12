-- ==============================================================================
-- SCHEMA DEFINITION FOR "TRIBU DE VIAJERAS"
-- PostgreSQL / Supabase Migration Script
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. TRIPS TABLE
CREATE TABLE IF NOT EXISTS trips (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(120) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    destination_country VARCHAR(100) NOT NULL,
    destination_cities VARCHAR(255) NOT NULL,
    short_description TEXT NOT NULL,
    full_description TEXT NOT NULL,
    hero_image_url TEXT NOT NULL,
    gallery_images JSONB DEFAULT '[]'::jsonb,
    pdf_itinerary_url TEXT,
    start_date DATE,
    end_date DATE,
    duration_days INTEGER NOT NULL DEFAULT 1,
    start_city VARCHAR(100),
    end_city VARCHAR(100),
    intensity VARCHAR(50) DEFAULT 'Baja',
    recommended_age VARCHAR(100) DEFAULT 'Todas las edades',
    modality VARCHAR(100) DEFAULT 'Parcialmente guiado',
    price NUMERIC(10, 2),
    currency VARCHAR(10) DEFAULT 'USD',
    spots_total INTEGER DEFAULT 15,
    spots_available INTEGER DEFAULT 15,
    is_featured BOOLEAN DEFAULT false,
    is_limited_spots BOOLEAN DEFAULT true,
    is_sold_out BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT true,
    included_services JSONB DEFAULT '[]'::jsonb,
    not_included_services JSONB DEFAULT '[]'::jsonb,
    requirements TEXT,
    payment_methods TEXT,
    observations TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. TRIP ITINERARY DAYS TABLE
CREATE TABLE IF NOT EXISTS trip_days (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
    day_number INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    meals VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. LEADS TABLE (CRM DE PROSPECTOS)
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trip_id UUID REFERENCES trips(id) ON DELETE SET NULL,
    trip_name VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(100) NOT NULL,
    city VARCHAR(100),
    passengers_count INTEGER DEFAULT 1,
    age VARCHAR(50),
    attraction_reason TEXT,
    concern_reason TEXT,
    stage VARCHAR(100) DEFAULT 'Solo estoy averiguando',
    message TEXT,
    status VARCHAR(50) DEFAULT 'Nuevo',
    origin VARCHAR(100) DEFAULT 'Sitio Web Directo',
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    utm_campaign VARCHAR(150),
    utm_content VARCHAR(150),
    utm_term VARCHAR(150),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. LEAD INTERNAL NOTES
CREATE TABLE IF NOT EXISTS lead_notes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. FOLLOWUPS (SEGUIMIENTOS AGENDADOS)
CREATE TABLE IF NOT EXISTS followups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
    scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
    notes TEXT,
    is_completed BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. RESERVATIONS (VIAJERAS CONFIRMADAS)
CREATE TABLE IF NOT EXISTS reservations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
    trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
    trip_name VARCHAR(255) NOT NULL,
    passenger_name VARCHAR(255) NOT NULL,
    passengers_count INTEGER DEFAULT 1,
    total_amount NUMERIC(10, 2) NOT NULL,
    deposit_amount NUMERIC(10, 2) DEFAULT 0,
    pending_balance NUMERIC(10, 2) DEFAULT 0,
    currency VARCHAR(10) DEFAULT 'USD',
    status VARCHAR(50) DEFAULT 'Confirmada',
    notes TEXT,
    reservation_date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. SETTINGS TABLE
CREATE TABLE IF NOT EXISTS settings (
    key VARCHAR(100) PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- INDEXES FOR MAXIMUM QUERY SPEED
CREATE INDEX IF NOT EXISTS idx_trips_slug ON trips(slug);
CREATE INDEX IF NOT EXISTS idx_trips_published ON trips(is_published);
CREATE INDEX IF NOT EXISTS idx_trip_days_trip_id ON trip_days(trip_id, day_number);
CREATE INDEX IF NOT EXISTS idx_leads_trip_name ON leads(trip_name);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_followups_scheduled ON followups(scheduled_at);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE trip_days ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE followups ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Public can read published trips
CREATE POLICY "Public trips read access" ON trips
    FOR SELECT USING (is_published = true);

-- Public can read itinerary days of published trips
CREATE POLICY "Public trip days read access" ON trip_days
    FOR SELECT USING (EXISTS (SELECT 1 FROM trips WHERE trips.id = trip_days.trip_id AND trips.is_published = true));

-- Public can insert new leads (via web inquiry form)
CREATE POLICY "Public leads insert access" ON leads
    FOR INSERT WITH CHECK (true);

-- Public can read settings
CREATE POLICY "Public settings read access" ON settings
    FOR SELECT USING (true);

-- Admin has full access to all tables (authenticated users)
CREATE POLICY "Admin full access trips" ON trips FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access trip_days" ON trip_days FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access leads" ON leads FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access lead_notes" ON lead_notes FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access followups" ON followups FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access reservations" ON reservations FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access settings" ON settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
