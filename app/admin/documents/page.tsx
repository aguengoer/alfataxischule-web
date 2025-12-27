import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminNav } from "@/components/admin-nav"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, FileText, Eye, EyeOff } from "lucide-react"
import { DocumentActions } from "@/components/admin/document-actions"

export default async function AdminDocumentsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  const { data: documents } = await supabase.from("documents").select("*").order("category", { ascending: true })

  return (
    <div className="flex min-h-screen">
      <AdminNav />
      <main className="flex-1 p-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Dokumente verwalten</h1>
              <p className="text-muted-foreground">Dokumente hochladen und organisieren</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Neues Dokument
            </Button>
          </div>

          {documents && documents.length > 0 ? (
            <div className="grid gap-4">
              {documents.map((doc) => (
                <Card key={doc.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <FileText className="h-6 w-6 text-primary" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-semibold">{doc.title}</h3>
                            {doc.is_active ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                <Eye className="h-3 w-3" />
                                Aktiv
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                                <EyeOff className="h-3 w-3" />
                                Inaktiv
                              </span>
                            )}
                          </div>
                          {doc.category && (
                            <p className="text-sm text-muted-foreground mb-1">Kategorie: {doc.category}</p>
                          )}
                          {doc.description && <p className="text-sm text-muted-foreground">{doc.description}</p>}
                          <a
                            href={doc.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:underline mt-2 inline-block"
                          >
                            {doc.file_url}
                          </a>
                        </div>
                      </div>
                      <DocumentActions document={doc} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">Noch keine Dokumente vorhanden</p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Erstes Dokument hinzufügen
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
