-- Create courses table
CREATE TABLE IF NOT EXISTS public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  times TEXT NOT NULL,
  description TEXT NOT NULL,
  prerequisites TEXT,
  price DECIMAL(10, 2),
  registration_deadline DATE,
  is_active BOOLEAN DEFAULT true,
  includes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create documents table
CREATE TABLE IF NOT EXISTS public.documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  file_url TEXT NOT NULL,
  description TEXT,
  category TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create page content table
CREATE TABLE IF NOT EXISTS public.page_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_key TEXT UNIQUE NOT NULL,
  content JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create contact submissions table
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  consent BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create course registrations table
CREATE TABLE IF NOT EXISTS public.course_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  consent BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create admin users table
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create site_settings table for CMS-managed contact info and opening hours
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable Row Level Security
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Drop existing policies before creating to avoid conflicts
DROP POLICY IF EXISTS "Allow public read courses" ON public.courses;
DROP POLICY IF EXISTS "Allow public read documents" ON public.documents;
DROP POLICY IF EXISTS "Allow public read page_content" ON public.page_content;
DROP POLICY IF EXISTS "Allow public read site_settings" ON public.site_settings;
DROP POLICY IF EXISTS "Allow insert contact_submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Allow insert course_registrations" ON public.course_registrations;

-- RLS Policies for public read access
CREATE POLICY "Allow public read courses" ON public.courses FOR SELECT USING (true);
CREATE POLICY "Allow public read documents" ON public.documents FOR SELECT USING (true);
CREATE POLICY "Allow public read page_content" ON public.page_content FOR SELECT USING (true);
CREATE POLICY "Allow public read site_settings" ON public.site_settings FOR SELECT USING (true);

-- RLS Policies for authenticated admin users (we'll handle auth in app logic)
CREATE POLICY "Allow insert contact_submissions" ON public.contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow insert course_registrations" ON public.course_registrations FOR INSERT WITH CHECK (true);
