import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom"
import { useContext } from "react";
import { WebSocketContext } from "./WebSocketProvider";
import { UPDATE_STATE } from "./components/Authentication/graphql/Mutation";
import { __DISCONECTED__ } from "./App";

export default function NavBar() {
	const wsContext = useContext(WebSocketContext);
	const [updateState] = useMutation(UPDATE_STATE);
	
	const handleLogOut = async () => {
		
		if (wsContext?.user) {
			await updateState({
				variables: {
					state: __DISCONECTED__
			}})
			wsContext?.updateUser(null);
			sessionStorage.removeItem('user');
			window.location.reload();
		}
	}

	return (
		<div id='nav-bar'>
			<Link to ='/'>
				<button className='log-out-button logo-box' onClick={handleLogOut}></button>
			</Link>
			<Link to="/">
				<button className='home-button logo-box'></button>
			</Link>
			<Link to="/leaderBoard">
				<button className='leader-board-button logo-box'></button>
			</Link>
			<Link to="/message">
				<button className='message-button logo-box'></button>
			</Link>
			<Link to="/contact">
				<button className='contact-button logo-box'></button>
			</Link>
		</div>
	)
	
}