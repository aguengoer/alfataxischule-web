import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Download, ExternalLink } from "lucide-react"
import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = {
  title: "Dokumente & Downloads | ALFA Taxischule Wien",
  description:
    "Wichtige Dokumente für Taxilenker in Wien: Taxitarif, Standplatzverzeichnis, Sonderspuren und weitere hilfreiche Downloads.",
  keywords: ["Taxidokumente Wien", "Wiener Taxitarif", "Taxistandplätze", "Taxi Downloads"],
}

export default async function DokumentePage() {
  const supabase = await createClient()

  const { data: documents } = await supabase
    .from("documents")
    .select("*")
    .eq("is_active", true)
    .order("category", { ascending: true })

  // Group documents by category
  const groupedDocuments =
    documents?.reduce(
      (acc, doc) => {
        const category = doc.category || "Allgemein"
        if (!acc[category]) {
          acc[category] = []
        }
        acc[category].push(doc)
        return acc
      },
      {} as Record<string, typeof documents>,
    ) || {}

  return (
    <>
      <Header />
      <main>
        {/* Page Header */}
        <section className="w-full py-16 bg-secondary text-secondary-foreground">
          <div className="container">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">Dokumente & Downloads</h1>
            <p className="text-lg max-w-3xl opacity-90">
              Hier finden Sie wichtige Dokumente und Informationen für Taxilenker in Wien. Alle Dateien stehen zum
              kostenlosen Download zur Verfügung.
            </p>
          </div>
        </section>

        {/* Documents Section */}
        <section className="w-full py-16">
          <div className="container max-w-4xl">
            {Object.keys(groupedDocuments).length > 0 ? (
              <div className="space-y-12">
                {Object.entries(groupedDocuments).map(([category, docs]) => (
                  <div key={category}>
                    <h2 className="text-2xl font-bold mb-6">{category}</h2>
                    <div className="grid gap-4">
                      {docs.map((doc) => (
                        <Card key={doc.id} className="hover:shadow-md transition-shadow">
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                  <FileText className="h-6 w-6 text-primary" />
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-semibold mb-1">{doc.title}</h3>
                                {doc.description && (
                                  <p className="text-sm text-muted-foreground mb-3">{doc.description}</p>
                                )}
                                <a
                                  href={doc.file_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                                >
                                  <Download className="h-4 w-4" />
                                  Dokument herunterladen
                                </a>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-lg text-muted-foreground">Aktuell sind keine Dokumente verfügbar.</p>
              </div>
            )}

            {/* External Resources */}
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6">Weitere Ressourcen</h2>
              <Card className="bg-muted/50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <ExternalLink className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Wirtschaftskammer Österreich (WKO)</h3>
                      <p className="text-muted-foreground mb-3">
                        Weitere wichtige Dokumente und Informationen für Taxiunternehmer finden Sie auf der Website der
                        WKO.
                      </p>
                      <a
                        href="https://www.wko.at"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                      >
                        Zur WKO Website
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
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
