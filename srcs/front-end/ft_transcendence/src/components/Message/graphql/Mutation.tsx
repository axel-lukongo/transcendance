import {gql} from '@apollo/client';

export const CREATE_MSG = gql`
  mutation CreateMessage($createMsgInput: CreateMessageInput!) {
    createMessage(createMsgInput: $createMsgInput) {
      content
      sender_id
      channel_id 
    }
  }
`;

export const CREATE_TOBLOC_MUTATION = gql`
  mutation createTobloc($blockerId: Int!, $blockedId: Int!) {
    createToBloc(blockerId: $blockerId, blockedId: $blockedId) {
      id
	  blocker_id
      blocked_id
    }
  }
`;
export 	const ACCEPT_CHANEL = gql`mutation AcceptRequestChanel($input: UpdateChanelUserInput!) {
	acceptRequest(key: $input) {
		pending
	}
}`;

export 	const CREATE_CHANEL = gql`mutation CreateChanel($input: CreateChanelInput!) {
	createChanel(createChanelInput: $input) {
		id
		owner_id
		chanel_name
	}
}`;

export const QUITE_CHANEL = gql`mutation QuiteChanel($input: UpdateChanelUserInput!) {
	deleteChanelUser(key: $input) {
		user_id
	}
}`;

export const ADD_CHANEL = gql`mutation AddChanel($input: AddUserChanel!) {
	addUser(addUserChanel: $input) {
		pending
	}
}`;

export const UPDATE_CHANEL_USER = gql`
  mutation UpdateChanelUser($key: UpdateChanelUserInput!) {
    updateChanelUser(key: $key) {
      user_id
      chanel_id
      is_muted
      is_admin
    }
  }
`;


export const UPDATE_CHANEL_ADMIN = gql`
  mutation UpdateChanelAdmin($key: UpdateChanelUserInput!) {
    updateChanelAdmin(key: $key) {
      user_id
      chanel_id
      is_muted
      is_admin
    }
  }
`;


export const DELETE_CHANEL_USER_MUTATION = gql`
  mutation DeleteChanelUser($key: UpdateChanelUserInput!) {
    deleteChanelUser(key: $key) {
      user_id
      chanel_id
      is_muted
      is_admin
    }
  }
`;



export const CREATE_BANNED_MUTATION = gql`
  mutation CreateBanned($createBannedInput: CreateBannedInput!) {
    createBanned(createBannedInput: $createBannedInput) {
      id
      user_id
      channel_id
    }
  }
`;


export const REMOVE_BANNED_MUTATION = gql`
  mutation RemoveBanned($userId: Int!, $channelId: Int!) {
    removeBanned(userId: $userId, channelId: $channelId) {
      id
      user_id
      channel_id
    }
  }
`;

