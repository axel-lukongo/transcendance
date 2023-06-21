import React from "react"
import FriendsRequest from "./FriendsRequest"
import ListContact from "./ListContact";
import { useState } from "react";

export default function Contact() {

	const [refetchProp, setRefetch] = useState(false);

	const handleRefetch = () => {
		setRefetch(prevValue => !prevValue);
	}

	return (<div>
			<p>Ici</p>
			<React.Fragment>
				<FriendsRequest refetchContact={handleRefetch} />
				<ListContact refetchContact={refetchProp} />
			</React.Fragment>
	</div>);
}