import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { IProposContact, IContacts } from "../../interfaces/interfaces";
import RefuseContact from "./buttons/RefuseContact"
import { LIST_CONTACT } from '../graphql/Querys'

import "../css/Contact.css"

export default function ListContact({refetchContact, refetchProps, user, setSwap}: IProposContact) {

	const {data, loading, error, refetch} = useQuery(LIST_CONTACT, {
		variables: { 
			input: user.id
		}
	});	

	useEffect(() => {
		refetch();
	}, [refetch, refetchProps]);

	if (error)
	{console.log("http:", error.networkError)
	return (<div>An Error as occured!</div>)
}

	if (loading)
		return (<div>Loading...</div>);

	if (!data)
		return (<div>Nothing to see her</div>)

	return (
		<div className="List_contact">
			{
				data.myContacts.map((element: IContacts) => (
					<div key={element.id} className="card">
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