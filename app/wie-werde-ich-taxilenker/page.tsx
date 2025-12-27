import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, GraduationCap, Heart } from "lucide-react"
import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = {
  title: "Wie werde ich Taxilenker? | ALFA Taxischule Wien",
  description:
    "Schritt-für-Schritt Anleitung: So erhalten Sie Ihren Taxi-Lenker-Ausweis in Wien. Alle Voraussetzungen, Kurse und Prüfungen im Überblick.",
  keywords: ["Taxilenker werden", "Taxi-Lenker-Ausweis Wien", "Taxiprüfung Voraussetzungen", "Taxischein Wien"],
}

export default async function TaxilenkerGuidePage() {
  const supabase = await createClient()

  const { data: guideContent } = await supabase.from("page_content").select("content").eq("page_key", "guide").single()

  const content = guideContent?.content || {}
  const steps = content.steps || []

  return (
    <>
      <Header />
      <main>
        {/* Page Header */}
        <section className="w-full py-16 bg-secondary text-secondary-foreground">
          <div className="container">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
              {content.pageTitle || "Wie werde ich Taxilenker?"}
            </h1>
            <p className="text-lg max-w-3xl opacity-90">
              {content.pageIntro ||
                "Folgen Sie diesen Schritten, um Ihren Taxi-Lenker-Ausweis in Wien zu erhalten. Wir begleiten Sie auf Ihrem Weg zum professionellen Taxilenker."}
            </p>
          </div>
        </section>

        {/* Steps Section */}
        <section className="w-full py-16">
          <div className="container max-w-4xl">
            <div className="space-y-6">
              {steps.map((step: any, index: number) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xl font-bold text-primary">{index + 1}</span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                        <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                          {step.description}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Important Info */}
            <div className="mt-12 p-6 bg-primary/5 border-l-4 border-primary rounded-r-lg">
              <div className="flex gap-3">
                <AlertCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Wichtiger Hinweis</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Die Anmeldung zur Prüfung muss spätestens 10 Tage vor dem Prüfungstermin erfolgen. Bringen Sie alle
                    erforderlichen Dokumente und Nachweise zur Anmeldung mit. Für weitere Fragen stehen wir Ihnen gerne
                    zur Verfügung.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Links */}
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <Card className="bg-primary text-primary-foreground">
                <CardContent className="p-6 text-center">
                  <GraduationCap className="h-12 w-12 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Kurs buchen</h3>
                  <p className="mb-4 opacity-90">Melden Sie sich jetzt für einen Taxilenkerkurs an.</p>
                  <a
                    href="/kurse"
                    className="inline-flex items-center justify-center rounded-md bg-primary-foreground text-primary px-6 py-2 text-sm font-medium shadow transition-colors hover:opacity-90"
                  >
                    Zu den Kursen
                  </a>
                </CardContent>
              </Card>

              <Card className="bg-secondary text-secondary-foreground">
                <CardContent className="p-6 text-center">
                  <Heart className="h-12 w-12 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Externe Links</h3>
                  <p className="mb-4 opacity-90">Weiterführende Informationen und Ressourcen</p>
                  <div className="space-y-2 text-sm">
                    {content.wkoLink && (
                      <a
                        href={content.wkoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block underline hover:no-underline"
                      >
                        WKO Wien
                      </a>
                    )}
                    {content.magistratLink && (
                      <a
                        href={content.magistratLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block underline hover:no-underline"
                      >
                        Magistrat Wien
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
