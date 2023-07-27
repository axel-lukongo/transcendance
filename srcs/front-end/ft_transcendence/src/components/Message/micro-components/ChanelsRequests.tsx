import React from "react";
import ListChanelRequests from "./requests/ListChanelsRequests";
import HeaderChanel from "./Box/HeaderChanel";
import { IChanelRequest } from "../../interfaces/interfaces";


export default function ChanelRequest({user, handleChanelRefetch, refetchChanel}: IChanelRequest) {

	return (
		<div>
			<ListChanelRequests
				user={user}
				refetchChanel={refetchChanel}
				handleChanelRefetch={handleChanelRefetch}
			/>
			<div className='chat'>
				<HeaderChanel />
				<div className='chat-history'>
				</div>
			</div>
		</div>
	);
}