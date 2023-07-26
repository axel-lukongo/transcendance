import {gql} from '@apollo/client';

export const IS_PLAYER_IN_GAME = gql`
  query IsPlayerInGame($id: Int!) {
    isPlayerInGame(id: $id) {
      id
      userId
      positionX
      positionY
      waitingRoomId
    }
  }
`;

export const FIND_MY_OPPONENT = gql`
  query FindMyOpponent($userId: Int!) {
    findMyOpponent(userId: $userId) {
      id
      userId
      positionX
      positionY
      waitingRoomId
    }
  }
`;

export const PLAYER_UPDATED_SUBSCRIPTION = gql`
  subscription PlayerUpdated {
    playerUpdated {
      id
      userId
      positionX
      positionY
      waitingRoomId
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