import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import {  UserChanels, IPropsChanel } from "../../../interfaces/interfaces";
import AcceptChanel from '../buttons/AcceptChanel'
import {USER_CHANEL_LIST} from '../../graphql/QueryChanel'



export default function UserChanelsRequests({refetchChanels, handleChanelRefetch}: IPropsChanel) {

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
				data.chanelsRequest.map((chanel: UserChanels, index: number) => {
					const unique_key = `${chanel.user_id}-${chanel.chanels.id}`

					return (
					<ul key={unique_key}>
						<li >
							<div>chanel_name: <b>{chanel.chanels.chanel_name}</b></div>
							<div>pending: {chanel.pending.toString()}</div>
							<AcceptChanel element={chanel} label="Join" handleChanelRefecth={handleChanelRefetch}/>
						</li>
					</ul>
					);
				})
			}</div>
	)
}