import { useMutation } from "@apollo/client";
import React from "react";
import { IRequest } from "../../../interfaces/interfaces";
import { ACCEPT_CHANEL } from '../../graphql/Mutation'

export default function AcceptChanel({element, handleChanelRefetch, label}: IRequest ) {


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
				handleChanelRefetch();
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