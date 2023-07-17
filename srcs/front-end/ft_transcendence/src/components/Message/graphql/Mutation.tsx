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