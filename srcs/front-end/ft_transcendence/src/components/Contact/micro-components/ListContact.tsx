import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { IProposContact, IContactsLink } from "../../interfaces/interfaces";
import RefuseContact from "./buttons/RefuseContact"
import { LIST_CONTACT } from '../graphql/Querys'
import Profil_page
 from "./buttons/Profil_page";
import "../css/Contact.css"
import "../css/profil.css"

export default function ListContact({refetchContact, refetchProps, user, setSwap}: IProposContact) {


	const {data, loading, error, refetch} = useQuery(LIST_CONTACT);	

	const [ShowProfil ,setShowProfil] = useState(false);
	const [SelectedUserIndex ,setSelectedUserIndex] = useState(0);

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


		const handleShowProfil = (userIndex: number) => {
			setShowProfil(true);
			setSelectedUserIndex(userIndex);
		};
	return (
		<div className="List_contact">
			{
				data.myContacts.map((element: IContactsLink, index: number) => (
					<div key={element.id} className="card">
						<div className="avatar">
							<img src={element.contact.avatar} alt="avatar" />
						</div>
						<p id="nickname-card-ListContact">{element.contact.nickname}</p>
						<button className="profile_btn " onClick={() => handleShowProfil(index)}></button>
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