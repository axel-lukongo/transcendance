import { gql } from '@apollo/client';

export const FIND_PLAYER = gql`
  query FindPlayer($id: Int!) {
    findPlayer(id: $id) {
      id
      userId
      positionX
      positionY
      host
      waitingRoomId
      opponentPlayerId
      ballId
      pongId
    }
  }
`;

export const FIND_PONG = gql`
  query FindPong($id: Int!) {
    findPong(id: $id) {
      id
      userId1
      scoreUser1
      scoreUser2
      versusDate
    }
  }
`;

export const FIND_BALL = gql`
  query FindBall($id: Int!) {
    findBall(id: $id) {
      id
      positionX
      positionY
      directionX
      directionY
    }
  }
`;