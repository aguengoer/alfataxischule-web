"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, GraduationCap, FileText, MessageSquare, Users, LogOut, Home, Edit3 } from "lucide-react"
import { createBrowserClient } from "@/lib/supabase/client"

export function AdminNav() {
  const pathname = usePathname()
  const router = useRouter()

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    {
      label: "CMS Inhalte",
      icon: Edit3,
      children: [
        { href: "/admin/cms/homepage", label: "Homepage" },
        { href: "/admin/cms/guide", label: "Leitfaden" },
        { href: "/admin/cms/contact", label: "Kontakt" },
      ],
    },
    { href: "/admin/courses", label: "Kurse", icon: GraduationCap },
    { href: "/admin/documents", label: "Dokumente", icon: FileText },
    { href: "/admin/submissions", label: "Anfragen", icon: MessageSquare },
    { href: "/admin/registrations", label: "Anmeldungen", icon: Users },
  ]

  const handleLogout = async () => {
    const supabase = createBrowserClient()
    await supabase.auth.signOut()
    router.push("/admin/login")
  }

  return (
    <nav className="w-64 min-h-screen bg-secondary text-secondary-foreground border-r flex flex-col">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold">ALFA Admin</h2>
        <p className="text-sm opacity-75 mt-1">Verwaltungsbereich</p>
      </div>

      <div className="flex-1 py-6">
        <ul className="space-y-1 px-3">
          {navItems.map((item) => {
            if ("children" in item) {
              return (
                <li key={item.label}>
                  <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-secondary-foreground/60">
                    <item.icon className="h-4 w-4 inline mr-2" />
                    {item.label}
                  </div>
                  <ul className="ml-6 space-y-1 mt-1">
                    {item.children.map((child) => {
                      const isActive = pathname === child.href
                      return (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className={`block px-3 py-1.5 text-sm rounded-md transition-colors ${
                              isActive
                                ? "bg-primary text-primary-foreground"
                                : "hover:bg-secondary-foreground/10 text-secondary-foreground/80 hover:text-secondary-foreground"
                            }`}
                          >
                            {child.label}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </li>
              )
            }

            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-secondary-foreground/10 text-secondary-foreground/80 hover:text-secondary-foreground"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="p-3 border-t space-y-2">
        <Button asChild variant="outline" className="w-full justify-start bg-transparent">
          <Link href="/">
            <Home className="h-4 w-4 mr-2" />
            Zur Website
          </Link>
        </Button>
        <Button onClick={handleLogout} variant="ghost" className="w-full justify-start text-destructive">
          <LogOut className="h-4 w-4 mr-2" />
          Abmelden
        </Button>
      </div>
    </nav>
  )
}
