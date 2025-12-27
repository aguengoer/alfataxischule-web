"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import { createBrowserClient } from "@/lib/supabase/client"

interface CourseFormData {
  type: string
  start_date: string
  end_date: string
  times: string
  description: string
  prerequisites: string
  price: number
  includes: string
  is_active: boolean
}

export function CourseForm({ initialData, courseId }: { initialData?: any; courseId?: string }) {
  const [formData, setFormData] = useState<CourseFormData>({
    type: initialData?.type || "",
    start_date: initialData?.start_date || "",
    end_date: initialData?.end_date || "",
    times: initialData?.times || "",
    description: initialData?.description || "",
    prerequisites: initialData?.prerequisites || "",
    price: initialData?.price || 0,
    includes: initialData?.includes || "",
    is_active: initialData?.is_active ?? true,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const supabase = createBrowserClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (courseId) {
        // Update existing course
        const { error } = await supabase
          .from("courses")
          .update({ ...formData, updated_at: new Date().toISOString() })
          .eq("id", courseId)

        if (error) throw error

        toast({
          title: "Gespeichert",
          description: "Kurs wurde erfolgreich aktualisiert.",
        })
      } else {
        // Create new course
        const { error } = await supabase.from("courses").insert([formData])

        if (error) throw error

        toast({
          title: "Erstellt",
          description: "Neuer Kurs wurde erfolgreich erstellt.",
        })
      }

      router.push("/admin/courses")
      router.refresh()
    } catch (error) {
      console.error(error)
      toast({
        title: "Fehler",
        description: "Kurs konnte nicht gespeichert werden.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateField = (field: keyof CourseFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="type">Kurstyp</Label>
        <Input
          id="type"
          value={formData.type}
          onChange={(e) => updateField("type", e.target.value)}
          placeholder="z.B. Taxilenkerkurs oder Gewerbekurs"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="start_date">Startdatum</Label>
          <Input
            id="start_date"
            type="date"
            value={formData.start_date}
            onChange={(e) => updateField("start_date", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="end_date">Enddatum</Label>
          <Input
            id="end_date"
            type="date"
            value={formData.end_date}
            onChange={(e) => updateField("end_date", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="times">Kurszeiten</Label>
        <Input
          id="times"
          value={formData.times}
          onChange={(e) => updateField("times", e.target.value)}
          placeholder="z.B. 16:30 - 20:30"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Beschreibung</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => updateField("description", e.target.value)}
          rows={4}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="includes">Inkludierte Leistungen</Label>
        <Textarea
          id="includes"
          value={formData.includes}
          onChange={(e) => updateField("includes", e.target.value)}
          placeholder="z.B. 3 Monate Lernsystem (App), Kurskatalog, Stadtplan"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="prerequisites">Voraussetzungen</Label>
        <Textarea
          id="prerequisites"
          value={formData.prerequisites}
          onChange={(e) => updateField("prerequisites", e.target.value)}
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Preis (€)</Label>
        <Input
          id="price"
          type="number"
          step="0.01"
          value={formData.price}
          onChange={(e) => updateField("price", Number.parseFloat(e.target.value))}
          required
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="is_active"
          checked={formData.is_active}
          onCheckedChange={(checked) => updateField("is_active", checked)}
        />
        <Label htmlFor="is_active">Kurs ist aktiv und wird auf der Website angezeigt</Label>
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={isSubmitting} className="flex-1">
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {courseId ? "Änderungen speichern" : "Kurs erstellen"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/courses")}>
          Abbrechen
        </Button>
      </div>
    </form>
  )
}
