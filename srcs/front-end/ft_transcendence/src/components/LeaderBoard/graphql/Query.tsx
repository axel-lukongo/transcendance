import { gql } from "@apollo/client";

export const LEADERBOARD = gql`
  query LeaderBoard {
    leaderBoard {
      grade
      nickname
      level
      rank
    }
  }
`;