import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full border-t bg-secondary text-secondary-foreground">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/images/logo.svg" alt="ALFA Taxischule Logo" width={50} height={50} className="h-12 w-auto" />
              <span className="text-lg font-bold">ALFA Taxischule</span>
            </Link>
            <p className="text-sm text-secondary-foreground/80">
              Ihre moderne Taxischule in Wien für professionelle Ausbildung und persönliche Betreuung.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/kurse" className="hover:text-primary transition-colors">
                  Kurse
                </Link>
              </li>
              <li>
                <Link href="/wie-werde-ich-taxilenker" className="hover:text-primary transition-colors">
                  Taxilenker werden
                </Link>
              </li>
              <li>
                <Link href="/dokumente" className="hover:text-primary transition-colors">
                  Dokumente
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="hover:text-primary transition-colors">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Kontakt</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>
                  Schönbrunner Straße 181/1
                  <br />
                  1120 Wien
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a href="tel:+436602020860" className="hover:text-primary transition-colors">
                  +43 660 2020860
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a href="mailto:alfa.taxischule@gmail.com" className="hover:text-primary transition-colors">
                  alfa.taxischule@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Öffnungszeiten</h3>
            <div className="flex items-start gap-2 text-sm">
              <Clock className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <div>
                <p>Mo-Fr: 11:00-16:00 Uhr</p>
                <p className="text-secondary-foreground/80">Sa-So: Geschlossen</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-secondary-foreground/20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-secondary-foreground/80">
            <p>&copy; {new Date().getFullYear()} ALFA Taxischule. Alle Rechte vorbehalten.</p>
            <Link href="/impressum" className="hover:text-primary transition-colors underline-offset-4 hover:underline">
              Impressum
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
