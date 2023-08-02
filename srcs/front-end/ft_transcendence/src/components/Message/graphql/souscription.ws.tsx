import {gql} from '@apollo/client';


export const NewMessageSubscription = gql`
  subscription ($input: Int!) {
	addmessage(channel_id: $input) {
		id
		content
		sender_id
	}
	}
`;
