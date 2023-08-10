import { gql,useQuery, useMutation } from "@apollo/client";
import { GET_CONTACT } from "../graphql/Query";
// import React from 'react';
import { IContacts, IPropsChanel, IRequest } from "../../interfaces/interfaces";
import { CREATE_CHANEL } from "../graphql/MutationsChanel";
import {useState} from 'react';
import Creat_direct_msg from "./Creat_direct_msg";
import { IPrivateMessageProps } from "../../interfaces/interfaces";
import Tobloc from "./Tobloc";

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

	const [selectedContactId, setSelectedContactId] = useState<number | null>(null);

	const {data, error, loading} = useQuery(GET_CONTACT, {
		variables: {user_id: myuser.id}
	});

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

	return(

		<div id="plist" className="people-list">
			<div className="position: sticky">{ 
				<h3>Direct Message</h3>
			}</div>

			{data.myContacts.map((contact: IContacts) => {
				const unique_key=`${contact.id}-${contact.contact.id}`;
				return (
					<ul className="list-unstyled chat-list mt-2 mb-0" key={unique_key}> 
						<p>{contact.contact.nickname}</p>
						{selectedContactId === contact.contact.id && < Creat_direct_msg
						interlocutor={contact.contact}
						handlechanelfocus={props.handleChanelFocus} />}
						{handleTobloc === true && < Tobloc blockerId={myuser.id} blockedId={contact.contact.id}/>}
						<button onClick={() => handleNewDirectMsg(contact.contact.id)}>message</button>
						<button onClick={() => setHandleTobloc(true)}>block</button>
					</ul>
				);
			})}
		</div>
	);
}