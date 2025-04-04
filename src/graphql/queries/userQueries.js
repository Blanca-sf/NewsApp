import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`
  query {
    users {
      id
      name
      email
    }
  }
`;

export const GET_USER_BY_EMAIL = gql`
  query GetUserByEmail($email: String!) {
    userByEmail(email: $email) {
      id
      name
      email
      username
        password
    }
  }
`;
