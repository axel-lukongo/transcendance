import { gql } from "@apollo/client";

export const UPDATE_USER = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(updateUserInput: $input) {
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
