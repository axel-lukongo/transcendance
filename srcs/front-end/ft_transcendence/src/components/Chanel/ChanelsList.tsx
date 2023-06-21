import React from "react";
import { gql, useQuery } from "@apollo/client";
import { channel } from "diagnostics_channel";
import { Chanel, UserChanels } from "./interfaces/Chanels.interface";

export default function UserChanelsList() {

	const USER_CHANEL_LIST = gql`query UserChanelList($input: Int!) {
		myChanels(user_id: $input) {
			pending
			chanels {
				chanel_name
			}
		}
	}`

	const {data, loading, refetch, error} = useQuery(USER_CHANEL_LIST, {
		variables: {
			input: 1
		}
	});


	if (loading)
		return (<div>Loading...</div>)

	if (error)
		return (<div>An error as occured!</div>)

	if (!data)
		return (<div>nothing to see her yet</div>)
	else
		console.log(data.myChanels);

		return (
			<div>{
			data.myChanels.map((chanel: UserChanels, index: number) => (
				<ul>
					<li key={index}>
						<div>chanel_name: <b>{chanel.chanels.chanel_name}</b></div>
						<div>pending: {chanel.pending.toString()}</div>
					</li>
				</ul>
				))
			}</div>
	)
}