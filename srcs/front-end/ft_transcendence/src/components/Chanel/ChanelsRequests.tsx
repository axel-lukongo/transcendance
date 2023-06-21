import React, { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import {  UserChanels } from "./interfaces/Chanels.interface";

export interface IPropsChanel {
	refetchChanels: boolean;
	handleChanelRefetch: () => void;
}

export default function UserChanelsRequests({refetchChanels, handleChanelRefetch}: IPropsChanel) {

	const USER_CHANEL_LIST = gql`query UserChanelList($input: Int!) {
		myChanels(user_id: $input) {
			pending
			user_id
			chanels {
				id
				chanel_name
			}
		}
	}`

	const {data, loading, refetch, error} = useQuery(USER_CHANEL_LIST, {
		variables: {
			input: 1
		}
	});

	useEffect(() => {
		refetch();
	}, [refetchChanels])

	if (loading)
		return (<div>Loading...</div>)

	if (error)
		return (<div>An error as occured!</div>)

	if (!data)
		return (<div>nothing to see her yet</div>)

		return (
			<div><h3>Chanel Request</h3>{
				data.myChanels.map((chanel: UserChanels, index: number) => {
					const unique_key = `${chanel.user_id}-${chanel.chanels.id}`

					return (
					<ul key={unique_key}>
						<li >
							<div>chanel_name: <b>{chanel.chanels.chanel_name}</b></div>
							<div>pending: {chanel.pending.toString()}</div>
						</li>
					</ul>
					);
				})
			}</div>
	)
}