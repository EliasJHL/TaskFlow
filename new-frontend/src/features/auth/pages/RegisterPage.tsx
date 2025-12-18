import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Loader2, Eye, EyeClosed } from 'lucide-react';

// Imports UI
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthLayout } from '../components/AuthLayout';

import confetti from 'canvas-confetti';

import { RegisterDocument } from '@/graphql/generated';

export const RegisterPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const [registerMutation, { loading }] = useMutation(RegisterDocument);

  const triggerSideCannons = () => {
    const end = Date.now() + 3 * 1000;
    const colors = ['#a786ff', '#fd8bbc', '#eca184', '#f8deb1'];

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: colors,
      });

      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const onSubmit = async (data: any) => {
    try {
      const response = await registerMutation({
        variables: {
          input: {
            username: data.username,
            email: data.email,
            password: data.password,
          },
        },
      });

      const result = response.data?.register;

      if (result?.__typename === 'AuthSuccess') {
        triggerSideCannons();

        setTimeout(() => {
          navigate('/app');
        }, 2000);
      } else if (result?.__typename === 'AuthError') {
        alert(result.message);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AuthLayout
      title="Créer un compte"
      subtitle="Rejoignez TaskFlow et commencez à gérer vos projets."
      linkText="Déjà un compte ?"
      linkLabel="Se connecter"
      linkUrl="/login"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="username">Nom d'utilisateur</Label>
          <Input
            id="username"
            placeholder="johndoe"
            type="text"
            autoCapitalize="none"
            disabled={loading}
            {...register('username')}
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
            disabled={loading}
            {...register('email')}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Mot de passe</Label>
          <div className="relative">
            <Input
              id="password"
              type="password"
              disabled={loading}
              {...register('password')}
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
    </AuthLayout>
  );
};
