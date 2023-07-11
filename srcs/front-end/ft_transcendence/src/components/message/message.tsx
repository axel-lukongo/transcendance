import {useEffect, useState} from 'react';
import {gql} from 'graphql-tag';
import {SubscriptionClient} from 'subscriptions-transport-ws';
import { useQuery } from '@apollo/client';

//je me connect a mon server via le protocol websocket
const wsClient = new SubscriptionClient('ws://localhost:4000/graphql', {});

const NewMessageSubscription = gql`
  subscription ($input: Int!) {
	addmessage(channel_id: $input) {
		id
		content
		sender_id
	}
	}
`;


const GET_MESSAGES_BY_CHANNEL = gql`
  query GetMessagesByChannel($channelId: Int!) {
    Message_findAll_msg_chan(channelId: $channelId) {
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
 * @returns dans mon return j'affiche tout les nouveaux messages qui seront crée et destiné a un chanel en particulier
 */

const Chat = ({show}: {show: boolean}) => {
	const { loading, error, data } = useQuery(GET_MESSAGES_BY_CHANNEL,{variables: {channelId: 1}});
	const [messages, setMessages] = useState<Message[]>([]);
	// Si il y avais des chose dans intialMessages alors je le met dans mon useState

	useEffect(() => {
	  if (data && data.Message_findAll_msg_chan) {
		setMessages(data.Message_findAll_msg_chan);
	  }
	}, [data]);

	useEffect(() => {
		const subscription = wsClient.request({query: NewMessageSubscription, variables: { input: 1 }}).subscribe({
			next(response) {
				// Next est une fonction de suscribe qui s'execute a chaque nouvelle creation de message 
				// reponse c'est la ou les reponse de notre server est stocker.
				if (response.data) {
					const newMessage = response.data.addmessage;
					setMessages(prevMessages => [...prevMessages, newMessage] as Message[]); // On copie les messages precedent et on rajoute newMessage
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
			{/* <div> {data} </div> */}
			<ul>
				{messages.map(message => (
					<div key={message.id}> {message.content}</div>
				))}
			</ul>
		</div>
	);
};

export default Chat;
