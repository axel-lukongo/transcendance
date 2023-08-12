import {gql} from '@apollo/client';

export const START_PONG = gql`
  mutation StartPong($ballId: Int!, $playerId: Int!, $otherPlayerId: Int!, $pongId: Int!) {
    startPong(ballId: $ballId, playerId: $playerId, otherPlayerId: $otherPlayerId, pongId: $pongId)
  }
`;

export const STOP_PONG = gql`
  mutation StopPong {
    stopPong
  }
`;

export const JOIN_PONG = gql`
  mutation JoinPong($id: Int!) {
    joinPong(id: $id) {
      player {
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
      otherPlayer {
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
      ball {
        id
        positionX
        positionY
        directionX
        directionY
      }
      pong {
        id
        scoreUser1
        scoreUser2
        winnerId
      }
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