/*
** EPITECH PROJECT, 2025
** TaskFlow
** File description:
** LoginPage
*/

import { useTranslation } from 'react-i18next';
import { AuthLayout } from '../features/auth/components/AuthLayout';
import { LoginForm } from '../features/auth/components/LoginForm';

export const LoginPage = () => {
  const { t } = useTranslation();

  return (
    <AuthLayout
      title={t('auth.login_title', 'Connexion')}
      subtitle="Entrez vos identifiants pour accéder à votre espace."
      linkText="Pas encore de compte ?"
      linkLabel="Créer un compte"
      linkUrl="/register"
    >
      <LoginForm />
    </AuthLayout>
  );
};
