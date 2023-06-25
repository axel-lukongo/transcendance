import React from "react";
import { ADD_USER_IN_CHANEL } from "../graphql/MutationsContact";
import { useMutation } from "@apollo/client";
import { IRequestProps } from "../interfaces/Requests.interface";

export default function AddChanel({element, refetchContact, label}: IRequestProps) {

	const [addUserChanel] = useMutation(ADD_USER_IN_CHANEL);

	const handleClic = () => {
		addUserChanel({
			variables: {
				input: { element }
			}
		}).then(() => {
			refetchContact();
		}).catch((error) => {
			console.log("error: ", error.networkError.result);
		})
	}

	return (
		<div>
			<button onClick={handleClic} >{label}</button>
		</div>
	)
}