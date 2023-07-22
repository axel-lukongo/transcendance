import React, { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { IPropsChanel } from "../../interfaces/interfaces";
import { UserChanels } from "../../interfaces/interfaces";
import QuiteChanel from "./QuitChanel";
import { CHANELS_LIST } from '../graphql/QueryChanel'

export default function ChanelList({refetchChanels, handleChanelRefetch}: IPropsChanel) {

	const {data, loading, refetch, error} = useQuery(CHANELS_LIST, {
		variables: {
			input: 1
		}
	})

	useEffect(() => {
		refetch();
	}, [refetchChanels, refetch])

	if (loading)
		return (<div>Loading</div>)

	if (error)
		return (<div>An Error as occured</div>)

	if (!data)
		return (<div>nothing to see her</div>)

	return (
		
		<div id="plist" className="people-list">
			<h3>My Chanels</h3>{
				data.myChanels.map((chanel: UserChanels, index: number) => {
					const unique_key = `${chanel.user_id}-${chanel.chanels.id}`
				
					return (
						<ul className="list-unstyled chat-list mt-2 mb-0" key={unique_key}>
						<li >
							<CardChanel />
							<div>chanel_name: <b>{chanel.chanels.chanel_name}</b></div>
							<div>pending: {chanel.pending.toString()}</div>
							<QuiteChanel
								label="Quite"
								element={chanel}
								handleChanelRefecth={handleChanelRefetch}
								/>
						</li>
					</ul>
				);
			})
		}</div>
	)
}