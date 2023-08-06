import {gql} from '@apollo/client';

export const START_PONG = gql`
  mutation StartPong($id: Int!, $playerId: Int!, $otherPlayerId: Int!, $pongId: Int!) {
    startPong(id: $id, playerId: $playerId, otherPlayerId: $otherPlayerId, pongId: $pongId)
  }
`;

export const STOP_PONG = gql`
  mutation StopPong {
    stopPong
  }
`;

export const CREATE_PLAYER = gql`
  mutation CreatePlayer($input: CreatePlayerInput!) {
    createPlayer(createPlayerInput: $input) {
      id
      userId
      positionX
      positionY
      waitingRoomId
      opponentPlayerId
      host
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
      host
      waitingRoomId
      opponentPlayerId
      ballId
      pongId
    }
  }
`;

export const UPDATE_PONG = gql`
  mutation UpdatePong($input: UpdatePongInput!) {
    updatePong(updatePongInput: $input) {
      id
      scoreUser1
      scoreUser2
      loserId
      winnerId
    }
  }
`;

export const REMOVE_BALL = gql`
  mutation RemoveBall($id: Int!) {
    removeBall(id: $id) {
      id
    }
  }
`;

export const REMOVE_PLAYER = gql`
  mutation RemovePlayer($id: Int!) {
    removePlayer(id: $id) {
      id
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
      host
      waitingRoomId
      opponentPlayerId
      ballId
      pongId
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

export const PONG_UPDATED_SUBSCRIPTION = gql`
subscription PongUpdatedSubscription($id: Int!) {
    pongUpdatedSubscription(id: $id) {
      id
      scoreUser1
      scoreUser2
      loserId
      winnerId
      
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