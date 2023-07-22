import { gql } from "@apollo/client";

export const USER_CHANEL_LIST = gql`query UserChanelList($input: Int!) {
	chanelsRequest(user_id: $input) {
		pending
		user_id
		chanels {
			id
			chanel_name
		}
	}
}`

export const CHANELS_LIST = gql`query GetChanelList($input: Int!) {
	myChanels(user_id: $input) {
		pending
		user_id
		chanels {
			chanel_name
			id
		}
	}
}`