import { gql } from "@apollo/client";


export const CONTACTS = gql`query GetRequestList($input: Int!){
	contactsRequest(user_id: $input){
		id
		pending
		contact(user_id: $input) {
			id
			nickname
			email
			token
		}
	  }
}`

export const REQUEST = gql`query GetMyContactRequest($input: Int!) {
	myContactRequest(user_id: $input) {
		id
		pending
		contact(user_id: $input) {
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
		
		contact(user_id: $input) {
			id
			email
			intra_login
			nickname
			avatar
			level
			rank
		}
	}
}`

export const RESEARCH = gql`query ResearchContact($input: String!, $user_id: Int!) {
	searchUsers(research: $input, user_id: $user_id) {
		id
		email
		intra_login
		nickname
		avatar
		level
		rank
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