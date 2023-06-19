
// import React from 'react';
// import { useQuery, gql } from '@apollo/client';

// const GET_CHANNEL_CONTENT = gql`
//   query GetChannelContent {
//     Channel_findOne(id: 1) {
//       chanel_name
//       id
//       messages {
//         sender_id
//         content
//       }
//     }
//   }
// `;

// const Chat = ({ show }) => {
// 	const { loading, error, data } = useQuery(GET_CHANNEL_CONTENT);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>Error: {error.message}</p>;
//   }

//   const channel = data.Channel_findOne;

//   return (
//     <div className={`Chat ${show ? 'show' : ''}`}>
//       <h1>{channel.chanel_name}</h1>
//       <ul>
//         {channel.messages.map((message) => (
//           <div> user {message.sender_id}: {message.content}</div>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Chat;

import React, { useEffect, useState } from 'react';
import { gql } from 'graphql-tag';
import { SubscriptionClient } from 'subscriptions-transport-ws';

const wsClient = new SubscriptionClient('ws://localhost:4000/graphql', {});

const NEW_MESSAGE_SUBSCRIPTION = gql`
  subscription {
    addmessage {
      id
      content
	  sender_id
    }
  }
`;

const Chat = ({ show }) => {
	const [messages, setMessages] = useState([]);

  useEffect(() => {
    const subscription = wsClient.request({ query: NEW_MESSAGE_SUBSCRIPTION }).subscribe({
      next: (response) => {
        const newMessage = response.data.addmessage;
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      },
      error: (error) => {
        console.error('WebSocket error:', error);
      },
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className={`Chat ${show ? 'show' : ''}`}>
      <h1>Messages en temps réel</h1>
      <ul>
        {messages.map((message) => (
          <div key={message.id}> {message.sender_id} : {message.content}</div>
        ))}
      </ul>
    </div>
  );
}

export default Chat;
