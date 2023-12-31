import React from "react";
import { useMutation } from "@apollo/client";
import { IRequestProps } from "../../../interfaces/interfaces"
import { ACCEPTE_CONTACT } from "../../graphql/Mutations";

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
		<button id={label} onClick={handleClick}></button>
	);
}