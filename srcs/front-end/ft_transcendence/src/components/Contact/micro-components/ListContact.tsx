import React, { useEffect, useState, useContext } from "react";
import { useQuery } from "@apollo/client";
import { IProposContact, IContactsLink } from "../../interfaces/interfaces";
import RefuseContact from "./buttons/RefuseContact"
import { LIST_CONTACT } from '../graphql/Querys'
import Profil_page from "./buttons/Profil_page";
import { WebSocketContext } from "../../../WebSocketProvider";
import "../css/Contact.css"
import { User } from "../../interfaces/interfaces";
import "../css/profil.css"
import { SUB_STATE } from "../graphql/Querys";

export default function ListContact({refetchContact, refetchProps, user, setSwap}: IProposContact) {


	const {data, loading, error, refetch} = useQuery(LIST_CONTACT);	

	const [ShowProfil ,setShowProfil] = useState(false);
	const [SelectedUserIndex ,setSelectedUserIndex] = useState(0);
	const wsContext = useContext(WebSocketContext);
	const [updateState, setUpdateState] = useState<Partial<User>>({})
	const [states, setStates] = useState<IContactsLink[]>([]);

	useEffect(() => {
		refetch();
	}, [refetch, refetchProps]);

	useEffect(() => {
		if (wsContext?.wsClient) {
			let state_sub = wsContext.wsClient.request({query: SUB_STATE}, ).subscribe({
				next(response) {
					if (response.data) {
						let update = response.data.changeState;
						setUpdateState(update as User);
					}
				},
				error(e) {
					console.log('error state: ', e);
				}
			})
			return () => {
				state_sub.unsubscribe();
			}
		}
    }, [wsContext]);

	useEffect(() => {
		const ChangeState = () => {
			let update = states.map( (contacts: IContactsLink ) => {
				if (contacts.contact.id == updateState.id){
					return ({...contacts, contact: { ...contacts.contact, state: updateState.state } });
				} 
				return contacts;
			})
			if (update) {
				setStates(update as [IContactsLink]);
			}
		}
		ChangeState();
	}, [updateState])

	useEffect(() => {
		if (data && data.myContacts)
			setStates(data.myContacts);
	}, [data])


	const findClassState = (state: number) => {
		switch (state) {
			case 1: 
				return ('active');
			case 2: 
				return ('afk');
			case 3: 
				return ('disconnected');
			case 4:
				return ('inGame')
			default:
				return 'error';
		}
	}
	
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

	if (data)
	{
		console.log('data => ',data.myContacts);
	}

	const handleShowProfil = (userIndex: number) => {
		setShowProfil(true);
		setSelectedUserIndex(userIndex);
	};

	return (
		<div className="List_contact">
			{
				states.map((element: IContactsLink, index: number) => (
					<div key={element.id} className="card">
						<div className="box-avatar-state">
							<div className="avatar">
								<img src={element.contact.avatar} alt="avatar" />
							</div>
							<div className='contact-state' id={findClassState(element.contact.state)}></div>
						</div>
						<h2 id="nickname-card-ListContact">{element.contact.nickname}</h2>
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