import { useQuery } from "@apollo/client";
import { REQUEST } from '../graphql/Querys'
import { IContactsLink, User } from '../../interfaces/interfaces'
import { useEffect } from "react";

/* asimon */
export interface IMyPendingRequest {
	user: User;
	refreshPending: boolean;
}

export default function MyPendingRequest({user, refreshPending}: IMyPendingRequest) {

	const {data, error, loading, refetch } = useQuery(REQUEST, {
		variables: {
			input: user.id
		}
	});

	useEffect(() => {
		refetch();
	}, [refreshPending]);

	if (loading)
		return (<div> Loading...</div>)

	if (error)
		return ( <div>An Error as occured</div> )

	return (
		<div>
			{
				data.myContactRequest.map( (element: IContactsLink) => (
					<h2 key={element.id} >
						{element.contact.nickname}
					</h2>
				))
			}
		</div>
	)
}