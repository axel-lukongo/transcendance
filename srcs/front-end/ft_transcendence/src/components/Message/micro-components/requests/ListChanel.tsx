import React, { useEffect } from "react";
import {  useQuery } from "@apollo/client";
import { IPropsChanel } from "../../../interfaces/interfaces";
import { UserChanels } from "../../../interfaces/interfaces";
import QuiteChanel from "../buttons/QuitChanel";
import { CHANELS_LIST } from '../../graphql/QueryChanel'
import CardChanel from "../Box/CardChanel";

export default function ChanelList(props: IPropsChanel) {

	/* //////////////////////////////////////////////////////// */
	/* State */
	const {data, refetch, error} = useQuery(CHANELS_LIST, {
		variables: {
			input: props.user.id,
			private_chan: props.private_chan
		}
	})

	/* //////////////////////////////////////////////////////// */
	/* Use Effects */

	useEffect(() => {
		refetch();
	}, [props.refetchChanels, refetch])

	/* //////////////////////////////////////////////////////// */
	/* Querry Error */

	if (error)
		return (<div>An Error as occured her</div>)

	if (!data)
		return (<div>nothing to see her</div>)

	/* //////////////////////////////////////////////////////// */
	/* Handlers */

	const handleClic = () => {
		props.handleAddChanel();
	}

	/* //////////////////////////////////////////////////////// */
	/* JSX.Element return  */

	return (
		
		<div id="plist" className="people-list">
			<div className="position: sticky">{props.private_chan ? 
			<h3>Private Chanels<button onClick={handleClic}>+</button></h3>
			: <h3>Public Chanels<button onClick={handleClic}>+</button></h3>
			}</div>
			<div>
			{
				data.myChanels.map((chanel: UserChanels, index: number) => {
					const unique_key = `${chanel.user_id}-${chanel.chanels.id}`;
					return (<ul className="list-unstyled chat-list mt-2 mb-0" key={unique_key}>
						<CardChanel 
							chanel={chanel}
							handleChanelFocus={props.handleChanelFocus}
						/>
				</ul>);
			})
			}</div>
		</div>
	)
}