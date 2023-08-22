import React, { useEffect } from "react";
import {  useQuery } from "@apollo/client";
import { IPropsChanel } from "../../../interfaces/interfaces";
import { UserChanels } from "../../../interfaces/interfaces";
import QuiteChanel from "../buttons/QuitChanel";
import { CHANELS_LIST } from '../../graphql/Query'
import CardChanel from "../Box/CardChanel";

import { __CREATE_CHANEL__ } from "../../message";

export default function ChanelList(props: IPropsChanel) {

	/* //////////////////////////////////////////////////////// */
	/* State */
	const {data, refetch, error} = useQuery(CHANELS_LIST, {
		variables: {
			private_chan: props.private_chan
		}
	})

	/* //////////////////////////////////////////////////////// */
	/* Use Effects */

	// useEffect(() => {
		refetch();
	// }, [])

	/* //////////////////////////////////////////////////////// */
	/* Querry Error */

	if (error)
		return (<div>An Error as occured her</div>)

	if (!data)
		return (<div>nothing to see her</div>)

	/* //////////////////////////////////////////////////////// */
	/* Handlers */

	const handleClic = () => {
		props.handleChatBox(__CREATE_CHANEL__);
	}

	/* //////////////////////////////////////////////////////// */
	/* JSX.Element return  */

	return (
		
		<div className="people-list">
			<div className="header-side-bar">
			{
				props.private_chan ? 
					<h3>
						Private Chanels 
						<button onClick={handleClic}>+</button></h3>
					: <h3>
						Public Chanels 
						<button onClick={handleClic}>+</button>
					</h3>
			}
			</div>
			<div>
			{
				data.myChanels.map((chanel: UserChanels, index: number) => {
					const unique_key = `${chanel.user_id}-${chanel.chanels.id}`;
					return (
						<ul className="chat-list" key={unique_key}>
							<CardChanel 
								chanel={chanel}
								handleChanelFocus={props.handleChanelFocus}
								handleChatBox={props.handleChatBox}
							/>
						</ul>);
				})
			}</div>
		</div>
	)
}