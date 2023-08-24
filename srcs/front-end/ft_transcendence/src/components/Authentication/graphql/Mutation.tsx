import { gql } from "@apollo/client";

export const CREATE_USER = gql`
mutation CreateUser($input: UpdateAuthenticationInput!) {
  createUser(updateAuthenticationInput: $input) {
    id
    token
    connection_status
    email
    nickname
    avatar
    tfa_code
    level
  }
}
`;

export const UPDATE_STATE = gql`mutation UpdateState($state: Int!) {
  updateState(new_state: $state) {
    id
    state
  }
}`