import React from "react";
import { UserChanels } from "../../../interfaces/interfaces";
import { Chanel } from "../../../interfaces/interfaces";

export interface ICardChanelProps {
	handleChange: (element: Chanel) => void;
	chanel: UserChanels;
}

export default function CardChanel({handleChange, chanel}: ICardChanelProps) {

	return (
		<li className="clearfix">
			<img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="avatar" />{/**afficher avatar */}
			<div className="about">
			<div className="name"> { chanel.chanels.chanel_name }</div>
			<div className="status"> <i className="fa fa-circle offline"></i> left 7 mins ago </div>
			<button onClick={() => handleChange(chanel.chanels)}>her</button>
			</div>
		</li>
	);
}