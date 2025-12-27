import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminNav } from "@/components/admin-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, Calendar } from "lucide-react"

export default async function AdminSubmissionsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  const { data: submissions } = await supabase
    .from("contact_submissions")
    .select("*")
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
            <h1 className="text-3xl font-bold mb-2">Kontaktanfragen</h1>
            <p className="text-muted-foreground">Übersicht aller eingegangenen Kontaktanfragen</p>
          </div>

          {submissions && submissions.length > 0 ? (
            <div className="space-y-4">
              {submissions.map((submission) => (
                <Card key={submission.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {submission.first_name} {submission.last_name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid gap-2 md:grid-cols-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <a href={`mailto:${submission.email}`} className="hover:text-primary">
                          {submission.email}
                        </a>
                      </div>
                      {submission.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <a href={`tel:${submission.phone}`} className="hover:text-primary">
                            {submission.phone}
                          </a>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{formatDate(submission.created_at)}</span>
                      </div>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-sm font-medium mb-1">Nachricht:</p>
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">{submission.message}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">Keine Kontaktanfragen vorhanden</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
