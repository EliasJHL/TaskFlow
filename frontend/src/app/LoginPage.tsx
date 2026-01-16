/*
** EPITECH PROJECT, 2025
** TaskFlow
** File description:
** LoginPage
*/

import { Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthLayout } from '../features/auth/components/AuthLayout';
import { LoginForm } from '../features/auth/components/LoginForm';
import { useAuth } from '@/hooks/useAuth';

export const LoginPage = () => {
  const { t } = useTranslation();
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null;
  if (isAuthenticated) return <Navigate to="/app" replace />;

  return (
    <AuthLayout
      title={t('auth.login_title')}
      subtitle={t('auth.login_subtitle')}
      linkText={t('auth.login_link_text')}
      linkLabel={t('auth.login_link_label')}
      linkUrl="/register"
    >
      <LoginForm />
    </AuthLayout>
  );
};
