/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** useRegister
 */

import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import confetti from 'canvas-confetti';
import { RegisterDocument } from '@/graphql/generated';

export const useRegister = () => {
  const navigate = useNavigate();
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

  const register = async (values: any) => {
    try {
      const response = await registerMutation({
        variables: {
          input: {
            username: values.username,
            email: values.email,
            password: values.password,
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

  return { register, isLoading: loading };
};
