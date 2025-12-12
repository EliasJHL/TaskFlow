/*
** EPITECH PROJECT, 2025
** TaskFlow
** File description:
** useLogin
*/

import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { LoginDocument } from '@/graphql/generated';
import { toast } from 'sonner';

export const useLogin = () => {
  const navigate = useNavigate();
  const [loginMutation, { loading }] = useMutation(LoginDocument);

  const login = async (values: any) => {
    try {
      const response = await loginMutation({
        variables: { input: { email: values.email, password: values.password } },
      });

      const result = response.data?.login;

      if (result?.__typename === 'AuthSuccess') {
        toast.success('Connexion réussie !', {
          description: `Ravi de vous revoir ${result.user.username}.`,
          duration: 4000,
        });
        navigate('/app');
        return true;
      } 
      
      if (result?.__typename === 'AuthError') {
        toast.error('Erreur de connexion', {
          description: result.message,
        });
      }
    } catch (e) {
      console.error(e);
      toast.error("Une erreur inattendue s'est produite");
    }
  };

  return { 
    login, 
    isLoading: loading 
  };
};