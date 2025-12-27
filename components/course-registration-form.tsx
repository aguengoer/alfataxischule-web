"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { Course } from "@/lib/types"
import { createClient } from "@/lib/supabase/client"

interface CourseRegistrationFormProps {
  course: Course
}

export function CourseRegistrationForm({ course }: CourseRegistrationFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    consent: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const supabase = createClient()

    const { error: submitError } = await supabase.from("course_registrations").insert({
      course_id: course.id,
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      consent: formData.consent,
    })

    if (submitError) {
      setError("Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.")
      setIsSubmitting(false)
      return
    }

    setIsSuccess(true)
    setIsSubmitting(false)

    // Reset form after 2 seconds and close dialog
    setTimeout(() => {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        consent: false,
      })
      setIsSuccess(false)
      setIsOpen(false)
    }, 2000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">Jetzt anmelden</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Kursanmeldung: {course.type}</DialogTitle>
          <DialogDescription>
            Füllen Sie das Formular aus, um sich für diesen Kurs anzumelden. Wir werden uns baldmöglichst mit Ihnen in
            Verbindung setzen.
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="py-8 text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Anmeldung erfolgreich!</h3>
            <p className="text-sm text-muted-foreground">
              Vielen Dank für Ihre Anmeldung. Wir werden uns in Kürze bei Ihnen melden.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
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
              <Label htmlFor="phone">Telefon *</Label>
              <Input
                id="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Wird gesendet..." : "Anmeldung absenden"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
