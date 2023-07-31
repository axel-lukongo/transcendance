import {gql} from '@apollo/client';

export const CREATE_PLAYER = gql`
  mutation CreatePlayer($input: CreatePlayerInput!) {
    createPlayer(createPlayerInput: $input) {
      id
      userId
      positionX
      positionY
      waitingRoomId
      opponentPlayerId
    }
  }
`;

export const CREATE_PONG = gql`
  mutation CreatePong($input: CreatePongInput!) {
    createPong(createPongInput: $input) {
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

export const UPDATE_PLAYER = gql `
  mutation UpdatePlayer($input: UpdatePlayerInput!) {
    updatePlayer(updatePlayerInput: $input) {
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

export const BALL_MOVE = gql`
mutation BallMove($id: Int!, $playerId: Int!, $otherPlayerId: Int!) {
  ballMove(id: $id, playerId: $playerId, otherPlayerId: $otherPlayerId) {
    id
    positionX
    positionY
    directionX
    directionY
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