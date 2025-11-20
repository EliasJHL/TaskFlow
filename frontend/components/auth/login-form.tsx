"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { redirect } from "next/dist/server/api-utils";
import { useTranslation } from "react-i18next";

export function LoginForm({ lang }: { lang: string }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { t } = useTranslation("common");

  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        toast({
          title: t("login_success"),
          description: t("login_success_description"),
        });
        window.location.href = `/${lang}/dashboard`;
      } else {
        toast({
          title: t("login_fail"),
          description: t("login_fail_description"),
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: t("login_error"),
        description: t("login_error_description"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md bg-transparent border border-white/20 shadow-2xl shadow-green-500/10">
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="space-y-2">
            <Label htmlFor="email">
              {t("email")} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-3 pt-2">
            <Label htmlFor="password">
              {t("password")} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="text-sm text-muted-foreground text-right mb-2 pt-1">
            <a href="#" className="hover:underline">
              {t("login_forgot_password")}
            </a>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? t("logging_in") : t("login_login")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
