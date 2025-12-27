import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { UpcomingCourses } from "@/components/upcoming-courses"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function HomePage() {
  const supabase = await createClient()

  const { data: homepageContent } = await supabase
    .from("page_content")
    .select("content")
    .eq("page_key", "homepage")
    .maybeSingle()

  const content = homepageContent?.content || {}

  const contact = {
    address: "Schönbrunner Straße 181/1",
    city: "Wien",
    zip: "1120",
    phone: "+43 660 2020860",
    email: "alfa.taxischule@gmail.com",
  }

  const { data: courses } = await supabase
    .from("courses")
    .select("*")
    .gte("start_date", new Date().toISOString().split("T")[0])
    .order("start_date", { ascending: true })
    .limit(3)

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://alfataxischule.at",
    name: "ALFA Taxischule Wien",
    image: "https://alfataxischule.at/images/logo.svg",
    description:
      "Professionelle Taxilenker-Ausbildung in Wien. Moderne Lehrmethoden, erfahrene Kursleiter und persönliche Betreuung für Ihren Erfolg.",
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address,
      addressLocality: contact.city,
      postalCode: contact.zip,
      addressCountry: "AT",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 48.1867,
      longitude: 16.3385,
    },
    telephone: contact.phone,
    email: contact.email,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "11:00",
        closes: "16:00",
      },
    ],
    sameAs: [],
    priceRange: "€€",
    areaServed: {
      "@type": "City",
      name: "Wien",
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Header />
      <main>
        <HeroSection
          title={content.heroHeadline || "Ihre Taxischule in Wien"}
          subtitle={
            content.heroSubtitle ||
            "Professionelle Ausbildung für angehende Taxilenker mit modernen Lehrmethoden und persönlicher Betreuung"
          }
          ctaText={content.heroCTA || "Jetzt anmelden"}
        />

        <FeaturesSection
          features={[
            {
              title: content.feature1Title || "Moderne Ausbildung",
              description:
                content.feature1Text || "Innovative Lehrmethoden mit Praxis-Training und echten Stadtfahrten",
            },
            {
              title: content.feature2Title || "Erfahrene Kursleiter",
              description: content.feature2Text || "Jahrelange Erfahrung und persönliche Betreuung für Ihren Erfolg",
            },
            {
              title: content.feature3Title || "Optimales Lernklima",
              description:
                content.feature3Text || "Kleine Gruppen und strukturierte Lektionen für maximalen Lernerfolg",
            },
          ]}
        />

        {/* Introduction Section */}
        <section className="w-full py-20 bg-background">
          <div className="container max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-6">
              {content.introHeading || "Willkommen bei ALFA Taxischule"}
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground text-center">
              {content.introText ||
                "Bei ALFA Taxischule bieten wir Ihnen eine hochwertige Ausbildung zum Taxilenker in Wien. Mit erfahrenen Kursleitern, modernen Lehrmethoden und einer persönlichen Betreuung bereiten wir Sie optimal auf die Prüfung vor."}
            </p>
          </div>
        </section>

        {courses && courses.length > 0 && <UpcomingCourses courses={courses} />}

        {/* CTA Section */}
        <section className="w-full py-20 bg-secondary text-secondary-foreground">
          <div className="container text-center space-y-6">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {content.ctaHeading || "Bereit für Ihre Ausbildung?"}
            </h2>
            <p className="text-lg max-w-2xl mx-auto opacity-90">
              {content.ctaText ||
                "Kontaktieren Sie uns für weitere Informationen oder melden Sie sich direkt für einen Kurs an."}
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button asChild size="lg">
                <Link href="/kontakt">{content.ctaButton || "Kontakt aufnehmen"}</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-transparent border-secondary-foreground/20">
                <Link href="/kurse">Kurse ansehen</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
