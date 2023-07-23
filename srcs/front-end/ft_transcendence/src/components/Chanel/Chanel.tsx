import React from "react";
import { useState } from "react";
import UserChanelsRequests from "./micro-components/ChanelsRequests";
import CreateChanelForm from "./micro-components/CreateChanelForm";
import ChanelList from "./micro-components/ListChanel";

export default function Chanel() {
	
	const [refetchChanels, setRefecthChanel] = useState(false);

	const handleChanelRefetch = () => {
		setRefecthChanel(prev => !prev);
	}

	return (
		<div>
			<React.Fragment>
				<UserChanelsRequests 
					refetchChanels={refetchChanels}
					handleChanelRefetch={handleChanelRefetch}
				 />
				 <ChanelList 
				 	refetchChanels={refetchChanels}
					handleChanelRefetch={handleChanelRefetch}
				 />
			</React.Fragment>
		</div>
	)
}