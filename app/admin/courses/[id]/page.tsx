import { redirect, notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminNav } from "@/components/admin-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CourseForm } from "@/components/admin/course-form"

export default async function EditCoursePage({ params }: { params: { id: string } }) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  const { data: course } = await supabase.from("courses").select("*").eq("id", params.id).single()

  if (!course) {
    notFound()
  }

  return (
    <div className="flex min-h-screen">
      <AdminNav />
      <main className="flex-1 p-8 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Kurs bearbeiten</h1>
            <p className="text-muted-foreground">Bearbeiten Sie die Kursdetails</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Kursdetails</CardTitle>
            </CardHeader>
            <CardContent>
              <CourseForm initialData={course} courseId={course.id} />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
