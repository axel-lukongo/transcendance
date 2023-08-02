import { gql,useQuery, useMutation } from "@apollo/client";
import { GET_CONTACT } from "../graphql/Query";
// import React from 'react';
import { IContacts, IPropsChanel, IRequest } from "../../interfaces/interfaces";
import { CREATE_CHANEL } from "../graphql/MutationsChanel";
import {useState} from 'react';
import Creat_direct_msg from "./Creat_direct_msg";
import { IPrivateMessageProps } from "../../interfaces/interfaces";
// import Tobloc from "./Tobloc";

export default function Direct_message(props: IPrivateMessageProps) {
	const myuser = JSON.parse(sessionStorage.getItem('user') || '');
	const [showQueryComponent, setShowQueryComponent] = useState(false);

	const [selectedContactId, setSelectedContactId] = useState<number | null>(null);

	const {data, error, loading} = useQuery(GET_CONTACT, {
		variables: {user_id: myuser.id}
	});
	// const [createChanel] = useMutation(CREATE_CHANEL);

	const handleNewDirectMsg = (contactId: number) => {
		setSelectedContactId(contactId);
	}


	// console.log('je test ici: ', data)

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
						{selectedContactId === contact.contact.id && < Creat_direct_msg handleChange={props.handleChanelFocus}
						interlocutor={contact.contact}
						handleChanelRefecth={props.handleChanelRefetch} />}
						<button onClick={() => handleNewDirectMsg(contact.contact.id)}>message</button>
						{/* <button onClick={() => handleNewDirectMsg()}>message</button> */}
					</ul>
				);
			})}


		</div>
	);
}