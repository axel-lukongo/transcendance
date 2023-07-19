import React, { useState } from "react"
import FriendsRequest from "./micro-components/FriendsRequest"
import ListContact from "./micro-components/ListContact";
import RefuseContact from "./micro-components/buttons/RefuseContact";
import AcceptChanel from "../Chanel/micro-components/buttons/AcceptChanel";

import './css/Contact.css'


const Contact = () => {

	const [refetchProp, setRefetch] = useState(false);

	const handleRefetch = () => {
		setRefetch(prevValue => !prevValue);
	}

	return (
	<div className="Contact_pad">
			<React.Fragment>
				<div className="box_request">
				<h2 id="Contact_labels">Friends request</h2>
					<FriendsRequest 
						refetchContact={handleRefetch}
						refetchProps={refetchProp}
						/>
				</div>
				<div className="box_ListContact">
					<div className="title"><h2 id="Contact_labels">List Contact</h2></div>
					<ListContact 
						refetchContact={handleRefetch}
						refetchProps={refetchProp}
					/>
				</div>
			</React.Fragment>
			
	</div>);
}

export default Contact;