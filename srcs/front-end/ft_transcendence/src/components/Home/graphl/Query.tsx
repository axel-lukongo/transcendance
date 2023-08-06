import { gql } from "@apollo/client";

export const GET_USER_AVATAR = gql`
  query GetUserAvatar($id: Int!) {
    findUserById(id: $id) {
      avatar
    }
  }
`;

export const MY_HISTORY_MATCH = gql`
query MyHistoryMatch($userId: Int!) {
  myHistoryMatch(userId: $userId) {
    scoreUser1
    scoreUser2
    winnerId
    versusDate
    user1 {
      nickname
    }
    user2 {
      nickname
    }
  }
}
`;