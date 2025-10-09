"use client"

import { create } from "zustand"
import { apolloClient } from "@/lib/apollo-client"
import { LOGIN_MUTATION, REGISTER_MUTATION, LOGOUT_MUTATION, ME_QUERY } from "@/lib/graphql/auth/mutations"

export interface User {
  user_id: string
  username: string
  email: string
  picture?: string
}

interface AuthState {
  user: User | null
  isLoading: boolean
  isInitialized: boolean
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  setInitialized: (initialized: boolean) => void
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  register: (username: string, email: string, password: string) => Promise<boolean>
  checkAuth: () => Promise<void>
}

export const useAuth = create<AuthState>((set, get) => ({
  user: null,
  isLoading: true,
  isInitialized: false,

  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
  setInitialized: (isInitialized) => set({ isInitialized }),

  checkAuth: async () => {
    try {
      set({ isLoading: true })
      const { data } = await apolloClient.query<{ me: User }>({
        query: ME_QUERY,
        fetchPolicy: 'network-only'
      })

      if (data?.me) {
        set({ user: data.me, isLoading: false, isInitialized: true })
      } else {
        set({ user: null, isLoading: false, isInitialized: true })
      }
    } catch (error) {
      console.error('Check auth error:', error)
      set({ user: null, isLoading: false, isInitialized: true })
    }
  },

  login: async (email: string, password: string) => {
    try {
      const { data } = await apolloClient.mutate<{ login: { user: User } }>({
        mutation: LOGIN_MUTATION,
        variables: { input: { email, password } }
      })

      if (data?.login?.user) {
        set({ user: data.login.user })
        return true
      }
      return false
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  },

  register: async (username: string, email: string, password: string) => {
    try {
      const { data } = await apolloClient.mutate<{ register: { user: User } }>({
        mutation: REGISTER_MUTATION,
        variables: { input: { username, email, password } }
      })

      if (data?.register?.user) {
        set({ user: data.register.user })
        return true
      }
      return false
    } catch (error) {
      console.error('Register error:', error)
      return false
    }
  },

  logout: async () => {
    try {
      await apolloClient.mutate({ mutation: LOGOUT_MUTATION })
      set({ user: null })
    } catch (error) {
      console.error('Logout error:', error)
      set({ user: null })
    }
  }
}))
