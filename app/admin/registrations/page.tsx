import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminNav } from "@/components/admin-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, Calendar, GraduationCap } from "lucide-react"

export default async function AdminRegistrationsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  const { data: registrations } = await supabase
    .from("course_registrations")
    .select("*, courses(type)")
    .order("created_at", { ascending: false })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("de-AT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="flex min-h-screen">
      <AdminNav />
      <main className="flex-1 p-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Kursanmeldungen</h1>
            <p className="text-muted-foreground">Übersicht aller Kursanmeldungen</p>
          </div>

          {registrations && registrations.length > 0 ? (
            <div className="space-y-4">
              {registrations.map((registration) => (
                <Card key={registration.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {registration.first_name} {registration.last_name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid gap-2 md:grid-cols-2 text-sm">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{(registration.courses as any)?.type || "Unbekannter Kurs"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{formatDate(registration.created_at)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <a href={`mailto:${registration.email}`} className="hover:text-primary">
                          {registration.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <a href={`tel:${registration.phone}`} className="hover:text-primary">
                          {registration.phone}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">Keine Kursanmeldungen vorhanden</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
