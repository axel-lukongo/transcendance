import {gql} from '@apollo/client';

export const CREATE_PLAYER = gql`
  mutation CreatePlayer($input: CreatePlayerInput!) {
    createPlayer(createPlayerInput: $input) {
      id
      userId
      positionX
      positionY
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
    }
  }
`;

export const PLAYER_UPDATED = gql`
  subscription PlayerUpdated($id: Int!) {
    playerUpdated(id: $id) {
      id
      userId
      positionX
      positionY
    }
  }
`;

export const CreatePong = 

