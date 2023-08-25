import React from "react";
import { ICardChanelProps } from '../../../interfaces/interfaces'
import { __CHAT__ } from "../../message";


export default function CardChanel({handleChanelFocus, chanel, handleChatBox}: ICardChanelProps) {


	const handleClick = () => {
		handleChanelFocus(chanel);
		handleChatBox(__CHAT__);
	}

	return (
		<li className="card-chat-list" onClick={handleClick }>
			<div className="about">
				<img src={chanel.logo} alt="avatar" />{/**afficher avatar */}
				<div className="name"> { chanel.chanel_name }</div>
			</div>
		</li>
	);
}