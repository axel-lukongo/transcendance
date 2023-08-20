import { useQuery } from "@apollo/client";
import { REQUEST } from '../graphql/Querys'
import { IContactsLink, User } from '../../interfaces/interfaces'

export interface IMyPendingRequest {
	user: User;
}

export default function MyPendingRequest({user}: IMyPendingRequest) {

	const {data, error, loading } = useQuery(REQUEST, {
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
				data.myContactRequest.map( (element: IContactsLink) => (
					<p>{element.contact.nickname}</p>
				))
			}
		</div>
	)
}