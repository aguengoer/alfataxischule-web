import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminNav } from "@/components/admin-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GuideCMSForm } from "@/components/admin/guide-cms-form"

export default async function GuideCMSPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  // Fetch guide content
  const { data: pageContent } = await supabase.from("page_content").select("*").eq("page_key", "guide").single()

  return (
    <div className="flex min-h-screen">
      <AdminNav />
      <main className="flex-1 p-8 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Leitfaden bearbeiten</h1>
            <p className="text-muted-foreground">Bearbeiten Sie die Seite "Wie werde ich Taxilenker"</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Leitfaden Inhalte</CardTitle>
            </CardHeader>
            <CardContent>
              <GuideCMSForm initialData={pageContent?.content || {}} />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
