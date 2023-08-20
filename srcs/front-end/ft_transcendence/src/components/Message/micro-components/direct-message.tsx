import React, {useContext} from "react";
import { gql,useQuery, useMutation } from "@apollo/client";
import { GET_CONTACT } from "../graphql/Query";
// import React from 'react';
import { IContactsLink, IPropsChanel, IRequest } from "../../interfaces/interfaces";
import {useEffect, useState} from 'react';
import Creat_direct_msg from "./Creat_direct_msg";
import { IPrivateMessageProps } from "../../interfaces/interfaces";
import Tobloc from "./Tobloc";
import { User } from "../../interfaces/interfaces";
import { SUB_STATE } from "../../Contact/graphql/Querys";
import { WebSocketContext } from "../../../WebSocketProvider";


/*
dans ce composant j'affiche la liste de mes contact sur le champs de gauche, et chaque contact possedes des boutons

le boutons pour communiquer avec ce contact:
>>> Creat_direct_msg a la ligne 71

et le bouton pour un contact 
>>>bloquer, a la ligne 76.

Ces fonctions ce declanche lorsque un boolean specifique passe a true.
*/
export default function Direct_message(props: IPrivateMessageProps) {
	const myuser = JSON.parse(sessionStorage.getItem('user') || '');
	const wsContext = useContext(WebSocketContext);
	const [selectedContactId, setSelectedContactId] = useState<number | null>(null);
	const [updateState, setUpdateState] = useState<Partial<User>>({})


	const {data, error, loading, refetch} = useQuery(GET_CONTACT, {
		variables: {user_id: myuser.id}
	});

	const [states, setStates] = useState<IContactsLink[]>([]);

	
	useEffect(() => {
		refetch();
	}, [])
	
	useEffect(() => {
		if (wsContext?.wsClient) {
			let state_sub = wsContext.wsClient.request({query: SUB_STATE}, ).subscribe({
				next(response) {
					if (response.data) {
						let update = response.data.changeState;
						setUpdateState(update as User);
					}
				},
				error(e) {
					console.log('error state: ', e);
				}
			})
			return () => {
				state_sub.unsubscribe();
			}
		}
    }, [wsContext]);

	useEffect(() => {
		const ChangeState = () => {
			let update = states.map( (contacts: IContactsLink ) => {
				if (contacts.contact.id == updateState.id){
					return ({...contacts, contact: { ...contacts.contact, state: updateState.state } });
				} 
				return contacts;
			})
			if (update) {
				setStates(update as [IContactsLink]);
			}
		}
		ChangeState();
	}, [updateState])

	useEffect(() => {
		if (data && data.myContacts)
			setStates(data.myContacts);
	}, [data])

	const handleNewDirectMsg = (contactId: number) => {
		setSelectedContactId(contactId);
	}
	
	const [handleTobloc, setHandleTobloc] = useState(false);
	
	if (error){
		return <p> an error appen  </p>
	}
	
	if (loading){
		return <p>loading...</p>
	}
	
	if (!data || !data.myContacts) {
		return <p>No contacts available.</p>;
	}
	
	const findClassState = (state: number) => {
		// console.log(state);
		switch (state) {
			case 1: 
				return ('state-active');
			case 2: 
				return ('state-afk');
			case 3: 
				return ('state-disconnected');
			default:
				return 'error';
		}
	}


	return(

		<div id="plist" className="people-list">
			<div className="position: sticky">{ 
				<h3>Direct Message</h3>
			}</div>

			{states.map((contact: IContactsLink) => {
				const unique_key=`${contact.id}-${contact.contact.id}`;
				return (
					<ul className="list-unstyled chat-list mt-2 mb-0" key={unique_key}> 
						<img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="avatar" />{/**afficher avatar */}
						<div className="about">
							<div className="name"> {contact.contact.nickname}</div>
							<div className={findClassState(contact.contact.state)}></div>
							{selectedContactId === contact.contact.id && < Creat_direct_msg
							interlocutor={contact.contact}
							handlechanelfocus={props.handleChanelFocus} />}
							{handleTobloc === true && < Tobloc blockerId={myuser.id} blockedId={contact.contact.id}/>}
							<button id="blocked_btn" onClick={() => setHandleTobloc(true)}></button>
							<button onClick={() => handleNewDirectMsg(contact.contact.id)}>message</button>
						</div>
					</ul>
				);
			})}
		</div>
	);
}