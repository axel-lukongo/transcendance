import React from "react";
import {gql, useMutation} from "@apollo/client"
import { IRequestProps } from "./interfaces/Requests.interface";

export default function RefuseContact({element, refetchContact, label}: IRequestProps) {

	const REFUSE_CONTACT = gql`mutation RefuseRequestContact($input: Int!){
		deleteContact(id: $input){
			id
		}
	}`

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
