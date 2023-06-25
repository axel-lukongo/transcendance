import React from "react";
import { useMutation } from "@apollo/client";
import { IRequestProps } from "../interfaces/Requests.interface"
import { ACCEPTE_CONTACT } from "../graphql/MutationsContact";

export default function AcceptContact({element, refetchContact, label}: IRequestProps) {
		
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