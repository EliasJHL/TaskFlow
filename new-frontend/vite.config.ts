/*
** EPITECH PROJECT, 2025
** TaskFlow
** File description:
** vite.config
*/

import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    }
});
