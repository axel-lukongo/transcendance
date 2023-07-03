import { useMutation } from "@apollo/client";
// import React from "react";
import { IRequest } from "../interfaces/ButtonInterfaces";
import { ACCEPT_CHANEL } from '../graphql/MutationsChanel'

export default function AcceptChanel({element, handleChanelRefecth, label}: IRequest ) {


	const [acceptChanel] = useMutation(ACCEPT_CHANEL)

	const handleClick = () =>{
			acceptChanel({
				variables: {
					input: {
						user_id: element.user_id,
						chanel_id: element.chanels.id
					}
				}
			}).then((response) => {
				handleChanelRefecth();
			}).catch((error) => {
				console.log("Error: ", error.networkError.result);
			})
	}

	return (
		<div>
			<button onClick={handleClick}>{label}</button>
		</div>
	)
} 