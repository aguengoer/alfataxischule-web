"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    consent: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const supabase = createClient()

    const { error: submitError } = await supabase.from("contact_submissions").insert({
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone || null,
      message: formData.message,
      consent: formData.consent,
    })

    if (submitError) {
      setError("Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.")
      setIsSubmitting(false)
      return
    }

    setIsSuccess(true)
    setIsSubmitting(false)

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
        consent: false,
      })
      setIsSuccess(false)
    }, 3000)
  }

  if (isSuccess) {
    return (
      <Card className="border-2 border-green-500">
        <CardContent className="py-12 text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-2">Nachricht gesendet!</h3>
          <p className="text-muted-foreground">
            Vielen Dank für Ihre Nachricht. Wir werden uns baldmöglichst bei Ihnen melden.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Kontaktformular</CardTitle>
        <CardDescription>
          Haben Sie Fragen? Schreiben Sie uns eine Nachricht und wir melden uns schnellstmöglich bei Ihnen.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Vorname *</Label>
              <Input
                id="firstName"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Nachname *</Label>
              <Input
                id="lastName"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-Mail *</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefon</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Ihre Nachricht *</Label>
            <Textarea
              id="message"
              required
              rows={6}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Beschreiben Sie Ihr Anliegen..."
            />
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="consent"
              required
              checked={formData.consent}
              onCheckedChange={(checked) => setFormData({ ...formData, consent: checked === true })}
            />
            <Label htmlFor="consent" className="text-sm leading-relaxed cursor-pointer">
              Ich stimme der Verarbeitung meiner Daten gemäß der Datenschutzerklärung zu. *
            </Label>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
            {isSubmitting ? "Wird gesendet..." : "Nachricht senden"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
