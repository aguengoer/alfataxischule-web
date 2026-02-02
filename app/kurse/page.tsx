import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, Euro, Info, CheckCircle } from "lucide-react"
import { CourseRegistrationForm } from "@/components/course-registration-form"
import { createClient } from "@/lib/supabase/server"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export const metadata: Metadata = {
  title: "Kurse | ALFA Taxischule Wien",
  description:
    "Taxilenkerkurs und Gewerbekurs in Wien. Intensive Vorbereitung auf die Taxilenker-Prüfung mit modernen Lehrmethoden.",
  keywords: ["Taxilenkerkurs Wien", "Gewerbekurs", "Taxi Prüfung", "Kursanmeldung"],
}

export default async function KursePage() {
  const supabase = await createClient()

  const { data: courses } = await supabase
    .from("courses")
    .select("*")
    .eq("is_active", true)
    .gte("start_date", new Date().toISOString().split("T")[0])
    .order("start_date", { ascending: true })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("de-AT", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
  }

  const formatDateShort = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("de-AT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  return (
    <>
      <Header />
      <main>
        {/* Page Header */}
        <section className="w-full py-16 bg-secondary text-secondary-foreground">
          <div className="container">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">Unsere Kurse</h1>
            <p className="text-lg max-w-3xl opacity-90">
              Wählen Sie den passenden Kurs für Ihre Taxilenker-Ausbildung. Unsere Kurse bereiten Sie optimal auf die
              Prüfung vor.
            </p>
          </div>
        </section>

        {/* Exam Information */}
        <section className="w-full py-12 bg-muted/30">
          <div className="container max-w-4xl">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Über die Taxilenker-Prüfung</AlertTitle>
              <AlertDescription className="mt-2 space-y-2">
                <p>
                  <strong>Block 1:</strong> Ortskunde, Routen und Bilder – Sie lernen die wichtigsten Routen und
                  Orientierungspunkte in Wien kennen.
                </p>
                <p>
                  <strong>Block 2:</strong> Wiener Landesbetriebsordnung, Tarif, StVO, KFG sowie Arbeits- und
                  Sozialrecht.
                </p>
                <p className="text-sm text-muted-foreground mt-4">
                  Prüfungsgebühr: € 172,30 | Wiederholungsprüfung: € 80,00 (nur bargeldlose Zahlung) | Anmeldeschluss:
                  10 Tage vor Prüfungstermin
                </p>
              </AlertDescription>
            </Alert>
          </div>
        </section>

        {/* Courses List */}
        <section className="w-full py-16">
          <div className="container">
            {courses && courses.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {courses.map((course) => (
                  <Card key={course.id} className="hover:shadow-lg transition-shadow flex flex-col">
                    <CardHeader>
                      <CardTitle className="text-2xl">{course.type}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 flex-1 flex flex-col">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-start gap-2">
                          <Calendar className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium">Kursdauer</p>
                            <p className="text-sm text-muted-foreground">
                              {formatDateShort(course.start_date)}
                              {course.end_date && ` - ${formatDateShort(course.end_date)}`}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <Clock className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium">Kurszeiten</p>
                            <p className="text-sm text-muted-foreground">{course.times}</p>
                          </div>
                        </div>

                        {course.price && (
                          <div className="flex items-start gap-2">
                            <Euro className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="font-medium">Preis</p>
                              <p className="text-2xl font-bold text-primary">€ {course.price.toFixed(2)}</p>
                              <p className="text-xs text-muted-foreground">inkl. MwSt.</p>
                            </div>
                          </div>
                        )}

                        <div className="pt-2 border-t">
                          <p className="text-sm text-muted-foreground leading-relaxed">{course.description}</p>
                        </div>

                        {course.includes && (
                          <div className="pt-2">
                            <p className="font-medium text-sm mb-2 flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-primary" />
                              Im Preis enthalten:
                            </p>
                            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                              {course.includes}
                            </p>
                          </div>
                        )}

                        {course.prerequisites && (
                          <div className="pt-2">
                            <p className="font-medium text-sm mb-1">Voraussetzungen:</p>
                            <p className="text-sm text-muted-foreground leading-relaxed">{course.prerequisites}</p>
                          </div>
                        )}
                      </div>

                      <CourseRegistrationForm course={course} />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  Aktuell sind keine Kurse verfügbar. Bitte kontaktieren Sie uns für weitere Informationen.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Pricing Table */}
        <section className="w-full py-16 bg-muted/30">
          <div className="container max-w-4xl">
            <h2 className="text-3xl font-bold mb-8 text-center">Kursübersicht</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-card rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-secondary text-secondary-foreground">
                    <th className="px-6 py-4 text-left font-semibold">Kurstyp</th>
                    <th className="px-6 py-4 text-left font-semibold">Datum</th>
                    <th className="px-6 py-4 text-left font-semibold">Zeiten</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="px-6 py-4 align-top">Taxilenkerkurs</td>
                    <td className="px-6 py-4 align-top">
                      <ul className="space-y-1.5">
                        <li className="flex items-center gap-2">
                          <span className="size-1.5 rounded-full bg-primary shrink-0" aria-hidden />
                          09.02. – 12.02.
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="size-1.5 rounded-full bg-primary shrink-0" aria-hidden />
                          02.03. – 05.03.
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="size-1.5 rounded-full bg-primary shrink-0" aria-hidden />
                          23.03. – 26.03.
                        </li>
                      </ul>
                    </td>
                    <td className="px-6 py-4 align-top">16:30 – 20:30 Uhr</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-6 py-4">Gewerbekurs</td>
                    <td className="px-6 py-4">16., 17., 18., 19., 20., 23., 24., 25. Februar</td>
                    <td className="px-6 py-4">16:30 – 20:30 Uhr</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-muted-foreground" colSpan={3}>
                      Persönliche Anmeldung während der Öffnungszeiten möglich: Mo-Fr 11:00-16:00 Uhr
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
