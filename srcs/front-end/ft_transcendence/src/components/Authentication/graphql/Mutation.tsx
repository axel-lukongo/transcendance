import { gql } from "@apollo/client";

export const CREATE_USER = gql`
mutation CreateUser($input: CreateAuthenticationInput!) {
  createUser(createAuthenticationInput: $input) {
    id
    token
    email
    nickname
    avatar
    tfa_code
  }
}
`;

export const UPDATE_STATE = gql`mutation UpdateState($state: Int!, $user_id: Int!) {
  updateState(new_state: $state, user_id: $user_id) {
    id
    state
  }
}`