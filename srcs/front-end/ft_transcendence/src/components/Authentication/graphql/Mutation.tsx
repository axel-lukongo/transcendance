import { gql } from "@apollo/client";

export const CREATE_USER = gql`
mutation CreateUser($input: UpdateAuthenticationInput!) {
  createUser(updateAuthenticationInput: $input) {
    token
    state
  }
}
`;

export const UPDATE_STATE = gql`mutation UpdateState($state: Int!) {
  updateState(new_state: $state) {
    id
    state
  }
}`