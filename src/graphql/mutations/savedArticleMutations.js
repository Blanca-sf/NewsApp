import { gql } from "@apollo/client";

export const SAVE_ARTICLE = gql`
  mutation SaveArticle($title: String!, $url: String!, $image: String, $userId: ID!) {
    saveArticle(title: $title, url: $url, image: $image, userId: $userId) {
      id
      title
      url
      image
      userId
    }
  }
`;

export const DELETE_SAVED_ARTICLE = gql`
  mutation DeleteSavedArticle($id: ID!) {
    deleteSavedArticle(id: $id)
  }
`;
