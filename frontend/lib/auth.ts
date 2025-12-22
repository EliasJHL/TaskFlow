"use client";

import { create } from "zustand";
import { apolloClient } from "@/lib/apollo-client";
import {
  LOGIN_MUTATION,
  REGISTER_MUTATION,
  LOGOUT_MUTATION,
  ME_QUERY,
} from "@/lib/graphql/auth/mutations";
import {
  ADD_WORKSPACE_MEMBER_MUTATION,
  REMOVE_WORKSPACE_MEMBER_MUTATION,
  UPDATE_MEMBER_ROLE_MUTATION,
  WORKSPACE_MEMBERS_QUERY,
} from "./graphql/users/mutations";

export interface User {
  user_id: string;
  username: string;
  email: string;
  picture?: string;
}

interface WorkspaceMember {
  workspace_id: string;
  user_id: string;
  user: {
    user_id: string;
    username: string;
    email: string;
    picture?: string;
  };
  role: "Admin" | "Member" | "Viewer";
  joined_at: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  members: WorkspaceMember[];
  isInitialized: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setInitialized: (initialized: boolean) => void;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<boolean>;
  checkAuth: () => Promise<void>;
  fetchMembers: (workspace_id: string) => Promise<void>;
  addMember: (
    workspace_id: string,
    user_email: string,
    role?: string
  ) => Promise<void>;
  removeMember: (workspace_id: string, user_id: string) => Promise<void>;
  updateMemberRole: (
    workspace_id: string,
    user_id: string,
    role: string
  ) => Promise<void>;
}

export const useAuth = create<AuthState>((set, get) => ({
  user: null,
  members: [],
  isLoading: true,
  isInitialized: false,

  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
  setInitialized: (isInitialized) => set({ isInitialized }),

  checkAuth: async () => {
    try {
      set({ isLoading: true });
      const { data } = await apolloClient.query<{ me: User }>({
        query: ME_QUERY,
        fetchPolicy: 'cache-first',
      });

      if (data?.me) {
        set({ user: data.me, isLoading: false, isInitialized: true });
      } else {
        set({ user: null, isLoading: false, isInitialized: true });
      }
    } catch (error) {
      console.error("Check auth error:", error);
      set({ user: null, isLoading: false, isInitialized: true });
    }
  },

  login: async (email: string, password: string) => {
    try {
      const { data } = await apolloClient.mutate<{ login: { user: User } }>({
        mutation: LOGIN_MUTATION,
        variables: { input: { email, password } },
      });

      if (data?.login?.user) {
        set({ user: data.login.user });
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  },

  register: async (username: string, email: string, password: string) => {
    try {
      const { data } = await apolloClient.mutate<{ register: { user: User } }>({
        mutation: REGISTER_MUTATION,
        variables: { input: { username, email, password } },
      });

      if (data?.register?.user) {
        set({ user: data.register.user });
        return true;
      }
      return false;
    } catch (error) {
      console.error("Register error:", error);
      return false;
    }
  },

  logout: async () => {
    try {
      await apolloClient.mutate({ mutation: LOGOUT_MUTATION });
      set({ user: null, members: [] });
    } catch (error) {
      console.error("Logout error:", error);
      set({ user: null, members: [] });
    }
  },

  fetchMembers: async (workspace_id: string) => {
    try {
      const { data } = await apolloClient.query<{
        workspaceMembers: WorkspaceMember[];
      }>({
        query: WORKSPACE_MEMBERS_QUERY,
        variables: { workspace_id },
        fetchPolicy: 'cache-first',
      });

      set({ members: data?.workspaceMembers || [] });
    } catch (error) {
      console.error("Error fetching members:", error);
      set({ members: [] });
      throw error;
    }
  },

  addMember: async (
    workspace_id: string,
    user_email: string,
    role = "MEMBER"
  ) => {
    try {
      const { data } = await apolloClient.mutate<{
        addWorkspaceMember: WorkspaceMember;
      }>({
        mutation: ADD_WORKSPACE_MEMBER_MUTATION,
        variables: {
          input: { workspace_id, user_email, role },
        },
      });

      if (data?.addWorkspaceMember) {
        set((state) => ({
          members: [...state.members, data.addWorkspaceMember],
        }));
      }
    } catch (error) {
      console.error("Error adding member:", error);
      throw error;
    }
  },

  removeMember: async (workspace_id: string, user_id: string) => {
    try {
      await apolloClient.mutate<{
        removeWorkspaceMember: { success: boolean; message: string };
      }>({
        mutation: REMOVE_WORKSPACE_MEMBER_MUTATION,
        variables: { workspace_id, user_id },
      });

      set((state) => ({
        members: state.members.filter((m) => m.user.user_id !== user_id),
      }));
    } catch (error) {
      console.error("Error removing member:", error);
      throw error;
    }
  },

  updateMemberRole: async (
    workspace_id: string,
    user_id: string,
    role: string
  ) => {
    try {
      const { data } = await apolloClient.mutate<{
        updateMemberRole: WorkspaceMember;
      }>({
        mutation: UPDATE_MEMBER_ROLE_MUTATION,
        variables: {
          input: { workspace_id, user_id, role },
        },
      });

      if (data?.updateMemberRole) {
        set((state) => ({
          members: state.members.map((m) =>
            m.user.user_id === user_id
              ? { ...m, role: data.updateMemberRole.role }
              : m
          ),
        }));
      }
    } catch (error) {
      console.error("Error updating role:", error);
      throw error;
    }
  },
}));
