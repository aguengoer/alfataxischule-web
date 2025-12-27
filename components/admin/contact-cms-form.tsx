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

interface ContactData {
  address?: string
  city?: string
  zip?: string
  phone?: string
  email?: string
  openingHours?: string
}

export function ContactCMSForm({ initialData }: { initialData: ContactData }) {
  const [formData, setFormData] = useState<ContactData>(initialData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const supabase = createBrowserClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const { error } = await supabase
        .from("site_settings")
        .upsert({ key: "contact", value: formData, updated_at: new Date().toISOString() })

      if (error) throw error

      toast({
        title: "Gespeichert",
        description: "Kontaktdaten wurden erfolgreich aktualisiert.",
      })
    } catch (error) {
      console.error(error)
      toast({
        title: "Fehler",
        description: "Kontaktdaten konnten nicht gespeichert werden.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateField = (field: keyof ContactData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="address">Straße und Hausnummer</Label>
          <Input
            id="address"
            value={formData.address || ""}
            onChange={(e) => updateField("address", e.target.value)}
            placeholder="z.B. Schönbrunner Straße 181/1"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="zip">PLZ</Label>
            <Input
              id="zip"
              value={formData.zip || ""}
              onChange={(e) => updateField("zip", e.target.value)}
              placeholder="1120"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">Stadt</Label>
            <Input
              id="city"
              value={formData.city || ""}
              onChange={(e) => updateField("city", e.target.value)}
              placeholder="Wien"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Telefon</Label>
          <Input
            id="phone"
            value={formData.phone || ""}
            onChange={(e) => updateField("phone", e.target.value)}
            placeholder="+43 660 2020860"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">E-Mail</Label>
          <Input
            id="email"
            type="email"
            value={formData.email || ""}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="alfa.taxischule@gmail.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="openingHours">Öffnungszeiten</Label>
          <Textarea
            id="openingHours"
            value={formData.openingHours || ""}
            onChange={(e) => updateField("openingHours", e.target.value)}
            placeholder="z.B. Mo-Fr: 11:00-16:00 Uhr"
            rows={3}
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
