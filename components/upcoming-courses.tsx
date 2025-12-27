import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock } from "lucide-react"
import Link from "next/link"
import type { Course } from "@/lib/types"

interface UpcomingCoursesProps {
  courses: Course[]
}

export function UpcomingCourses({ courses }: UpcomingCoursesProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("de-AT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  return (
    <section className="w-full py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Nächste Kurstermine</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Wählen Sie Ihren Wunschkurs und starten Sie Ihre Ausbildung zum professionellen Taxilenker.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          {courses.slice(0, 2).map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl">{course.type}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {formatDate(course.start_date)} - {formatDate(course.end_date)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{course.times}</span>
                </div>
                {course.price && <p className="text-2xl font-bold text-primary">€ {course.price.toFixed(2)}</p>}
                <Button asChild className="w-full">
                  <Link href="/kurse">Zur Anmeldung</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button asChild variant="outline" size="lg">
            <Link href="/kurse">Alle Kurse ansehen</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
