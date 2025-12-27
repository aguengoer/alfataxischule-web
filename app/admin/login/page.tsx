"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createBrowserClient } from "@/lib/supabase/client"
import Image from "next/image"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const supabase = createBrowserClient()

    try {
      console.log("[v0] Attempting login with email:", email)

      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      console.log("[v0] Login response:", { data, error: signInError })

      if (signInError) {
        console.log("[v0] Login error:", signInError)
        setError("Ungültige Anmeldedaten. Bitte versuchen Sie es erneut.")
        setIsLoading(false)
        return
      }

      console.log("[v0] Login successful, redirecting to /admin")
      router.push("/admin")
      router.refresh()
    } catch (err) {
      console.log("[v0] Unexpected error:", err)
      setError("Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Image src="/images/logo.svg" alt="ALFA Taxischule" width={60} height={60} />
          </div>
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription>Melden Sie sich an, um auf das Admin-Panel zuzugreifen</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-Mail</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@alfataxischule.at"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Passwort</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Wird angemeldet..." : "Anmelden"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
