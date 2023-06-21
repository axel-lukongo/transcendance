import React from "react";
import { useState } from "react";
import UserChanelsRequests from "./ChanelsRequests";
import CreateChanelForm from "./CreateChanelForm";

export default function Chanel() {
	
	const [refetchChanels, setRefecthChanel] = useState(false);

	const handleChanelRefetch = () => {
		setRefecthChanel(prev => !prev);
	}

	return (
		<div>
			<React.Fragment>
				<CreateChanelForm />
				<UserChanelsRequests 
					refetchChanels={refetchChanels}
					handleChanelRefetch={handleChanelRefetch}
				 />
			</React.Fragment>
		</div>
	)
}