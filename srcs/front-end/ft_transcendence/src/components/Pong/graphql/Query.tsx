import {gql} from '@apollo/client';

export const IS_PLAYER_IN_GAME = gql`
  query IsPlayerInGame($id: Int!) {
    isPlayerInGame(id: $id) {
      id
      userId
      positionX
      positionY
    }
  }
`;