"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import { createBrowserClient } from "@/lib/supabase/client"

interface HomepageData {
  heroHeadline?: string
  heroSubtitle?: string
  heroCTA?: string
  introHeading?: string
  introText?: string
  feature1Title?: string
  feature1Text?: string
  feature2Title?: string
  feature2Text?: string
  feature3Title?: string
  feature3Text?: string
  ctaHeading?: string
  ctaText?: string
  ctaButton?: string
}

export function HomepageCMSForm({ initialData }: { initialData: HomepageData }) {
  const [formData, setFormData] = useState<HomepageData>(initialData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const supabase = createBrowserClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const { error } = await supabase
        .from("page_content")
        .upsert({ page_key: "homepage", content: formData, updated_at: new Date().toISOString() })

      if (error) throw error

      toast({
        title: "Gespeichert",
        description: "Homepage Inhalte wurden erfolgreich aktualisiert.",
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

  const updateField = (field: keyof HomepageData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Hero Section */}
      <div className="space-y-4 p-4 border rounded-lg">
        <h3 className="text-lg font-semibold">Hero-Bereich</h3>
        <div className="space-y-2">
          <Label htmlFor="heroHeadline">Hauptüberschrift</Label>
          <Input
            id="heroHeadline"
            value={formData.heroHeadline || ""}
            onChange={(e) => updateField("heroHeadline", e.target.value)}
            placeholder="z.B. Ihre Taxischule in Wien"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="heroSubtitle">Untertitel</Label>
          <Textarea
            id="heroSubtitle"
            value={formData.heroSubtitle || ""}
            onChange={(e) => updateField("heroSubtitle", e.target.value)}
            placeholder="Kurzer Text unter der Überschrift"
            rows={3}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="heroCTA">Button-Text</Label>
          <Input
            id="heroCTA"
            value={formData.heroCTA || ""}
            onChange={(e) => updateField("heroCTA", e.target.value)}
            placeholder="z.B. Jetzt anmelden"
          />
        </div>
      </div>

      {/* Intro Section */}
      <div className="space-y-4 p-4 border rounded-lg">
        <h3 className="text-lg font-semibold">Einleitungsbereich</h3>
        <div className="space-y-2">
          <Label htmlFor="introHeading">Überschrift</Label>
          <Input
            id="introHeading"
            value={formData.introHeading || ""}
            onChange={(e) => updateField("introHeading", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="introText">Text</Label>
          <Textarea
            id="introText"
            value={formData.introText || ""}
            onChange={(e) => updateField("introText", e.target.value)}
            rows={5}
          />
        </div>
      </div>

      {/* Features */}
      <div className="space-y-4 p-4 border rounded-lg">
        <h3 className="text-lg font-semibold">Feature 1</h3>
        <div className="space-y-2">
          <Label htmlFor="feature1Title">Titel</Label>
          <Input
            id="feature1Title"
            value={formData.feature1Title || ""}
            onChange={(e) => updateField("feature1Title", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="feature1Text">Beschreibung</Label>
          <Textarea
            id="feature1Text"
            value={formData.feature1Text || ""}
            onChange={(e) => updateField("feature1Text", e.target.value)}
            rows={3}
          />
        </div>
      </div>

      <div className="space-y-4 p-4 border rounded-lg">
        <h3 className="text-lg font-semibold">Feature 2</h3>
        <div className="space-y-2">
          <Label htmlFor="feature2Title">Titel</Label>
          <Input
            id="feature2Title"
            value={formData.feature2Title || ""}
            onChange={(e) => updateField("feature2Title", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="feature2Text">Beschreibung</Label>
          <Textarea
            id="feature2Text"
            value={formData.feature2Text || ""}
            onChange={(e) => updateField("feature2Text", e.target.value)}
            rows={3}
          />
        </div>
      </div>

      <div className="space-y-4 p-4 border rounded-lg">
        <h3 className="text-lg font-semibold">Feature 3</h3>
        <div className="space-y-2">
          <Label htmlFor="feature3Title">Titel</Label>
          <Input
            id="feature3Title"
            value={formData.feature3Title || ""}
            onChange={(e) => updateField("feature3Title", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="feature3Text">Beschreibung</Label>
          <Textarea
            id="feature3Text"
            value={formData.feature3Text || ""}
            onChange={(e) => updateField("feature3Text", e.target.value)}
            rows={3}
          />
        </div>
      </div>

      {/* CTA Section */}
      <div className="space-y-4 p-4 border rounded-lg">
        <h3 className="text-lg font-semibold">Call-to-Action Bereich</h3>
        <div className="space-y-2">
          <Label htmlFor="ctaHeading">Überschrift</Label>
          <Input
            id="ctaHeading"
            value={formData.ctaHeading || ""}
            onChange={(e) => updateField("ctaHeading", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ctaText">Text</Label>
          <Textarea
            id="ctaText"
            value={formData.ctaText || ""}
            onChange={(e) => updateField("ctaText", e.target.value)}
            rows={2}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ctaButton">Button-Text</Label>
          <Input
            id="ctaButton"
            value={formData.ctaButton || ""}
            onChange={(e) => updateField("ctaButton", e.target.value)}
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
