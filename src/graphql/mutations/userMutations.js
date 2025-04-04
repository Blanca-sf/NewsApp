import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation AddUser(
    $name: String!
    $email: String!
    $username: String!
    $password: String!
  ) {
    addUser(
      name: $name
      email: $email
      username: $username
      password: $password
    ) {
      id
      name
      email
      username
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $id: ID!
    $name: String
    $email: String
    $username: String
    $password: String
  ) {
    updateUser(
      id: $id
      name: $name
      email: $email
      username: $username
      password: $password
    ) {
      id
      name
      email
      username
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;
