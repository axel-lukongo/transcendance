
import React, {useEffect, useState} from 'react';
import {gql} from 'graphql-tag';
import {SubscriptionClient} from 'subscriptions-transport-ws';
import {type} from 'os';

//je me connect a mon server via le protocol websocket
const wsClient = new SubscriptionClient('ws://localhost:4000/graphql', {});

const NewMessageSubscription = gql`
	subscription {
	addmessage(channel_id: 1) {
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

/**
 *
 * @returns dans mon return j'affiche tout les nouveaux messages qui seront crée et destiné a un chanel en particulier
 */

const Chat = ({show}: {show: boolean}) => {
	const [messages, setMessages] = useState<Message[]>([]);

	useEffect(() => {
		const subscription = wsClient.request({query: NewMessageSubscription}).subscribe({
			next(response) {
				// Next est une fonction de suscribe qui s'execute a chaque nouvelle creation de message 
				// reponse c'est la ou les reponse de notre server est stocker.
				if (response.data) {
					const newMessage = response.data.addmessage;
					setMessages(prevMessages => [...prevMessages, newMessage] as Message[]);
					// On copie les messages precedent dans prevMessages et on rajoute newMessage a l'interieur de ma variable messages
				}
			},
			error(error) {
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
