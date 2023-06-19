
import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_CHANNEL_CONTENT = gql`
  query GetChannelContent {
    Channel_findOne(id: 1) {
      chanel_name
      id
      messages {
        sender_id
        content
      }
    }
  }
`;

const Chat = ({ show }) => {
	const { loading, error, data } = useQuery(GET_CHANNEL_CONTENT);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const channel = data.Channel_findOne;

  return (
    <div className={`Chat ${show ? 'show' : ''}`}>
      <h1>{channel.chanel_name}</h1>
      <ul>
        {channel.messages.map((message) => (
          <div> user {message.sender_id}: {message.content}</div>
        ))}
      </ul>
    </div>
  );
};

export default Chat;
