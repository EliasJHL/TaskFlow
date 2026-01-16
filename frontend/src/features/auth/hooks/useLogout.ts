/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** useLogout
 */

import { gql, useApolloClient, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout {
      __typename
      ... on Success {
        successMessage
      }
      ... on Error {
        errorMessage
        code
      }
    }
  }
`;

export const useLogout = () => {
  const navigate = useNavigate();
  const apollo = useApolloClient();
  const [logoutMutation, { loading }] = useMutation(LOGOUT_MUTATION);

  const logout = async () => {
    try {
      await logoutMutation();
    } finally {
      localStorage.removeItem('token');
      await apollo.clearStore();
      navigate('/login');
    }
  };

  return { logout, isLoading: loading };
};
