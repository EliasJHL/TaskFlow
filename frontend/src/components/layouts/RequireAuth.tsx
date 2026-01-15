/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** RequireAuth
 */

import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export const RequireAuth = () => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        Calcul de vos droits...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
