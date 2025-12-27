-- Updated to work with current database schema first, then add full data after migration
-- Seed initial CMS content for homepage
INSERT INTO public.page_content (page_key, content) VALUES
('homepage', '{
  "heroHeadline": "Ihre Taxischule in Wien",
  "heroSubtitle": "Professionelle Ausbildung für angehende Taxilenker mit modernen Lehrmethoden und persönlicher Betreuung",
  "heroCTA": "Jetzt anmelden",
  "introHeading": "Willkommen bei ALFA Taxischule",
  "introText": "Bei ALFA Taxischule bieten wir Ihnen eine hochwertige Ausbildung zum Taxilenker in Wien. Mit erfahrenen Kursleitern, modernen Lehrmethoden und einer persönlichen Betreuung bereiten wir Sie optimal auf die Prüfung vor.",
  "feature1Title": "Moderne Ausbildung",
  "feature1Text": "Innovative Lehrmethoden mit Praxis-Training und echten Stadtfahrten",
  "feature2Title": "Erfahrene Kursleiter",
  "feature2Text": "Jahrelange Erfahrung und persönliche Betreuung für Ihren Erfolg",
  "feature3Title": "Optimales Lernklima",
  "feature3Text": "Kleine Gruppen und strukturierte Lektionen für maximalen Lernerfolg",
  "ctaHeading": "Bereit für Ihre Ausbildung?",
  "ctaText": "Kontaktieren Sie uns für weitere Informationen oder melden Sie sich direkt für einen Kurs an.",
  "ctaButton": "Kontakt aufnehmen"
}'::jsonb)
ON CONFLICT (page_key) DO UPDATE SET content = EXCLUDED.content;

-- Seed initial CMS content for guide page
INSERT INTO public.page_content (page_key, content) VALUES
('guide', '{
  "pageTitle": "Wie werde ich Taxilenker in Wien?",
  "pageIntro": "Der Weg zum Taxilenker in Wien erfordert mehrere Schritte. Hier finden Sie eine übersichtliche Anleitung.",
  "steps": [
    {
      "title": "Voraussetzungen prüfen",
      "description": "Sie benötigen: Mindestalter 20 Jahre, Führerschein Klasse B mit mindestens 1 Jahr Fahrpraxis, polizeiliches Führungszeugnis, ärztliches Gutachten, Erste-Hilfe-Kurs."
    },
    {
      "title": "Kurs besuchen",
      "description": "Besuchen Sie einen Taxilenkerkurs bei einer anerkannten Fahrschule wie ALFA Taxischule. Der Kurs umfasst Ortskunde, Tarifrecht, Verkehrsrecht und mehr."
    },
    {
      "title": "Prüfung ablegen",
      "description": "Nach dem Kurs legen Sie die Prüfung bei der Wirtschaftskammer Wien ab. Die Prüfung besteht aus einem theoretischen und praktischen Teil."
    },
    {
      "title": "Gewerbelizenz beantragen",
      "description": "Mit bestandener Prüfung können Sie die Gewerbelizenz bei der Magistratsabteilung beantragen."
    }
  ],
  "wkoLink": "https://www.wko.at",
  "magistratLink": "https://www.wien.gv.at"
}'::jsonb)
ON CONFLICT (page_key) DO UPDATE SET content = EXCLUDED.content;

-- Seed contact settings
INSERT INTO public.site_settings (key, value) VALUES
('contact', '{
  "address": "Schönbrunner Straße 181/1",
  "zip": "1120",
  "city": "Wien",
  "phone": "+43 660 2020860",
  "email": "alfa.taxischule@gmail.com",
  "openingHours": "Mo-Fr: 11:00-16:00 Uhr\\nSa-So: Geschlossen"
}'::jsonb)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Seed courses without is_active and includes columns (to be added after migration)
-- Seed actual courses with correct data from requirements
INSERT INTO public.courses (type, start_date, end_date, times, description, price, prerequisites) VALUES
('Taxilenkerkurs', '2025-01-12', '2025-01-15', '16:30 - 20:30', 'Intensivkurs zur Vorbereitung auf die Taxilenker-Prüfung. Umfasst Ortskunde, Routen, Bilder sowie Wiener Landesbetriebsordnung, Tarif, STVO, KFG und Arbeits- und Sozialrecht.', 120.00, 'Mindestalter 20 Jahre, Führerschein Klasse B'),
('Taxilenkerkurs', '2025-01-26', '2025-01-29', '16:30 - 20:30', 'Intensivkurs zur Vorbereitung auf die Taxilenker-Prüfung. Umfasst Ortskunde, Routen, Bilder sowie Wiener Landesbetriebsordnung, Tarif, STVO, KFG und Arbeits- und Sozialrecht.', 120.00, 'Mindestalter 20 Jahre, Führerschein Klasse B'),
('Taxilenkerkurs', '2025-02-09', '2025-02-12', '16:30 - 20:30', 'Intensivkurs zur Vorbereitung auf die Taxilenker-Prüfung. Umfasst Ortskunde, Routen, Bilder sowie Wiener Landesbetriebsordnung, Tarif, STVO, KFG und Arbeits- und Sozialrecht.', 120.00, 'Mindestalter 20 Jahre, Führerschein Klasse B'),
('Gewerbekurs', '2025-02-23', '2025-03-05', '16:30 - 20:30', 'Kurs zur Vorbereitung auf die Gewerbeprüfung für Taxiunternehmer. Behandelt betriebswirtschaftliche und rechtliche Grundlagen für den Betrieb eines Taxiunternehmens.', 150.00, 'Abgeschlossene Taxilenker-Prüfung')
ON CONFLICT DO NOTHING;

-- Seed sample documents
INSERT INTO public.documents (title, file_url, description, category) VALUES
('Wiener Taxitarif', '/docs/taxitarif.pdf', 'Aktuelle Tarifordnung für Taxifahrten in Wien', 'Tarife'),
('Taxistandplatzverzeichnis', '/docs/standplaetze.pdf', 'Übersicht aller offiziellen Taxistandplätze in Wien', 'Standplätze'),
('Sonderspuren & Verkehr', '/docs/sonderspuren.pdf', 'Informationen zu Sonderspuren und Verkehrsregeln', 'Verkehr')
ON CONFLICT DO NOTHING;
