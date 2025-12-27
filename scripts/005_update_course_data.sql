-- Run this after migration 004 to add the includes data to existing courses

-- Update courses with includes information
UPDATE public.courses
SET includes = '3 Monate Lernsystem (App), Kurskatalog, Stadtplan / Routenplan'
WHERE type = 'Taxilenkerkurs';

UPDATE public.courses
SET includes = 'Umfangreiche Kursunterlagen, Prüfungsvorbereitung'
WHERE type = 'Gewerbekurs';

-- Make sure all courses are active
UPDATE public.courses SET is_active = true;

-- Make sure all documents are active
UPDATE public.documents SET is_active = true;
