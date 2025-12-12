/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** router
 */

import { createBrowserRouter, Navigate } from 'react-router-dom';

import { HomePage } from '@/app/HomePage';
import { LoginPage } from '@/app/LoginPage';
import { RegisterPage } from '@/app/RegisterPage';
import { DashboardLayout } from '@/features/dashboard/layouts/DashboardLayout';
import { DashboardPage } from '@/features/dashboard/pages/DashboardPage';
import { WorkspacePage } from '@/features/workspace/pages/WorkspacePage';
import { BoardPage } from '@/features/board/pages/BoardPage';

import { Test } from '@/app/test';

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
    path: '/test',
    element: <Test />,
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
