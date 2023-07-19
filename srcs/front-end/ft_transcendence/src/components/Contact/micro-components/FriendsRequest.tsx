import React from "react";
import { useQuery } from "@apollo/client"
import { useEffect } from "react";
import AccepContact  from './buttons/AcceptContact'
import RefuseContact from "./buttons/RefuseContact";
import { CONTACTS } from '../graphql/QuerysContact'
import { IContacts, IProposContact } from "../../interfaces/interfaces"

import "../css/Contact.css"


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
	
	return (
		<div className="Friend_contact ">
		{
			contacts.map((element: IContacts) => (
				<div className="card">
					<div className="avatar">
					</div>
					<p id="card_p">{element.contact.nickname.toString()}</p>
					<div className="response">
					<AccepContact 
					element={element}  
					refetchContact={refetchContact} 
					label="accept"
					/>
					<RefuseContact 
					element={element}  
					refetchContact={refetchContact}
					label="refuse"
					/>
					</div>
				</div>
			))
		}
		</div>
	);
}