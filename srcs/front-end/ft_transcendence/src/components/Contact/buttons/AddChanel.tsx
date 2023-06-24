import React from "react";
import { ADD_USER_IN_CHANEL } from "../graphql/MutationsContact";
import { useMutation } from "@apollo/client";
import { IRequestProps } from "../interfaces/Requests.interface";

export default function AddChanel({element, refetchContact, label}: IRequestProps) {


	const contact_id = element.contact_id;

	
	return (
		<div>
			{/* <button onClick={handleClic} >{label}</button> */}
		</div>
	)
}