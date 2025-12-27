"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { createBrowserClient } from "@/lib/supabase/client"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function DocumentActions({ document }: { document: any }) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const supabase = createBrowserClient()

  const toggleActive = async () => {
    setIsLoading(true)
    try {
      const { error } = await supabase
        .from("documents")
        .update({ is_active: !document.is_active })
        .eq("id", document.id)

      if (error) throw error

      toast({
        title: "Aktualisiert",
        description: `Dokument ${!document.is_active ? "aktiviert" : "deaktiviert"}.`,
      })
      router.refresh()
    } catch (error) {
      toast({
        title: "Fehler",
        description: "Dokument konnte nicht aktualisiert werden.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const deleteDocument = async () => {
    setIsLoading(true)
    try {
      const { error } = await supabase.from("documents").delete().eq("id", document.id)

      if (error) throw error

      toast({
        title: "Gelöscht",
        description: "Dokument wurde erfolgreich gelöscht.",
      })
      router.refresh()
    } catch (error) {
      toast({
        title: "Fehler",
        description: "Dokument konnte nicht gelöscht werden.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex gap-2">
      <Button variant="outline" size="sm" onClick={toggleActive} disabled={isLoading}>
        {document.is_active ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" size="sm" disabled={isLoading}>
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Dokument löschen?</AlertDialogTitle>
            <AlertDialogDescription>
              Sind Sie sicher, dass Sie dieses Dokument löschen möchten? Diese Aktion kann nicht rückgängig gemacht
              werden.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Abbrechen</AlertDialogCancel>
            <AlertDialogAction onClick={deleteDocument} className="bg-destructive text-destructive-foreground">
              Löschen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
