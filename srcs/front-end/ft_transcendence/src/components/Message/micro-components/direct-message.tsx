import { useContext } from "react";
import { useQuery } from "@apollo/client";
import { GET_CONTACT } from "../graphql/Query";
import { IContactsLink } from "../../interfaces/interfaces";
import {useEffect, useState} from 'react';
import Creat_direct_msg from "./Creat_direct_msg";
import { IPrivateMessageProps } from "../../interfaces/interfaces";
import Tobloc from "./Tobloc";
import { User } from "../../interfaces/interfaces";
import { SUB_STATE } from "../../Contact/graphql/Querys";
import { WebSocketContext } from "../../../WebSocketProvider";

import Profil_page from "../../Contact/micro-components/buttons/Profil_page";

/*
dans ce composant j'affiche la liste de mes contact sur le champs de gauche, et chaque contact possedes des boutons

le boutons pour communiquer avec ce contact:
>>> Creat_direct_msg a la ligne 71

et le bouton pour un contact 
>>>bloquer, a la ligne 76.

Ces fonctions ce declanche lorsque un boolean specifique passe a true.
*/
export default function Direct_message(props: IPrivateMessageProps) {

	/* //////////////////////////////////////////////////////// */
	/* States */

	const myuser = JSON.parse(sessionStorage.getItem('user') || '');
	const wsContext = useContext(WebSocketContext);

	const [ShowProfil ,setShowProfil] = useState(false);
	const [SelectedUserIndex ,setSelectedUserIndex] = useState(0);


	const [selectedContactId, setSelectedContactId] = useState<number | null>(null);
	
	const [updateState, setUpdateState] = useState<Partial<User>>({})
	
	const [handleTobloc, setHandleTobloc] = useState(false);
	
	const [states, setStates] = useState<IContactsLink[]>([]);

	/* //////////////////////////////////////////////////////// */
	/* Query / Mutations */

	const {data, error, loading, refetch} = useQuery(GET_CONTACT, {
		variables: {user_id: myuser.id}
	});

	/* //////////////////////////////////////////////////////// */
	/* Use Effects */
	
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

	/* //////////////////////////////////////////////////////// */
	/* Handlers */

	const handleNewDirectMsg = (contactId: number) => {
		setSelectedContactId(contactId);
	}
	
	
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
		switch (state) {
			case 1: 
				return ('active');
			case 2: 
				return ('afk');
			case 3: 
				return ('disconnected');
			default:
				return 'error';
		}
	}

	/* //////////////////////////////////////////////////////// */
	/* JSX.Element return  */

	const handleShowProfil = (userIndex: number, show:boolean) => {
		setShowProfil(show);
		setSelectedUserIndex(userIndex);
	};

	const handleshowBlocked = (state: boolean) => {
		setHandleTobloc(state);
	}

	return(

		<div className="people-list">
			<div className="header-side-bar">{ 
				<h3>Direct Message</h3>
			}</div>

			{states.map((contact: IContactsLink, index:number) => {
				const unique_key=`${contact.id}-${contact.contact.id}`;
				return (
					<ul className="chat-list " key={unique_key}>
						<li onClick={() => handleNewDirectMsg(contact.contact.id)} className="card-chat-list">
							<div className="about">
								<div className="img-states">
									<img src={ wsContext?.user?.avatar } alt="avatar" />
									<div className="state" id={ findClassState(contact.contact.state) }></div> 
								</div>
								<div className="name"> { contact.contact.nickname }</div>
								{
									selectedContactId === contact.contact.id 
									&& < Creat_direct_msg
											interlocutor={contact.contact}
											handlechanelfocus={props.handleChanelFocus}
										/>
								}

								{ShowProfil === true && SelectedUserIndex === index && (
									<Profil_page handleShowProfil={handleShowProfil} user={contact.contact} />
								)}
								<button className="btn_profile " onClick={() => handleShowProfil(index, true)}>
								</button>

								{
									handleTobloc === true 
									&& < Tobloc 
											blockerId={myuser.id}
											blockedId={contact.contact.id}
											handleshowBlocked={handleshowBlocked}
										/>
								}
								<div id="blocked_btn" onClick={() => setHandleTobloc(true)}></div>
							</div>
						</li>
					</ul>
				);
			})}
		</div>
	);
}