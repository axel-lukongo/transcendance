import React from "react";
import {useEffect, useState} from 'react';
import { useQuery } from '@apollo/client';
import {SubscriptionClient} from 'subscriptions-transport-ws';
import { GET_MESSAGES_BY_CHANNEL } from "../../graphql/Query";
import { NewMessageSubscription } from "../../graphql/souscription.ws";
import { wsClient } from "../../../.."; 

type Message = {
	id: number;
	sender_id: number;
	content: string;
};

type channelfocus = {
	id: string,
	chanel_name: string,
	chanel_size: string,
	max_users: string,
	logo: string,
}

interface ChatBoxProps{
	chan:channelfocus
}

const ChatBox: React.FC<ChatBoxProps> = ({ chan }) => {
	const { loading, error, data, refetch } = useQuery(GET_MESSAGES_BY_CHANNEL,{variables: {channelId: +chan.id}});
	const [messages, setMessages] = useState<Message[]>([]);
	// console.log('le channel: ====>>> ', chan);

	useEffect(() => {
		if (data && data.Message_findAll_msg_chan) {
			refetch();
			setMessages(data.Message_findAll_msg_chan);
		}
	}, [data]);

	useEffect(() => {
		const subscription = wsClient.request({query: NewMessageSubscription, variables: { input: +chan.id }}).subscribe({
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
	}, [+chan.id]);

	if(loading)
		return ( <div> loading... </div>)
	if(error)
		return ( <div> error </div>)

	return (

		<div>
			{messages.map((message, index) => (
					<div key={index}> {message.content}</div>
				))}
		</div>
	)
};

export default ChatBox;
