import { gql, useQuery } from "@apollo/client"
import { useEffect } from "react";
import  AccepContact  from './AcceptContact'

const CONTACTS = gql`query GetContactList($input: Int!){
	contacts(user_id: $input){
		id
		pending
		contact {
		  nickname
		  email
		  token
		}
	  }
}` 


export default function FriendsRequest() {

	const {data, isLoading, error, refetch} = useQuery(CONTACTS, {variables: {input: 1}});
	
	
	useEffect(() => {
		refetch();
	}, [refetch]);

	if (isLoading)
	return (<div><p>Loading...</p></div>);
	
	if (error) {
		console.log(error);
		return (<div>An error as occured!</div>);
	}

	
	if (!data)
	return (<div>No data</div>);

	const contacts = data.contacts;
	
	return (<div>
		<h3>Friends request</h3>
		{
			contacts.length === 0 ? (
			<div>No contacts available</div>
			) : (
			<ul>{
			contacts.map((element) => (
				element.pending && <li key={element.id}>
				{ 
					<div>
							<h4>{element.contact.nickname.toString()}</h4>
							<div>email: {element.contact.email.toString()} </div>
							<div>token: {element.contact.token.toString()} </div>
							<div>Pending: {element.pending.toString()} </div>
					</div>
				} 
				<AccepContact element={element} />
				</li>
			))
			}
		</ul> )
		}
		<button onClick={() => refetch()}> Refresh</button>
	</div>);
}