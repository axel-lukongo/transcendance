import { gql } from "@apollo/client";

export const GET_USER_AVATAR = gql`
  query GetUserAvatar($id: Int!) {
    findUserById(id: $id) {
      avatar
    }
  }
`;


export const MY_MATCH_HISTORY = gql`
query MyMatchHistory {
  myMatchHistory {
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

export const MY_MATCH_STATS = gql`
  query MyMatchStatistic {
    myMatchStatistic {
      grade
      level
      rank
      wins
      defeats
      ratio
    }
  }
`;
