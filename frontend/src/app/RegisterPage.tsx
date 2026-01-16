/*
** EPITECH PROJECT, 2025
** TaskFlow
** File description:
** RegisterPage
*/

import { Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthLayout } from '../features/auth/components/AuthLayout';
import { RegisterForm } from '../features/auth/components/RegisterForm';
import { useAuth } from '@/hooks/useAuth';

export const RegisterPage = () => {
  const { t } = useTranslation();
  const { isAuthenticated, loading } = useAuth();

  if (!t) return null;
  if (loading) return null;
  if (isAuthenticated) return <Navigate to="/app" replace />;

  return (
    <AuthLayout
      title={t('auth.register_title')}
      subtitle={t('auth.register_subtitle')}
      linkText={t('auth.register_link_text')}
      linkLabel={t('auth.register_link_label')}
      linkUrl="/login"
    >
      <RegisterForm />
    </AuthLayout>
  );
};
