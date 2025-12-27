import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminNav } from "@/components/admin-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, FileText, MessageSquare, Users } from "lucide-react"

export default async function AdminDashboard() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  // Fetch statistics
  const { count: coursesCount } = await supabase.from("courses").select("*", { count: "exact", head: true })

  const { count: documentsCount } = await supabase.from("documents").select("*", { count: "exact", head: true })

  const { count: submissionsCount } = await supabase
    .from("contact_submissions")
    .select("*", { count: "exact", head: true })

  const { count: registrationsCount } = await supabase
    .from("course_registrations")
    .select("*", { count: "exact", head: true })

  const stats = [
    {
      title: "Aktive Kurse",
      value: coursesCount || 0,
      icon: GraduationCap,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Dokumente",
      value: documentsCount || 0,
      icon: FileText,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Kontaktanfragen",
      value: submissionsCount || 0,
      icon: MessageSquare,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Kursanmeldungen",
      value: registrationsCount || 0,
      icon: Users,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ]

  return (
    <div className="flex min-h-screen">
      <AdminNav />
      <main className="flex-1 p-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Willkommen im ALFA Taxischule Verwaltungsbereich</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <Card key={stat.title}>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                    <div className={`p-2 rounded-full ${stat.bgColor}`}>
                      <Icon className={`h-4 w-4 ${stat.color}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{stat.value}</div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Schnellzugriff</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <a href="/admin/courses" className="block p-4 rounded-md hover:bg-muted transition-colors border">
                  <div className="font-medium">Kurse verwalten</div>
                  <p className="text-sm text-muted-foreground">Neue Kurse hinzufügen oder bestehende bearbeiten</p>
                </a>
                <a href="/admin/documents" className="block p-4 rounded-md hover:bg-muted transition-colors border">
                  <div className="font-medium">Dokumente verwalten</div>
                  <p className="text-sm text-muted-foreground">Dokumente hochladen und organisieren</p>
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Aktuelle Aktivität</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {submissionsCount && submissionsCount > 0 ? (
                    <div className="p-3 bg-muted rounded-md">
                      <p className="text-sm">
                        <span className="font-semibold">{submissionsCount}</span> neue Kontaktanfrage(n)
                      </p>
                    </div>
                  ) : null}
                  {registrationsCount && registrationsCount > 0 ? (
                    <div className="p-3 bg-muted rounded-md">
                      <p className="text-sm">
                        <span className="font-semibold">{registrationsCount}</span> neue Kursanmeldung(en)
                      </p>
                    </div>
                  ) : null}
                  {!submissionsCount && !registrationsCount && (
                    <p className="text-sm text-muted-foreground">Keine neuen Aktivitäten</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
