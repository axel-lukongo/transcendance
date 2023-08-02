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
    createToblocInput(blocker_id: $blockerId, blocked_id: $blockedId) {
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
