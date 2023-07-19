import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { IProposContact, IContacts } from "../../interfaces/interfaces";
import RefuseContact from "./buttons/RefuseContact"
import { LIST_CONTACT } from '../graphql/QuerysContact'

import "../css/Contact.css"

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
		<div className="List_contact">
			{
				data.myContacts.map((element: IContacts) => (
					<div className="card">
						<div className="avatar"></div>
						<p>{element.contact.nickname}</p>
						<div>{element.contact.email}</div>
						<div>{element.contact.token}</div>
						<RefuseContact 
							element={element} 
							refetchContact={refetchContact}
							label="delete"
						/>
					</div>
				))
			}
		</div>
	)
}