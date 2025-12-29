import { Building2, Mail, Phone, MapPin, FileText } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export const metadata = {
  title: "Impressum | ALFA Taxischule",
  description: "Impressum und rechtliche Informationen der ALFA Taxischule Wien",
}

export default function ImpressumPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container max-w-4xl">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-balance">Impressum</h1>
            <p className="text-lg text-muted-foreground">Informationspflicht laut § 5 TMG und § 25 MedienG</p>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {/* Company Name */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-primary">
                    <Building2 className="h-5 w-5" />
                    <h2 className="text-xl font-semibold">Firmenname</h2>
                  </div>
                  <p className="text-lg font-medium">ALFA Taxischule</p>
                  <p className="text-lg font-medium">Alper Culu</p>
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-primary">
                    <MapPin className="h-5 w-5" />
                    <h2 className="text-xl font-semibold">Anschrift</h2>
                  </div>
                  <p className="text-muted-foreground">
                    Griegstraße 1-3/7/10
                    <br />
                    1200 Wien
                    <br />
                    Österreich
                  </p>
                </div>

                {/* Contact */}
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold">Kontaktdaten</h2>
                  <div className="space-y-2 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <a href="tel:+436602020860" className="hover:text-primary transition-colors">
                        +43 660 2020860
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <a href="mailto:alfa.taxischule@gmail.com" className="hover:text-primary transition-colors">
                        alfa.taxischule@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* Business Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-primary">
                    <FileText className="h-5 w-5" />
                    <h2 className="text-xl font-semibold">Unternehmensangaben</h2>
                  </div>
                  <div className="space-y-1 text-muted-foreground">
                    <p>
                      <span className="font-medium text-foreground">UID-Nummer:</span> ATU71832412
                    </p>
                    <p>
                      <span className="font-medium text-foreground">Beginndatum der Rechtsform:</span> 21.12.2016
                    </p>
                    <p>
                      <span className="font-medium text-foreground">Tätigkeitsbeschreibung:</span> Taxigewerbe
                    </p>
                    <p>
                      <span className="font-medium text-foreground">Fuhrpark:</span> 2 PKW
                    </p>
                  </div>
                </div>

                {/* Legal Disclaimer */}
                <div className="pt-6 border-t space-y-4">
                  <h2 className="text-xl font-semibold">Haftungsausschluss</h2>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div>
                      <h3 className="font-medium text-foreground mb-1">Haftung für Inhalte</h3>
                      <p>
                        Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
                        Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">Haftung für Links</h3>
                      <p>
                        Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss
                        haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">Urheberrecht</h3>
                      <p>
                        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem
                        österreichischen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
                        Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des
                        jeweiligen Autors bzw. Erstellers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
