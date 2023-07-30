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

export const UPDATE_BALL = gql `
  mutation UpdateBall($input: UpdateBallInput!) {
    updateBall(updateBallInput: $input) {
      id
      positionX
      positionY
      directionX
      directionY
    }
  }
`;



