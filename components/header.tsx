import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Phone, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Header() {
  const navLinks = [
    { href: "/", label: "Start" },
    { href: "/kurse", label: "Kurse" },
    { href: "/wie-werde-ich-taxilenker", label: "Taxilenker werden" },
    { href: "/dokumente", label: "Dokumente" },
    { href: "/kontakt", label: "Kontakt" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/images/logo.svg" alt="ALFA Taxischule Logo" width={50} height={50} className="h-12 w-auto" />
          <span className="text-xl font-bold text-foreground">ALFA Taxischule</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button asChild className="hidden md:flex">
            <Link href="/kontakt">
              <Phone className="mr-2 h-4 w-4" />
              Kontakt
            </Link>
          </Button>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Menü öffnen</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
