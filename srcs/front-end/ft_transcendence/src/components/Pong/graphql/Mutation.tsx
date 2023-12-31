import {gql} from '@apollo/client';

export const START_PONG = gql`
  mutation StartPong($ballId: Int!, $playerId: Int!, $otherPlayerId: Int!, $pongId: Int!) {
    startPong(ballId: $ballId, playerId: $playerId, otherPlayerId: $otherPlayerId, pongId: $pongId)
  }
`;

export const END_PONG = gql`
  mutation EndPong {
    endPong
  }
`;

export const JOIN_PONG = gql`
  mutation JoinPong($userId: Int!)  {
    joinPong(userId: $userId) {
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
export const SET_INVITE = gql`
  mutation SetPongInvite($friendId: Int!) {
    setPongInvite(friendId: $friendId) {
      userId1
      userId2
      waitingRoomId
    }
  }
`;

export const JOIN_PONG_INVITE = gql`
  mutation JoinPongInvite($friendId: Int!, $waitingRoomId: Int!)  {
    joinPongInvite(friendId: $friendId, waitingRoomId: $waitingRoomId) {
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
  }`;


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