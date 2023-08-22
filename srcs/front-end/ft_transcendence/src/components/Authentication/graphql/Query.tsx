import { gql } from "@apollo/client";

export const CHECK_2AF = gql`
  query CheckTwoAuthenticationFactor($input: String!) {
    checkTwoAuthenticationFactor(code: $input) {
      token
      state
    }
  }
`;

export const MAKE_AUTH= gql`
  query MakeAuthentication($code: String!) {
    makeAuthentication(code: $code) {
      token
      state
    }
  }
`;