-- Migration: Add missing columns to courses and documents tables

-- Add is_active and includes columns to courses table
ALTER TABLE public.courses
ADD COLUMN IF NOT EXISTS is_active boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS includes text;

-- Add is_active column to documents table
ALTER TABLE public.documents
ADD COLUMN IF NOT EXISTS is_active boolean DEFAULT true;

-- Update existing courses to be active by default
UPDATE public.courses SET is_active = true WHERE is_active IS NULL;

-- Update existing documents to be active by default
UPDATE public.documents SET is_active = true WHERE is_active IS NULL;

-- Add comments
COMMENT ON COLUMN public.courses.is_active IS 'Whether this course is active and visible on the website';
COMMENT ON COLUMN public.courses.includes IS 'What is included in the course (e.g., materials, access)';
COMMENT ON COLUMN public.documents.is_active IS 'Whether this document is active and visible on the website';
