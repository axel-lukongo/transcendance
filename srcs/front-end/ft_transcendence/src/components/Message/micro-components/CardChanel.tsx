import React from "react";

export default function CardChanel() {

	return (
		<li className="clearfix">
			<img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="avatar" />{/**afficher avatar */}
			<div className="about">
			<div className="name"> nickname</div>
			<div className="status"> <i className="fa fa-circle offline"></i> left 7 mins ago </div>
			</div>
		</li>
	);
}