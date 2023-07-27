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
    }
  }
`;

export const FIND_MY_GAME = gql`
  query FindMyGame($userId: Int!) {
    findMyGame(userId: $userId) {
      id
      userId
      positionX
      positionY
      waitingRoomId
    }
  }
`;

export const PLAYER_UPDATED_SUBSCRIPTION = gql`
  subscription PlayerUpdatedSubscription($id: Int!) {
    playerUpdatedSubscription(id: $id) {
      id
      userId
      positionX
      positionY
      waitingRoomId
      opponentPlayerId
    }
  }
`;

export const LIST_PLAYER_SUBCRIPTION = gql`
subscription ListPlayerSubscription {
  listPlayerSubscription {
    id
    userId
    positionX
    positionY
    waitingRoomId
  }
}
`;