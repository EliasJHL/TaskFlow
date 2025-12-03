import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthLayout } from '../components/AuthLayout';
import { LoginDocument } from '@/graphql/generated';

import { toast } from 'sonner';

export const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const [login, { loading }] = useMutation(LoginDocument);

  const onSubmit = async (data: any) => {
    try {
      const response = await login({
        variables: { input: { email: data.email, password: data.password } },
      });

      const result = response.data?.login;

      if (result?.__typename === 'AuthSuccess') {
        navigate('/app');
        toast.success('Connexion réussie !', {
          description: 'Ravi de vous revoir ' + result.user.username + '.',
          duration: 4000,
        });
      } else if (result?.__typename === 'AuthError') {
        toast.error('Erreur de connexion', {
          description: result.message,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AuthLayout
      title={t('auth.login_title', 'Connexion')}
      subtitle="Entrez vos identifiants pour accéder à votre espace."
      linkText="Pas encore de compte ?"
      linkLabel="Créer un compte"
      linkUrl="/register"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
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
          <Input
            id="password"
            type="password"
            disabled={loading}
            {...register('password')}
          />
        </div>
        <Button disabled={loading} className="w-full">
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Se connecter
        </Button>
      </form>
    </AuthLayout>
  );
};
