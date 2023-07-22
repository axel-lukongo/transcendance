import { useQuery } from "@apollo/client";
import React from "react";
import { REQUEST } from '../graphql/Querys'
import { User } from "../../Interface";
import { IContacts } from '../../interfaces/interfaces'

export interface IMyPendingRequest {
	user: User;
}

export default function MyPendingRequest({user}: IMyPendingRequest) {

	const {data, refetch, error, loading } = useQuery(REQUEST, {
		variables: {
			input: user.id
		}
	});

	if (loading)
		return (<div> Loading...</div>)

	if (error)
		return ( <div>An Error as occured</div> )

	return (
		<div>
			{
				data.myContactRequest.map( (element: IContacts) => (
					<p>{element.contact.nickname}</p>
				))
			}
		</div>
	)
}