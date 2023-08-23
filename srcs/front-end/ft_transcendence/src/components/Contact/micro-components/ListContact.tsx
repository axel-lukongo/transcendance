import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { IProposContact, IContactsLink } from "../../interfaces/interfaces";
import RefuseContact from "./buttons/RefuseContact"
import { LIST_CONTACT } from '../graphql/Querys'

import "../css/Contact.css"

export default function ListContact({refetchContact, refetchProps, user, setSwap}: IProposContact) {


	const {data, loading, error, refetch} = useQuery(LIST_CONTACT);	

	useEffect(() => {
		refetch();
	}, [refetch, refetchProps]);

	if (error) {
		console.log("http:", error.networkError)
		return (<div>An Error as occured!</div>)
	}

	if (loading)
		return (
			<div className="loader-container">
				<p>Loading...</p>
			</div>
		);

	if (!data)
		return (<div>Nothing to see her</div>)

	return (
		<div className="List_contact">
			{
				data.myContacts.map((element: IContactsLink) => (
					<div key={element.id} className="card">
						<div className="avatar">
							<img src={element.contact.avatar} alt="avatar" />
						</div>
						<p id="nickname-card-ListContact">{element.contact.nickname}</p>
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