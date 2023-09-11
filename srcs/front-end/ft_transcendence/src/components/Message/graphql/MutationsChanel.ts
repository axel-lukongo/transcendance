import { gql } from "@apollo/client"

export 	const ACCEPT_CHANEL = gql`mutation AcceptRequestChanel($input: UpdateChanelUserInput!) {
	acceptRequest(key: $input) {
		pending
		
	}
}`

export 	const CREATE_CHANEL = gql`mutation CreateChanel($input: CreateChanelInput!) {
	createChanel(createChanelInput: $input) {
		id
		owner_id
		chanel_name
		logo
		interlocutor_id
		private
		interlocutor{
			nickname
			avatar
		}
	}
}`


// export const ADD_CHANEL = gql`
//   mutation AddChanel($input: AddUserChanel!) {
// 	addUser(addUserChanel: $input) {
// 		id
// 		pending
// 	}
// }`
