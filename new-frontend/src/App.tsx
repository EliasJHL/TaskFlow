/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** App
 */

import { LoginForm } from '@/features/auth/components/LoginForm';

export default function App() {
    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <div className="w-full max-w-sm border p-8 rounded-lg bg-card">
                <h1 className="text-2xl font-bold mb-6 text-center">
                    Connexion
                </h1>
                <LoginForm />
            </div>
        </div>
    );
}
