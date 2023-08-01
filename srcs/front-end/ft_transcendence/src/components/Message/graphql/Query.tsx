import { gql } from '@apollo/client';

export const GET_MESSAGES_BY_CHANNEL = gql`
  query GetMessagesByChannel($channelId: Int!) {
    Message_findAll_msg_chan(channelId: $channelId) {
      content
    }
  }
`;

export const USER_CHANEL_LIST = gql`query UserChanelList($input: Int!) {
	chanelsRequest(user_id: $input) {
		pending
		user_id
		chanels {
			id
			chanel_name
		}
	}
}`;

export const CHANELS_LIST = gql`query GetChanelList($input: Int!, $private_chan: Boolean!) {
	myChanels(user_id: $input, private_chan: $private_chan) {
		pending
		user_id
		chanels {
			chanel_name
			id
			chanel_size
			max_users
			logo
		}
	}
}`;

export const ALL_USERS = gql`query SearchUserForChan($user_id: Int!, $chanel_id: Int!){
searchUserForChan(user_id: $user_id, chanel_id: $chanel_id) {
    id
    nickname
  }
}`