import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminNav } from "@/components/admin-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ContactCMSForm } from "@/components/admin/contact-cms-form"

export default async function ContactCMSPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  // Fetch contact settings
  const { data: settings } = await supabase.from("site_settings").select("*").eq("key", "contact").single()

  return (
    <div className="flex min-h-screen">
      <AdminNav />
      <main className="flex-1 p-8 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Kontakt-Einstellungen</h1>
            <p className="text-muted-foreground">Bearbeiten Sie Adresse, Telefon, E-Mail und Öffnungszeiten</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Kontaktdaten</CardTitle>
            </CardHeader>
            <CardContent>
              <ContactCMSForm initialData={settings?.value || {}} />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
