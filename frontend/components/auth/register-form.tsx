"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth"
import { useToast } from "@/hooks/use-toast"

export function RegisterForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const { register } =  useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const success = await register(username, email, password)
      if (success) {
        toast({
          title: "Inscription réussie",
          description: "Bienvenue dans votre espace de travail !",
        })
      } else {
        toast({
          title: "Erreur",
          description: "Quelque chose s'est mal passé",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'inscription",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md  ">
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="space-y-2">
            <Label htmlFor="username">
              Username <span className="text-red-500">*</span>
            </Label>
            <Input
              id="username"
              type="text"
              placeholder=""
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2 pt-2">
            <Label htmlFor="email">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="example@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-3 pt-2">
            <Label htmlFor="password">
              Password <span className="text-red-500">*</span>
            </Label>
            <Input
              id="password"
              type="text"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {password.length > 0 && (
                <div className="text-xs mt-2 text-gray-600 space-y-1">
                    <div>Password must contain:</div>
                    <ul className="list-disc ml-4">
                        {[
                            {
                                label: "At least 8 characters",
                                valid: password.length >= 8,
                            },
                            {
                                label: "One uppercase letter",
                                valid: /[A-Z]/.test(password),
                            },
                            {
                                label: "One lowercase letter",
                                valid: /[a-z]/.test(password),
                            },
                            {
                                label: "One number",
                                valid: /\d/.test(password),
                            },
                            {
                                label: "One special character",
                                valid: /[!@#$%^&*(),.?":{}|<>]/.test(password),
                            },
                        ].map((rule, idx) => (
                            <li key={idx} className={`flex items-center gap-2 ${rule.valid ? "text-green-600" : "text-red-600"}`}>
                                {rule.valid ? (
                                    <span aria-label="valid" className="text-green-600">✓</span>
                                ) : (
                                    <span aria-label="invalid" className="text-red-600">x</span>
                                )}
                                {rule.label}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
          </div>
          <div className="pt-4 flex justify-center">
            <Button type="submit" className="w-90" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
