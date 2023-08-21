import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { IProposContact, IContacts } from "../../interfaces/interfaces";
import RefuseContact from "./buttons/RefuseContact"
import { LIST_CONTACT } from '../graphql/Querys'
import Profil_page
 from "./buttons/Profil_page";
import "../css/Contact.css"
import "../css/profil.css"

export default function ListContact({refetchContact, refetchProps, user, setSwap}: IProposContact) {

	const {data, loading, error, refetch} = useQuery(LIST_CONTACT, {
		variables: { 
			input: user.id
		}
	});	

	const [ShowProfil ,setShowProfil] = useState(false);
	const [SelectedUserIndex ,setSelectedUserIndex] = useState(0);

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


		const handleShowProfil = (userIndex: number) => {
			setShowProfil(true);
			setSelectedUserIndex(userIndex);
		};
	return (
		<div className="List_contact">
			{
				data.myContacts.map((element: IContacts, index: number) => (
					<div key={element.id} className="card">
						<div className="avatar"></div>
						<p>{element.contact.nickname}</p>
						<button className="profile_btn profile" onClick={() => handleShowProfil(index)}></button>
						{ShowProfil === true && SelectedUserIndex === index && (
							<Profil_page handleShowProfil={handleShowProfil} user={element.contact} />
		  				)}
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