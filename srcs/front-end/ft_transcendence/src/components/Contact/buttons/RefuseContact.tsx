import React from "react";
import { useMutation } from "@apollo/client"
import { IRequestProps } from "../interfaces/Requests.interface";
import { REFUSE_CONTACT } from '../graphql/MutationsContact'

export default function RefuseContact({element, refetchContact, label}: IRequestProps) {

	const [delContact] = useMutation(REFUSE_CONTACT);

	const handleClic =  () => {
		delContact({
			variables: {
				input: element.id,
			}
		}).then(() => {
			refetchContact();
		})
		.catch((error) => {
			console.log("Graphql error: ", error);
			console.log("HTML error: ", error.networkError.result);
		});
	};

	return (
		<button onClick={handleClic} >{label}</button>
	)
}
