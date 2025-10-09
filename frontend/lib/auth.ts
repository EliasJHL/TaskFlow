"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { apolloClient } from "@/lib/apollo-client"
import { LOGIN_MUTATION, REGISTER_MUTATION } from "@/lib/graphql/auth/mutations"

export interface User {
  user_id: string
  username: string
  email: string
  picture?: string
}

interface AuthState {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  register: (username: string, email: string, password: string) => Promise<boolean>
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      
      login: async (email: string, password: string) => {
        try {
          const { data } = await apolloClient.mutate<{ login: { user: User } }>({
            mutation: LOGIN_MUTATION,
            variables: { input: { email, password } }
          });

          if (data?.login) {
            set({ user: data.login.user });
            return true;
          }
          return false;
        } catch (error) {
          console.error('Login error:', error);
          return false;
        }
      },

      register: async (username: string, email: string, password: string) => {
        try {
          const { data } = await apolloClient.mutate<{ register: { user: User } }>({
            mutation: REGISTER_MUTATION,
            variables: { input: { username, email, password } }
          });

          if (data?.register) {
            set({ user: data.register.user });
            return true;
          }
          return false;
        } catch (error) {
          console.error('Register error:', error);
          return false;
        }
      },

      logout: () => {
        set({ user: null });
        // Optionnel : appeler une mutation logout côté backend pour supprimer le cookie
      },
    }),
    {
      name: "auth-storage",
    }
  )
)
