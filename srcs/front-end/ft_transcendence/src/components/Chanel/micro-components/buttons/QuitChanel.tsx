import React from "react";
import { useMutation, gql } from "@apollo/client";
import { IRequest } from '../../../interfaces/interfaces'
import { QUITE_CHANEL } from '../../graphql/MutationsChanel'

export default function QuiteChanel({handleChanelRefecth, element, label}: IRequest) {

	
	const [delContact] = useMutation(QUITE_CHANEL);

	const handleClic =  () => {
		delContact({
			variables: {
				input: {
					user_id: 1,
					chanel_id: element.chanels.id
				}
			}
		}).then(() => {
			handleChanelRefecth();
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