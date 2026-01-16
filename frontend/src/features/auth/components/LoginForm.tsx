/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** LoginForm
 */

import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslation } from 'react-i18next';
import { useLogin } from '../hooks/useLogin';
import { Github } from 'lucide-react';

export const LoginForm = () => {
  const { register: formRegister, handleSubmit } = useForm();
  const { t } = useTranslation();
  const { login, isLoading: loading } = useLogin();

  if (!t) return null;

  const apiBase =
    import.meta.env.VITE_API_URL ??
    import.meta.env.VITE_GRAPHQL_ENDPOINT?.replace(/\/graphql$/, '');
  const githubAuthUrl = `${apiBase}/auth/github`;

  return (
    <div className="grid gap-6">
      <Button
        type="button"
        variant="outline"
        className="w-full"
        asChild
        disabled={loading}
      >
        <a href={githubAuthUrl}>
          <Github className="mr-2 h-4 w-4" />
          {t('auth.github_login')}
        </a>
      </Button>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            {t('auth.or_email')}
          </span>
        </div>
      </div>
      <form onSubmit={handleSubmit(login)}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">{t('auth.email')}</Label>
            <Input
              id="email"
              placeholder={t('auth.email_placeholder')}
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={loading}
              {...formRegister('email')}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">{t('auth.password')}</Label>
            <Input
              id="password"
              type="password"
              disabled={loading}
              {...formRegister('password')}
            />
          </div>
          <Button disabled={loading}>
            {loading ? t('auth.login_loading') : t('auth.login_with_email')}
          </Button>
        </div>
      </form>
    </div>
  );
};
