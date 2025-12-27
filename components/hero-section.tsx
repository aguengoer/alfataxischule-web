import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface HeroSectionProps {
  title: string
  subtitle: string
  ctaText: string
}

export function HeroSection({ title, subtitle, ctaText }: HeroSectionProps) {
  return (
    <section className="relative w-full min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/vienna-taxi-at-night-city-lights.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
      </div>

      {/* Content */}
      <div className="container relative z-10 py-32 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl text-balance mb-6">
          {title}
        </h1>
        <p className="mx-auto max-w-2xl text-xl text-white/90 sm:text-2xl text-balance mb-10">{subtitle}</p>
        <Button asChild size="lg" className="text-lg px-8 py-6 h-auto">
          <Link href="/kurse">
            {ctaText}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  )
}
