// import React, { useState } from 'react';
// import '../../css/message.css';

// const Chat = ({ show }) => {
//   const [messages, setMessages] = useState([]);
//   const [inputValue, setInputValue] = useState('');

//   const handleInputChange = (e) => {
//     setInputValue(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (inputValue.trim() !== '') {
//       setMessages([...messages, inputValue]);
//       setInputValue('');
//     }
//   };

//   return (
//     <div className={`Chat ${show ? 'show' : ''}`}>
//       <h2>Chat</h2>
//       <div>
//         {messages.map((message, index) => (
//           <div key={index}>{message}</div>
//         ))}
//       </div>
//       <form onSubmit={handleSubmit}>
//         <input type="text" value={inputValue} onChange={handleInputChange} />
//         <button type="submit">Send</button>
//       </form>
//     </div>
//   );
// };

// export default Chat;


import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_CHANNEL_CONTENT = gql`
  query GetChannelContent {
    Channel_findOne(id: 1) {
      chanel_name
      id
      messages {
        id
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
          <div> {message.sender_id}: {message.content}</div>
        ))}
      </ul>
    </div>
  );
};

export default Chat;
