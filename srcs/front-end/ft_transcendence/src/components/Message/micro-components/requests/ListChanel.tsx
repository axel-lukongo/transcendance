import React, { useEffect } from "react";
import {  useQuery } from "@apollo/client";
import { IPropsChanel } from "../../../interfaces/interfaces";
import { UserChanels } from "../../../interfaces/interfaces";
import QuiteChanel from "../buttons/QuitChanel";
import { CHANELS_LIST } from '../../graphql/QueryChanel'
import CardChanel from "../Box/CardChanel";

export default function ChanelList({refetchChanels,
										handleChanelRefetch,
										user,
										handleChange,
										handleAddChanel,
										private_chan}:
										IPropsChanel) {


	const {data, loading, refetch, error} = useQuery(CHANELS_LIST, {
		variables: {
			input: user.id,
			private_chan: private_chan
		}
	})

	useEffect(() => {
		refetch();
	}, [refetchChanels, refetch])

	if (loading)
		return (<div>Loading</div>)

	if (error)
		return (<div>An Error as occured her</div>)

	if (!data)
		return (<div>nothing to see her</div>)

	const handleClic = () => {
		handleAddChanel();
	}

	return (
		
		<div id="plist" className="people-list">
			<div className="position: sticky">{private_chan ? 
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
							handleChange={handleChange}
						/>
				</ul>);
			})
			}</div>
		</div>
	)
}