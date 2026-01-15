/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** RegisterForm
 */

import { useForm } from 'react-hook-form';
import { Loader2, Eye, EyeClosed } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRegister } from '../hooks/useRegister';
import { useTranslation } from 'react-i18next';

export const RegisterForm = () => {
  const { register: formRegister, handleSubmit } = useForm();
  const { t } = useTranslation();
  const { register: registerUser, isLoading: loading } = useRegister();
  
  if (!t) return null;

  return (
    <div>
      <form onSubmit={handleSubmit(registerUser)} className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="username">Nom d'utilisateur</Label>
          <Input
            id="username"
            placeholder="johndoe"
            type="text"
            autoCapitalize="none"
            {...formRegister('username')}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="name@example.com"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            {...formRegister('email')}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Mot de passe</Label>
          <div className="relative">
            <Input
              id="password"
              type="password"
              {...formRegister('password')}
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => {
                const input = document.getElementById(
                  'password',
                ) as HTMLInputElement;
                const isPassword = input.type === 'password';
                input.type = isPassword ? 'text' : 'password';
              }}
            >
              {(document.getElementById('password') as HTMLInputElement)
                ?.type === 'password' ? (
                <Eye className="h-4 w-4" />
              ) : (
                <EyeClosed className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
        <Button disabled={loading} className="w-full">
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Créer mon compte
        </Button>
      </form>
    </div>
  );
};
