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


export const PLAYER_UPDATED_SUBSCRIPTION = gql`
  subscription PlayerUpdatedSubscription($id: Int!) {
    playerUpdatedSubscription(id: $id) {
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

export const BALL_UPDATED_SUBSCRIPTION = gql`
  subscription BallUpdatedSubscription($id: Int!) {
    ballUpdatedSubscription(id: $id) {
      id
      positionX
      positionY
      velocityX
      velocityY
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