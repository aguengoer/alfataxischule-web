import { GraduationCap, Users, Award } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface Feature {
  title: string
  description: string
}

interface FeaturesSectionProps {
  features: Feature[]
}

export function FeaturesSection({ features }: FeaturesSectionProps) {
  const icons = [GraduationCap, Users, Award]

  return (
    <section className="w-full py-20 bg-muted/30">
      <div className="container">
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = icons[index] || GraduationCap
            return (
              <Card key={index} className="border-2 hover:border-primary transition-colors">
                <CardContent className="pt-8 pb-8 text-center space-y-4">
                  <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
