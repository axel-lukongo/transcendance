import React from "react"
import FriendsRequest from "./FriendsRequest"
import ListContact from "./ListContact";
import { useState } from "react";
import RefuseContact from "./buttons/RefuseContact";
import AcceptChanel from "../Chanel/buttons/AcceptChanel";


export default function Contact() {

	const [refetchProp, setRefetch] = useState(false);

	const handleRefetch = () => {
		setRefetch(prevValue => !prevValue);
	}

	return (<div>
			<p>Ici</p>
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