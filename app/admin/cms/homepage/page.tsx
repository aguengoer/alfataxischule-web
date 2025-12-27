import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminNav } from "@/components/admin-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HomepageCMSForm } from "@/components/admin/homepage-cms-form"

export default async function HomepageCMSPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  // Fetch homepage content
  const { data: pageContent } = await supabase.from("page_content").select("*").eq("page_key", "homepage").single()

  return (
    <div className="flex min-h-screen">
      <AdminNav />
      <main className="flex-1 p-8 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Homepage Inhalte bearbeiten</h1>
            <p className="text-muted-foreground">Bearbeiten Sie alle Texte der Startseite</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Homepage Texte</CardTitle>
            </CardHeader>
            <CardContent>
              <HomepageCMSForm initialData={pageContent?.content || {}} />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
