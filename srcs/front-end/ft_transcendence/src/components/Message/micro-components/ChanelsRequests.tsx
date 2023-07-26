import React from "react";
import ListChanelRequests from "./requests/ListChanelsRequests";
import { ITmpProps } from "./buttons/AddContact";
import HeaderChanel from "./Box/HeaderChanel";
import {User} from '../../Interface'

interface IUse {
	user: User;
}


export default function ChanelRequest({user}: IUse ) {

	return (
		<div>
			<ListChanelRequests user={user}/>
			<div className='chat'>
				<HeaderChanel />
				<div className='chat-history'>
				</div>
			</div>
		</div>
	);
}