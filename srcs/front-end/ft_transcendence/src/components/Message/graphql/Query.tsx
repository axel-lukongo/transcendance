import {gql} from '@apollo/client';

export const GET_MESSAGES_BY_CHANNEL = gql`
  query GetMessagesByChannel($channelId: Int!) {
    Message_findAll_msg_chan(channelId: $channelId) {
      content
    }
  }
`;

export const GET_CHAN_BY_OWNER_AND_INTERLOCUTOR = gql`
  query GetChannelByOwnersAndInterlocutor($userId1: Int!, $userId2: Int!) {
		getChannelByOwnersAndInterlocutor(userId1: $userId1, userId2: $userId2) {
			id
			chanel_name
			owner_id
			interlocutor_id
		}
	}
`;

export const GET_CONTACT = gql`
	query MyContacts($user_id: Int!){
		myContacts(user_id: $user_id) {
			user_id
			contact_id
			contact(user_id: $user_id){
				nickname
				id
			}
		}
	}
`;