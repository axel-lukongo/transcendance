
// import React from 'react';
// import { useQuery, gql } from '@apollo/client';

// const GET_CHANNEL_CONTENT = gql`
//   query GetChannelContent {
//     Channel_findOne(id: 1) {
//       chanel_name
//       id
//     }
//   }
// `;

// const Chat = ({show}: {show: boolean}) => {
// 	const { loading, error, data } = useQuery(GET_CHANNEL_CONTENT);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
// 	// console.log("laaaaaaaaaaa");
//     return <p>Error: {error.message}</p>;
//   }

//   const channel = data.Channel_findOne;

//   return (
//     <div className={`Chat ${show ? 'show' : ''}`}>
//       <h1>{channel.chanel_name}</h1>
//       {/* <ul>
//         {channel.messages.map((message) => (
//           <div> user {message.sender_id}: {message.content}</div>
//         ))}
//       </ul> */}
//     </div>
//   );
// };

// export default Chat;










// import React, {useEffect, useState} from 'react';
// import {gql} from 'graphql-tag';
// import {SubscriptionClient} from 'subscriptions-transport-ws';
// // import {type} from 'os';

// const wsClient = new SubscriptionClient('ws://localhost:4000/graphql', {});

// const NewMessageSubscription = gql`
// 	subscription {
// 	addmessage {
// 		id
// 		content
// 		sender_id
// 	}
// 	}
// `;

// type Message = {
// 	id: number;
// 	sender_id: number;
// 	content: string;
// };

// const Chat = ({show}: {show: boolean}) => {
// 	const [messages, setMessages] = useState<Message[]>([]);

// 	useEffect(() => {
// 		const subscription = wsClient.request({query: NewMessageSubscription}).subscribe({
// 			next(response) {
// 				// Next est une fonction de suscribe qui s'execute a chaque nouveau changements
// 				// reponse c'est la ou les reponse de notre server est stocker.
// 				if (response.data) {
// 					const newMessage = response.data.addmessage;
// 					setMessages(prevMessages => [...prevMessages, newMessage] as Message[]); // On copie les messages precedent et on rajoute newMessage
// 				}
// 			},
// 			error(error) {
// 				console.error('WebSocket error:', error);
// 			},
// 		});
// 		return () => {
// 			subscription.unsubscribe();
// 		};
// 	}, []);
// 	// Le [] c'est le tableau de dependance, lorsque il est vide ca signifie que on execute notre useEffect que 1 fois

// 	return (
// 		<div className={`Chat ${show ? 'show' : ''}`}>
// 			<h1>Messages en temps réel</h1>
// 			<ul>
// 				{messages.map(message => (
// 					<div key={message.id}> {message.sender_id} : {message.content}</div>
// 				))}
// 			</ul>
// 		</div>
// 	);
// };

// export default Chat;






import React, {useEffect, useState} from 'react';
import {gql} from 'graphql-tag';
import {SubscriptionClient} from 'subscriptions-transport-ws';
import {type} from 'os';

const wsClient = new SubscriptionClient('ws://localhost:4000/graphql', {});

const NewMessageSubscription = gql`
	subscription {
	addmessage {
		id
		content
		sender_id
	}
	}
`;

type Message = {
	id: number;
	sender_id: number;
	content: string;
};

const Chat = ({show}: {show: boolean}) => {
	const [messages, setMessages] = useState<Message[]>([]);

	useEffect(() => {
		const subscription = wsClient.request({query: NewMessageSubscription}).subscribe({
			next(response) {
				// Next est une fonction de suscribe qui s'execute a chaque nouveau changements
				// reponse c'est la ou les reponse de notre server est stocker.
				if (response.data) {
					const newMessage = response.data.addmessage;
					setMessages(prevMessages => [...prevMessages, newMessage] as Message[]); // On copie les messages precedent et on rajoute newMessage
				}
			},
			error(error) {
				// console.log(" --------------------------------- ");
				console.error('WebSocket error:', error);
			},
		});
		return () => {
			subscription.unsubscribe();
		};
	}, []);
	// Le [] c'est le tableau de dependance, lorsque il est vide ca signifie que on execute notre useEffect que 1 fois

	return (
		<div className={`Chat ${show ? 'show' : ''}`}>
			<h1>Messages en temps réel</h1>
			<ul>
				{messages.map(message => (
					<div key={message.id}> {message.sender_id} : {message.content}</div>
				))}
			</ul>
		</div>
	);
};

export default Chat;
