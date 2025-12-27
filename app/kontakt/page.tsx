import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = {
  title: "Kontakt | ALFA Taxischule Wien",
  description:
    "Kontaktieren Sie ALFA Taxischule Wien. Besuchen Sie uns, rufen Sie an oder schreiben Sie uns. Wir sind gerne für Sie da.",
  keywords: ["Taxischule Wien Kontakt", "ALFA Taxischule Adresse", "Taxischule Telefon"],
}

export default async function KontaktPage() {
  const supabase = await createClient()

  const { data: contactSettings } = await supabase.from("site_settings").select("value").eq("key", "contact").single()

  const contact = contactSettings?.value || {
    address: "Schönbrunner Straße 181/1",
    zip: "1120",
    city: "Wien",
    phone: "+43 660 2020860",
    email: "alfa.taxischule@gmail.com",
    openingHours: "Mo-Fr: 11:00-16:00 Uhr\nSa-So: Geschlossen",
  }

  return (
    <>
      <Header />
      <main>
        {/* Page Header */}
        <section className="w-full py-16 bg-secondary text-secondary-foreground">
          <div className="container">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">Kontakt</h1>
            <p className="text-lg max-w-3xl opacity-90">
              Wir freuen uns auf Ihre Nachricht. Kontaktieren Sie uns telefonisch, per E-Mail oder besuchen Sie uns
              persönlich während unserer Öffnungszeiten.
            </p>
          </div>
        </section>

        {/* Contact Info & Form */}
        <section className="w-full py-16">
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-5">
              {/* Contact Information */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-6">Kontaktinformationen</h2>

                  <div className="space-y-6">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                              <MapPin className="h-6 w-6 text-primary" />
                            </div>
                          </div>
                          <div>
                            <h3 className="font-semibold mb-1">Adresse</h3>
                            <p className="text-muted-foreground">
                              {contact.address}
                              <br />
                              {contact.zip} {contact.city}
                              <br />
                              Österreich
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                              <Phone className="h-6 w-6 text-primary" />
                            </div>
                          </div>
                          <div>
                            <h3 className="font-semibold mb-1">Telefon</h3>
                            <a
                              href={`tel:${contact.phone?.replace(/\s/g, "")}`}
                              className="text-muted-foreground hover:text-primary transition-colors"
                            >
                              {contact.phone}
                            </a>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                              <Mail className="h-6 w-6 text-primary" />
                            </div>
                          </div>
                          <div>
                            <h3 className="font-semibold mb-1">E-Mail</h3>
                            <a
                              href={`mailto:${contact.email}`}
                              className="text-muted-foreground hover:text-primary transition-colors break-all"
                            >
                              {contact.email}
                            </a>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                              <Clock className="h-6 w-6 text-primary" />
                            </div>
                          </div>
                          <div>
                            <h3 className="font-semibold mb-1">Öffnungszeiten</h3>
                            <div className="text-muted-foreground whitespace-pre-line">{contact.openingHours}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-3">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="w-full py-16 bg-muted/30">
          <div className="container">
            <h2 className="text-2xl font-bold mb-6">So finden Sie uns</h2>
            <div className="w-full h-[450px] rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2661.234!2d16.3385!3d48.1867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476d07a6f8b5c5d1%3A0x123456789!2sSchönbrunner%20Straße%20181%2C%201120%20Wien!5e0!3m2!1sde!2sat!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="ALFA Taxischule Wien Standort"
              />
            </div>
            <p className="mt-4 text-sm text-muted-foreground text-center">
              Wir befinden uns im 12. Bezirk Wiens, gut erreichbar mit öffentlichen Verkehrsmitteln.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
