import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {

	return (
		<div className="flex pa1 justify-between nowrap orange">
			<div className="flex flex-fixed black">
				<Link to="/" className="no-underline black">
					<div className="fw7 mr1"> 
						<b>Home</b>
					</div>
				</Link>
				<div className="ml1">|</div>
				<Link to="/chanels" className="ml1 no-underline black">
					<div className="fw7 mr1">
						<b>Chanels</b>
					</div>
				</Link>
				<div className="ml1">|</div>
				<Link to="/chanels/new">
					<b>Test</b>
				</Link>
			</div>
		</div>
	)
}