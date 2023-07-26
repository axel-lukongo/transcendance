import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import {  UserChanels, IPropsChanel } from "../../../interfaces/interfaces";
import {USER_CHANEL_LIST} from '../../graphql/QueryChanel'
import AcceptChanel from '../buttons/AcceptChanel'
import QuiteChanel from "../buttons/QuitChanel";
import { User } from "../../../Interface";

interface ITmpProps {
	user: User;
}

export default function ListChanelRequests(/* {refetchChanels, handleChanelRefetch}: IPropsChanel */{user}: ITmpProps) {

	const {data, loading, refetch, error} = useQuery(USER_CHANEL_LIST, {
		variables: {
			input: user.id
		}
	});

	// useEffect(() => {
	// 	refetch();
	// }, [refetchChanels])

	if (loading)
		return (<div>Loading...</div>)

	if (error)
		return (<div>An error as occured!</div>)

	if (!data)
		return (<div>nothing to see her yet</div>)

		return (
			
			<div id="plist" className="people-list">
			<h3>Chanel Request</h3>{
				data.chanelsRequest.map((chanel: UserChanels, index: number) => {
					const unique_key = `${chanel.user_id}-${chanel.chanels.id}`

					return (
					<ul key={unique_key} className="list-unstyled chat-list mt-2 mb-0">
						<li >
							<div><b>{chanel.chanels.chanel_name}</b></div>
							<AcceptChanel 
								element={chanel} 
								label="Join" 
								// handleChanelRefecth={handleChanelRefetch}
							/>
							<QuiteChanel 
								element={chanel}
								label="refuse"
								// handleChanelRefecth={handleChanelRefetch}
							/>
						</li>
					</ul>
					);
				})
			}</div>
	)
}