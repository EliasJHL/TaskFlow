/*
** EPITECH PROJECT, 2025
** TaskFlow
** File description:
** useAuth
*/

import { gql, useQuery } from "@apollo/client";

const ME_QUERY = gql`
  query Me {
    me {
      user_id
      username
      email
      picture
    }
  }
`;

export const useAuth = () => {
  const { data, loading, error } = useQuery(ME_QUERY, {
    fetchPolicy: 'network-only', 
    onError: () => {},
  });

  console.log("useAuth - data:", data, "loading:", loading, "error:", error);
  return {
    user: data?.me || null,
    loading,
    isAuthenticated: !!data?.me,
  };
};