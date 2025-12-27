"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Plus, X } from "lucide-react"
import { createBrowserClient } from "@/lib/supabase/client"

interface GuideStep {
  title: string
  description: string
}

interface GuideData {
  pageTitle?: string
  pageIntro?: string
  steps?: GuideStep[]
  wkoLink?: string
  magistratLink?: string
}

export function GuideCMSForm({ initialData }: { initialData: GuideData }) {
  const [formData, setFormData] = useState<GuideData>({
    ...initialData,
    steps: initialData.steps || [],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const supabase = createBrowserClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const { error } = await supabase
        .from("page_content")
        .upsert({ page_key: "guide", content: formData, updated_at: new Date().toISOString() })

      if (error) throw error

      toast({
        title: "Gespeichert",
        description: "Leitfaden wurde erfolgreich aktualisiert.",
      })
    } catch (error) {
      console.error(error)
      toast({
        title: "Fehler",
        description: "Inhalte konnten nicht gespeichert werden.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateField = (field: keyof GuideData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addStep = () => {
    setFormData((prev) => ({
      ...prev,
      steps: [...(prev.steps || []), { title: "", description: "" }],
    }))
  }

  const removeStep = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      steps: prev.steps?.filter((_, i) => i !== index),
    }))
  }

  const updateStep = (index: number, field: keyof GuideStep, value: string) => {
    setFormData((prev) => ({
      ...prev,
      steps: prev.steps?.map((step, i) => (i === index ? { ...step, [field]: value } : step)),
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4 p-4 border rounded-lg">
        <h3 className="text-lg font-semibold">Allgemein</h3>
        <div className="space-y-2">
          <Label htmlFor="pageTitle">Seitentitel</Label>
          <Input
            id="pageTitle"
            value={formData.pageTitle || ""}
            onChange={(e) => updateField("pageTitle", e.target.value)}
            placeholder="z.B. Wie werde ich Taxilenker in Wien?"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pageIntro">Einleitungstext</Label>
          <Textarea
            id="pageIntro"
            value={formData.pageIntro || ""}
            onChange={(e) => updateField("pageIntro", e.target.value)}
            rows={4}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Schritte</h3>
          <Button type="button" onClick={addStep} size="sm" variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Schritt hinzufügen
          </Button>
        </div>

        {formData.steps?.map((step, index) => (
          <div key={index} className="space-y-4 p-4 border rounded-lg relative">
            <Button
              type="button"
              onClick={() => removeStep(index)}
              size="icon"
              variant="ghost"
              className="absolute top-2 right-2"
            >
              <X className="h-4 w-4" />
            </Button>
            <h4 className="font-medium">Schritt {index + 1}</h4>
            <div className="space-y-2">
              <Label htmlFor={`step-title-${index}`}>Titel</Label>
              <Input
                id={`step-title-${index}`}
                value={step.title}
                onChange={(e) => updateStep(index, "title", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`step-desc-${index}`}>Beschreibung</Label>
              <Textarea
                id={`step-desc-${index}`}
                value={step.description}
                onChange={(e) => updateStep(index, "description", e.target.value)}
                rows={4}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4 p-4 border rounded-lg">
        <h3 className="text-lg font-semibold">Externe Links</h3>
        <div className="space-y-2">
          <Label htmlFor="wkoLink">WKO Link</Label>
          <Input
            id="wkoLink"
            value={formData.wkoLink || ""}
            onChange={(e) => updateField("wkoLink", e.target.value)}
            placeholder="https://..."
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="magistratLink">Magistrat Link</Label>
          <Input
            id="magistratLink"
            value={formData.magistratLink || ""}
            onChange={(e) => updateField("magistratLink", e.target.value)}
            placeholder="https://..."
          />
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Änderungen speichern
      </Button>
    </form>
  )
}
