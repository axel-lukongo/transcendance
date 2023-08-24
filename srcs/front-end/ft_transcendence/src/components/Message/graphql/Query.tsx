import { gql } from '@apollo/client';

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
			chanel_size
			max_users
			owner_id
			logo
			interlocutor_id
			directMsg
			interlocutor{
				nickname
				avatar
			}
		}
	}
`;

export const GET_CONTACT = gql`
	query MyContacts {
		myContacts {
			id
			user_id
			contact_id
			contact{
				id
				email
				intra_login
				nickname
				avatar
				level
				rank
			}

		}
	}
`;
export const USER_CHANEL_LIST = gql`query UserChanelList {
	chanelsRequest {
		pending
		user_id
		chanels {
			id
			chanel_name
		}
	}
}`;

export const CHANELS_LIST = gql`query GetChanelList($private_chan: Boolean!) {
	myChanels(private_chan: $private_chan) {
		pending
		user_id
		chanels {
			owner_id
			chanel_name
			id
			chanel_size
			max_users
			logo
		}
	}
}`;

export const ALL_USERS = gql`query SearchUserForChan($chanel_id: Int!){
searchUserForChan(chanel_id: $chanel_id) {
    id
    nickname
  }
}`


export const CHANNEL_MEMBERS_QUERY = gql`
  query ChanMembers($chan_id: Int!){
			ChannelMembers(channel_id: $chan_id) {
			user_id
			is_muted
			is_admin
			user {
				nickname
			}
		}
	}
`;
export const BANNED_LIST_QUERY = gql`
  query BannedList($channelId: Int!) {
    banned_list( channelId: $channelId) {
	 user_id
	 channel_id
      user_ban {
		nickname
      }
    }
  }
`;


export const USER_IS_BLOCKED = gql`
  query IsBlocked($other_userId: Int!) {
    IsBlocked(other_userId: $channelId) {
		id 
	}
  }
`;