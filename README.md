# ALFA Taxischule Website

Moderne Website für ALFA Taxischule Wien - Professionelle Taxilenker-Ausbildung

## Features

- **Responsive Design**: Optimiert für Desktop, Tablet und Mobile
- **Supabase Integration**: Datenbank für Kurse, Dokumente und Anfragen
- **Admin Dashboard**: Geschützter Verwaltungsbereich für Content-Management
- **SEO-Optimiert**: Strukturierte Daten, Sitemap, Meta-Tags
- **Moderne UI**: Taxi-gelb und Dark Grey Farbschema mit shadcn/ui Komponenten

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Hosting**: Vercel
- **TypeScript**: Für Type Safety

## Seiten

- **Homepage** (`/`): Hero, Features, Kurse-Teaser
- **Kurse** (`/kurse`): Kursübersicht mit Anmeldeformular
- **Taxilenker werden** (`/wie-werde-ich-taxilenker`): Schritt-für-Schritt Anleitung
- **Dokumente** (`/dokumente`): Downloads für Taxilenker
- **Kontakt** (`/kontakt`): Kontaktformular und Standort-Karte
- **Admin** (`/admin/*`): Geschützter Verwaltungsbereich

## Lokale Installation

1. Repository klonen
2. Dependencies installieren:
   \`\`\`bash
   npm install
   \`\`\`

3. Umgebungsvariablen einrichten (bereits in Vercel konfiguriert):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Weitere Supabase-Variablen

4. Entwicklungsserver starten:
   \`\`\`bash
   npm run dev
   \`\`\`

5. Öffnen Sie [http://localhost:3000](http://localhost:3000)

## Datenbank Setup

Die Datenbank-Scripts befinden sich im `scripts/` Ordner:

1. `001_create_tables.sql` - Erstellt alle Tabellen und RLS Policies
2. `002_seed_data.sql` - Fügt Beispieldaten hinzu
3. `003_create_admin_user.sql` - Erstellt Admin-Benutzer

Die Scripts können direkt in v0 ausgeführt werden.

## Admin-Zugang

**Admin-Zugangsdaten:**
- **URL:** https://www.alfataxischule.at/admin/login oder `/admin/login`
- **E-Mail:** `alfa.taxischule@gmail.com`
- **Passwort:** `Alper.181r1`

Der Admin-Bereich bietet ein vollständiges CMS für:
- **Homepage-Inhalte**: Hero-Section, Features, Intro-Text bearbeiten
- **Leitfaden-Seite**: Komplette Taxilenker-Anleitung verwalten
- **Kontaktinformationen**: Adresse, Telefon, E-Mail, Öffnungszeiten
- **Kursverwaltung**: Kurse hinzufügen, bearbeiten, aktivieren/deaktivieren
- **Dokumentenverwaltung**: Dateien hochladen und verwalten
- **Anfragen**: Kontaktformular-Einreichungen ansehen
- **Anmeldungen**: Kursanmeldungen verwalten

## Deployment

Das Projekt ist für Vercel optimiert und kann mit einem Klick deployed werden:

\`\`\`bash
npm run build
\`\`\`

## Content-Management

Der Admin-Bereich ermöglicht die Verwaltung von:

- **Kursen**: Neue Kurse hinzufügen, bearbeiten, löschen
- **Dokumenten**: PDF/Word-Dateien hochladen und verwalten
- **Kontaktanfragen**: Übersicht aller Anfragen
- **Kursanmeldungen**: Liste aller Anmeldungen
- **Seiteninhalt**: Hero-Texte, Features anpassen

## SEO-Optimierungen

- Semantisches HTML (h1, h2, header, main, footer)
- Meta-Tags für jede Seite
- Open Graph Tags für Social Media
- JSON-LD Structured Data (LocalBusiness Schema)
- Sitemap.xml und robots.txt
- Responsive Images mit Next.js Image
- Alt-Texte für alle Bilder
- Mobile-First Ansatz

## Farben

- **Primary (Taxi-Gelb)**: #FFC107
- **Secondary (Dark Grey)**: #1a1a1a bis #404040
- **Neutrals**: Weiß, Grau-Abstufungen

## Support

Bei Fragen wenden Sie sich an: office@alfataxischule.at

---

© 2025 ALFA Taxischule Wien. Alle Rechte vorbehalten.
