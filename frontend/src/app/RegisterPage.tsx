/*
** EPITECH PROJECT, 2025
** TaskFlow
** File description:
** RegisterPage
*/

import { useTranslation } from 'react-i18next';
import { AuthLayout } from '../features/auth/components/AuthLayout';
import { RegisterForm } from '../features/auth/components/RegisterForm';

export const RegisterPage = () => {
  const { t } = useTranslation();

  if (!t) return null;

  return (
    <AuthLayout
      title="Créer un compte"
      subtitle="Rejoignez TaskFlow et commencez à gérer vos projets."
      linkText="Déjà un compte ?"
      linkLabel="Se connecter"
      linkUrl="/login"
    >
      <RegisterForm />
    </AuthLayout>
  );
};
