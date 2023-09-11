import React, { useContext } from "react";
import { useMutation } from "@apollo/client";
import { IRequest } from '../../../interfaces/interfaces'
import { QUITE_CHANEL } from '../../graphql/Mutation'
import refuse_logo from '../../../../image/refuse-danger.svg'
import { WebSocketContext } from "../../../../WebSocketProvider";

export default function QuiteChanel({handleChanelRefetch,  element}: IRequest) {

	
	const [delContact] = useMutation(QUITE_CHANEL);
	const wsContext = useContext(WebSocketContext);

	const handleClic =  () => {
		if (wsContext?.user) {
			delContact({
				variables: {
					input: {
						user_id: wsContext?.user.id,
						chanel_id: element.chanels.id
					}
				}
			}).then(() => {
				handleChanelRefetch();
			})
			.catch((error) => {
				console.log("Graphql error: ", error);
			});
		}
	};

	return (
		<button onClick={handleClic} className="req-chan-btn" >
			<img src={refuse_logo} alt="refuse" id="refuse-chan-req-btn"/>
		</button>
	)
}