import React from "react";
import { ICardChanelProps } from '../../../interfaces/interfaces'
import { __CHAT__ } from "../../message";


export default function CardChanel({handleChanelFocus, chanel, handleChatBox}: ICardChanelProps) {


	const handleClick = () => {
		handleChanelFocus(chanel.chanels);
		handleChatBox(__CHAT__);
	}

	return (
		<li className="clearfix">
			<img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="avatar" />{/**afficher avatar */}
			<div className="about">
			<div className="name"> { chanel.chanels.chanel_name }</div>
			<div className="status"> <i className="fa fa-circle offline"></i> left 7 mins ago </div>
			<button onClick={handleClick }>her</button>
			</div>
		</li>
	);
}