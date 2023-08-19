import { gql } from "@apollo/client";

export const HISTORY_MATCH = gql`
  query HistoryMatch {
    historyMatch {
      grade
      nickname
      level
      rank
    }
  }
`;