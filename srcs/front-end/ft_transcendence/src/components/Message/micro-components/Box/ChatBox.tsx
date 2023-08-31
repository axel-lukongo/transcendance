import React, { useContext } from "react";
import {useEffect, useState} from 'react';
import { useQuery } from '@apollo/client';
import { GET_MESSAGES_BY_CHANNEL } from "../../graphql/Query";
import { NewMessageSubscription } from "../../graphql/souscription.ws";
import { WebSocketContext } from "../../../../WebSocketProvider";
// import { USER_IS_BLOCKED } from "../../graphql/Query";
import { MY_BLOCKED_LIST } from "../../../Contact/graphql/Querys";
import { Link } from "react-router-dom";

type Message = {
	id: number;
	sender_id: number;
	content: string;
	invite_game: boolean;
};

type channelfocus = {
	id: string,
	chanel_name: string,
	interlocutor_id : number;
	owner_id: string;
	logo: string,
}

interface ChatBoxProps{
	chan:channelfocus
}

interface NewMessageResponse {
	addmessage: {
	  id: number;
	  content: string;
	  sender_id: number;
	  invite_game: boolean;
	  // ... autres propriétés
	};
  }
interface BlockedEntry {
	id: number;
	blocker_id: number;
	blocked_id: number;
  }
  
  interface BlockedData {
	blocked: BlockedEntry[];
  }

  interface Tobloc {
	id: number;
	blocker_id: number;
	blocked_id: number;
	blocked: BlockedData; // Assurez-vous que BlockedData est correctement défini
  }
const is_blocked = (blockedList: Tobloc[], sender_id: number) => {
		return blockedList.some(entry => entry.blocked_id === sender_id );
}


const ChatBox: React.FC<ChatBoxProps> = ({ chan }) => {
    const user = JSON.parse(sessionStorage.getItem('user') || "");

	const { loading, error, data, refetch } = useQuery(GET_MESSAGES_BY_CHANNEL,{variables: {channelId: +chan.id}});
	const {  error:error2, data:data2 } = useQuery(MY_BLOCKED_LIST,{variables: {id: user.id}});
	
	const [messages, setMessages] = useState<Message[]>([]);
	const wsContext = useContext(WebSocketContext);


	useEffect(() => {
		if (data && data.Message_findAll_msg_chan) {
			refetch();
			setMessages(data.Message_findAll_msg_chan);
		}
	}, [data]);

	useEffect(() => {
		if (wsContext?.wsClient) {
			const subscription = wsContext.wsClient.request({query: NewMessageSubscription, variables: { input: +chan.id }}).subscribe({
				next(response) {
					// Next est une fonction de suscribe qui s'execute a chaque nouvelle creation de message 
					// reponse c'est la ou les reponse de notre server sont stocker.
					if (response.data) {
						const responseData = (response.data as any)['addmessage'] as NewMessageResponse['addmessage']; //addmessage de response.data etait de type inconnu donc j'ai du faire ca pour qu'il soir reconnu en tant que NewMessageResponse
						let usr_is_blocked = false;
						if(data2.person_blocked){
							usr_is_blocked = is_blocked(data2.person_blocked, responseData.sender_id);
						}
						if(usr_is_blocked === false){
							const newMessage = response.data.addmessage;
							setMessages(prevMessages => [...prevMessages, newMessage] as Message[]); // On copie les messages precedents et on rajoute newMessage
						}
					}
				},
				error(error) {
					console.error('WebSocket error:', error);
				},
			});
			return () => {
				subscription.unsubscribe();
			};
		}
	}, [+chan.id]);

	if(loading)
		return ( <div> loading... </div>)
	if(error)
		return ( <div> error </div>)

	const otherId = +chan.owner_id === user.id ? chan.interlocutor_id : +chan.owner_id
	return (

		// <div>
		// 	{messages.map((message, index) => (
		// 			<div key={index}> {message.content} {message.invite_game === true ? <button>game</button> : null} </div>
		// 		))}
		// </div>

		<div>
		{messages.map((message, index) => (
		  <div key={index}>
			{message.content}
			{message.invite_game === true ? (
			  <Link
				to={{
				  pathname: "/pong",
				  search: `?friendId=${otherId}`,
				}}
			  >
				<button className="game-btn" >JOIN GAME</button>
			  </Link>
			) : null}
		  </div>
		))}
		</div>
)
};

export default ChatBox;
