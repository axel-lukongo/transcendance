import {gql} from '@apollo/client';

export const FIND_PLAYER = gql`
  query FindPlayer($id: Int!) {
    findPlayer(id: $id) {
      id
      userId
      positionX
      positionY
      waitingRoomId
      opponentPlayerId
      ballId
    }
  }
`;

export const FIND_GAME = gql`
  query FindGame($userId: Int!) {
    findGame(userId: $userId) {
      id
      userId1
      userId2
      versusDate
    }
  }
`; 