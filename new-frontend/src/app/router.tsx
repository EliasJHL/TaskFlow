/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** router
 */

import { createBrowserRouter, Navigate } from 'react-router-dom';

// Pages
import { HomePage } from '@/features/home/pages/HomePage';
import { LoginPage } from '@/features/auth/pages/LoginPage';
import { RegisterPage } from '@/features/auth/pages/RegisterPage';
import { DashboardLayout } from '@/features/dashboard/layouts/DashboardLayout';
import { DashboardPage } from '@/features/dashboard/pages/DashboardPage';
import { WorkspacePage } from '@/features/workspace/pages/WorkspacePage';
import { BoardPage } from '@/features/board/pages/BoardPage';

import { RequireAuth } from '@/components/layouts/RequireAuth';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },

  {
    path: '/app',
    element: <RequireAuth />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
        ],
      },
      {
        path: 'workspace/:workspaceId',
        element: <WorkspacePage />,
      },

      {
        path: 'board/:boardId',
        element: <BoardPage />,
      },
    ],
  },

  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
