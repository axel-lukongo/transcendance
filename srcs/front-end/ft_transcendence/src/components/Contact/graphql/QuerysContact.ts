import { gql } from "@apollo/client";


export const CONTACTS = gql`query GetRequestList($input: Int!){
	contactsRequest(user_id: $input){
		id
		pending
		contact {
			id
			nickname
			email
			token
		}
	  }
}`

export const LIST_CONTACT = gql`query GetListContact($input: Int!) {
	myContacts(user_id: $input) {
		id
		contact {
			nickname
			intra_login
		}
	}
}`