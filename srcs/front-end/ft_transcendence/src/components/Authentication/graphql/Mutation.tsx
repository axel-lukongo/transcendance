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
    level
  }
}
`;