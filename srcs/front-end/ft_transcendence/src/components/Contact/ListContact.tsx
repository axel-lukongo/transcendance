import { gql, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { IContacts } from "./interfaces/Contact.interface";
import { IProposListContact } from "./interfaces/Requests.interface";



export default function ListContact({refetchContact}: IProposListContact) {

	const LIST_CONTACT = gql`query GetListContact($input: Int!) {
		myContacts(user_id: $input) {
			id
			contact {
				nickname
				intra_login
			}
		}
	}`

	const {data, loading, error, refetch} = useQuery(LIST_CONTACT, {
		variables: { input: 1}
	});	

	useEffect(() => {
		refetch();
	}, [refetchContact]);

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
					</div>
				</li>
			))
		}</ul>
	</div>)
}