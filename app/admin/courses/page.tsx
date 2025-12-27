import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminNav } from "@/components/admin-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Calendar, Clock, Euro, GraduationCap } from "lucide-react"
import Link from "next/link"

export default async function AdminCoursesPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  const { data: courses } = await supabase.from("courses").select("*").order("start_date", { ascending: true })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("de-AT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  return (
    <div className="flex min-h-screen">
      <AdminNav />
      <main className="flex-1 p-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Kurse verwalten</h1>
              <p className="text-muted-foreground">Erstellen und bearbeiten Sie Taxilenkerkurse</p>
            </div>
            <Button asChild>
              <Link href="/admin/courses/new">
                <Plus className="h-4 w-4 mr-2" />
                Neuer Kurs
              </Link>
            </Button>
          </div>

          {courses && courses.length > 0 ? (
            <div className="grid gap-4">
              {courses.map((course) => (
                <Card key={course.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-xl">{course.type}</CardTitle>
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/admin/courses/${course.id}`}>Bearbeiten</Link>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3 md:grid-cols-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {formatDate(course.start_date)} - {formatDate(course.end_date)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{course.times}</span>
                      </div>
                      {course.price && (
                        <div className="flex items-center gap-2">
                          <Euro className="h-4 w-4 text-muted-foreground" />
                          <span className="font-semibold">€ {course.price.toFixed(2)}</span>
                        </div>
                      )}
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{course.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <GraduationCap className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">Noch keine Kurse vorhanden</p>
                <Button asChild>
                  <Link href="/admin/courses/new">
                    <Plus className="h-4 w-4 mr-2" />
                    Ersten Kurs erstellen
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
