import { gql } from "@apollo/client";


export const CONTACTS = gql`query GetRequestList {
	contactsRequest {
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

export const REQUEST = gql`query GetMyContactRequest{
	myContactRequest {
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

export const LIST_CONTACT = gql`query GetListContact {
	myContacts {
		id
		contact {
			nickname
			intra_login
			avatar
		}
	}
}`

export const RESEARCH = gql`query ResearchContact($input: String!) {
	searchUsers(research: $input) {
		nickname
		id
	}
}`

export const SUB_STATE = gql`subscription {
	changeState {
		id
		nickname
		state
	}
}`

export const MY_BLOCKED_LIST = gql`query ResearchBlocked($id: Int!){
	person_blocked(id: $id){
		id
		blocker_id
		blocked_id
		blocked{
			nickname
		}
	}
}`