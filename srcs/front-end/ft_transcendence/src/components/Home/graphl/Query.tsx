import { gql } from "@apollo/client";

export const GET_USER_AVATAR = gql`
  query GetUserAvatar($id: Int!) {
    findUserById(id: $id) {
      avatar
    }
  }
`;