import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminNav } from "@/components/admin-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CourseForm } from "@/components/admin/course-form"

export default async function NewCoursePage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  return (
    <div className="flex min-h-screen">
      <AdminNav />
      <main className="flex-1 p-8 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Neuer Kurs</h1>
            <p className="text-muted-foreground">Erstellen Sie einen neuen Taxilenkerkurs</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Kursdetails</CardTitle>
            </CardHeader>
            <CardContent>
              <CourseForm />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
