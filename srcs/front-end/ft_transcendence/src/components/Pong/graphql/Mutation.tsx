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
    userId1
    userId2
    versusDate
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

export const START_BALL_MOVE = gql`
  mutation StartBallMove($id: Int!, $playerId: Int!, $otherPlayerId: Int!) {
    startBallMove(id: $id, playerId: $playerId, otherPlayerId: $otherPlayerId)
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
      directionX
      directionY
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