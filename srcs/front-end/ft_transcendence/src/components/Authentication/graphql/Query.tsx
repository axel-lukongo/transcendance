import { gql } from "@apollo/client";

export const CHECK_2AF = gql`
  query CheckTwoAuthenticationFactor($input: String!) {
    checkTwoAuthenticationFactor(code: $input) {
      id
      token
      email
      nickname
      avatar
      tfa_code
    }
  }
`;

export const MAKE_AUTH= gql`
  query MakeAuthentication($code: String!) {
    makeAuthentication(code: $code) {
      id
      token
      email
      nickname
      avatar
      tfa_code
    }
  }
`;