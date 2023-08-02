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