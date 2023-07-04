import React from "react"
import FriendsRequest from "./FriendsRequest"
import ListContact from "./ListContact";
import { useState } from "react";
import RefuseContact from "./buttons/RefuseContact";
import AcceptChanel from "../Chanel/buttons/AcceptChanel";



const Contact = ({show}: {show: boolean}) => {

	const [refetchProp, setRefetch] = useState(false);

	const handleRefetch = () => {
		setRefetch(prevValue => !prevValue);
	}

	return (
	<div className={`Contact_pad ${show ? 'Contact_show' : ''}`}>
			<React.Fragment>
				<FriendsRequest 
					refetchContact={handleRefetch}
					refetchProps={refetchProp}
				/>
				<ListContact 
					refetchContact={handleRefetch}
					refetchProps={refetchProp}
				/>
			</React.Fragment>
			
	</div>);
}

export default Contact;