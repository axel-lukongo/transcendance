import React from "react";
import { gql, useQuery } from "@apollo/client"
import { useEffect } from "react";
import {IContacts} from "./interfaces/Contact.interface"
import  AccepContact  from './AcceptContact'
import RefuseContact from "./RefuseContact";
import {IProposContact} from "./interfaces/Requests.interface"

const CONTACTS = gql`query GetRequestList($input: Int!){
	contactsRequest(user_id: $input){
		id
		pending
		contact {
			id
			nickname
			email
			token
		}
	  }
}` 



export default function FriendsRequest({refetchContact, refetchProps}: IProposContact) {

	const {data, loading, error, refetch} = useQuery(CONTACTS, {variables: {input: 1}});
	

	useEffect(() => {
		refetch();
	}, [refetch, refetchProps]);

	if (loading)
	return (<div><p>Loading...</p></div>);
	
	if (error) {
		console.log(error);
		return (<div>An error as occured!</div>);
	}

	
	if (!data)
	return (<div>No data</div>);

	const contacts = data.contactsRequest;

	if (!contacts)
	{
		console.log(data);
		return (<div>Pas de contacts</div>)
	}
	
	return (<div>
		<h3>Friends request</h3>
		{
			
			<ul>{
			contacts.map((element: IContacts) => (
				<li key={element.id}>
				{ 
					<div>
							<h4>{element.contact.nickname.toString()}</h4>
							<div>email: {element.contact.email.toString()} </div>
							<div>token: {element.contact.token.toString()} </div>
							<div>Pending: {element.pending.toString()} </div>
					</div>
				} 
				<AccepContact 
					element={element}  
					refetchContact={refetchContact} 
					label="Accept"
				/>
				<RefuseContact 
					element={element}  
					refetchContact={refetchContact}
					label="Deny"
				/>
				</li>
			))
			}
		</ul>
		}
	</div>);
}