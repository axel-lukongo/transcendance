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
	}
}`


export const QUITE_CHANEL = gql`mutation QuiteChanel($input: UpdateChanelUserInput!) {
	deleteChanelUser(key: $input) {
		user_id
	}
}`