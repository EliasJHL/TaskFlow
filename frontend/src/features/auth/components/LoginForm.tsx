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

export const LoginForm = () => {
  const { register: formRegister, handleSubmit } = useForm();
  const { t } = useTranslation();
  const { login, isLoading: loading } = useLogin();

  if (!t) return null;

  return (
    <div className="grid gap-6">
      <form onSubmit={handleSubmit(login)}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={loading}
              {...formRegister('email')}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              type="password"
              disabled={loading}
              {...formRegister('password')}
            />
          </div>
          <Button disabled={loading}>
            {loading ? 'Connexion...' : 'Se connecter avec Email'}
          </Button>
        </div>
      </form>
    </div>
  );
};
