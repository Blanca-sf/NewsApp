import { gql } from "@apollo/client";

export const GET_SAVED_ARTICLES = gql`
  query GetSavedArticles($userId: ID!) {
    savedArticles(userId: $userId) {
      id
      title
      url
      image
    }
  }
`;
