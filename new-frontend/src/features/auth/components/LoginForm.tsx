/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** LoginForm
 */

import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { LoginDocument } from '@/graphql/generated';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const LoginForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const { t } = useTranslation();

  const [loginMutation, { loading }] = useMutation(LoginDocument);

  const onSubmit = async (data: any) => {
    try {
      const response = await loginMutation({
        variables: {
          input: {
            email: data.email,
            password: data.password,
          },
        },
      });

      const result = response.data?.login;

      if (result?.__typename === 'AuthSuccess') {
        console.log('Succès !', result.user);
        navigate('/app');
      } else if (result?.__typename === 'AuthError') {
        alert('Erreur : ' + result.message);
      }
    } catch (e) {
      console.error('Erreur système', e);
    }
  };

  return (
    <div className="grid gap-6">
      <form onSubmit={handleSubmit(onSubmit)}>
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
          <Button disabled={loading}>
            {loading ? 'Connexion...' : 'Se connecter avec Email'}
          </Button>
        </div>
      </form>
    </div>
  );
};
