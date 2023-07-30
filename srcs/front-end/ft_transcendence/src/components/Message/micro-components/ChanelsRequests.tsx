import React from "react";
import ListChanelRequests from "./requests/ListChanelsRequests";
import { IChanelRequest } from "../../interfaces/interfaces";


export default function ChanelRequest({user, handleChanelRefetch, refetchChanel, chanel_focus, handleChatBox}: IChanelRequest) {

	return (
		<div>
			<ListChanelRequests
				user={user}
				refetchChanel={refetchChanel}
				handleChanelRefetch={handleChanelRefetch}
			/>
		</div>
	);
}