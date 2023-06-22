import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { IContacts } from "./interfaces/Contact.interface";
import { IProposContact } from "./interfaces/Requests.interface";
import RefuseContact from "./RefuseContact"
import { LIST_CONTACT } from './graphql/QuerysContact'



export default function ListContact({refetchContact, refetchProps}: IProposContact) {


	const {data, loading, error, refetch} = useQuery(LIST_CONTACT, {
		variables: { input: 1}
	});	

	useEffect(() => {
		refetch();
	}, [refetch, refetchProps]);

	if (error)
		return (<div>An Error as happen!</div>)

	if (loading)
		return (<div>Loading...</div>);

	if (!data)
		return (<div>Nothing to see her</div>)

	return (
	<div>
		<h3>List Contact</h3>
		<ul>{
			data.myContacts.map((element: IContacts) => (
				<li key={element.id}>
					<div>
						<h4>{element.contact.nickname}</h4>
						<div>{element.contact.email}</div>
						<div>{element.contact.token}</div>
						<RefuseContact 
							element={element} 
							refetchContact={refetchContact}
							label="Delete"
						/>
					</div>
				</li>
			))
		}</ul>
	</div>)
}