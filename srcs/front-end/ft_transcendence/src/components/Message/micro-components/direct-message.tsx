import { gql,useQuery, useMutation } from "@apollo/client";
import { GET_CONTACT } from "../graphql/Query";
// import React from 'react';
import { IContacts, IPropsChanel, IRequest } from "../../interfaces/interfaces";
import { CREATE_CHANEL } from "../graphql/MutationsChanel";
import {useState} from 'react';
import Creat_direct_msg from "./Creat_direct_msg";
import { IPrivateMessageProps } from "../../interfaces/interfaces";
import Tobloc from "./Tobloc";
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
	const myuser = JSON.parse(sessionStorage.getItem('user') || '');

	const [ShowProfil ,setShowProfil] = useState(false);
	const [SelectedUserIndex ,setSelectedUserIndex] = useState(0);


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

	const handleShowProfil = (userIndex: number) => {
		setShowProfil(true);
		setSelectedUserIndex(userIndex);
	};



	return(

		<div id="plist" className="people-list">
			<div className="position: sticky">{ 
				<h3>Direct Message</h3>
			}</div>

			{data.myContacts.map((contact: IContacts, index:number) => {
				const unique_key=`${contact.id}-${contact.contact.id}`;
				return (

					<div className="list-of-direct-msg" key={unique_key}> 
						<button className="direct-msg-btn" onClick={() => handleNewDirectMsg(contact.contact.id)}>
							<img className="avatar-in-direct-msg" src={contact.contact.avatar} alt="avatar" />
							<div className="my-about">
								<div className="name-in-direct-msg"> {contact.contact.nickname}</div>
							</div>
						</button>
						<button className="btn_profile " onClick={() => handleShowProfil(index)}></button>
						{ShowProfil === true && SelectedUserIndex === index && (
							<Profil_page handleShowProfil={handleShowProfil} user={contact.contact} />
						)}
						<button className="btn_blocked" onClick={() => setHandleTobloc(true)}></button>
						{selectedContactId === contact.contact.id && < Creat_direct_msg
						interlocutor={contact.contact}
						handlechanelfocus={props.handleChanelFocus} />}
						{handleTobloc === true && < Tobloc blockerId={myuser.id} blockedId={contact.contact.id}/>}
					</div>
				);
			})}
		</div>
	);
}