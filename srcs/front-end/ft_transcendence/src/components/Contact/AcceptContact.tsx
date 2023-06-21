import React from "react";
import { gql, useMutation } from "@apollo/client";
import { useEffect } from "react";
import { IRequestProps } from "./interfaces/Requests.interface"


export default function AcceptContact({element, refetchContact, label}: IRequestProps) {
	
	const ACCEPTE_CONTACT = gql`mutation ReplyAddContact($input: UpdateContact!){
		replyAddContact(reply: $input) {
			id
		}
	}`
	
	const [acceptContact] = useMutation(ACCEPTE_CONTACT);
	
	const handleClick = () => {
		
		acceptContact({
			variables: {
				input: {
					id: element.id,
					pending: false
				}	
			}
		}).then((result) => {
			refetchContact();
		})
		.catch((error) => {
			console.log('Réponse HTTP :', error.networkError.result);
		})
	}; 


	return (
	<div>
		<button onClick={handleClick}>{label}</button>
	</div>);
}