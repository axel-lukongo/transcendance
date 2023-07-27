import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import { Chanel } from '../interfaces/interfaces';
import Chanels from './micro-components/Chanels';
import ChanelsRequest from './micro-components/ChanelsRequests';

/* CSS */
import './css/messages.css';

const Message = () => {

	/* //////////////////////////////////////////////////////// */
	/* User from sessionStorage */
	
	const user = JSON.parse(sessionStorage.getItem('user') || '');

	/* //////////////////////////////////////////////////////// */
	/* States */

	const [chanel_focus, setChanelFocus] = useState({
		id: "",
		chanel_name: "",
		chanel_size: "",
		max_users: "",
		logo: "",
	});

	const [refecthChanels, setRefetchChanel] = useState(false);

	const [side_bar_focus, setSideBarFocus] = useState(1);

	const [refetchChat, setRefetchChat] = useState(false);

	/* //////////////////////////////////////////////////////// */
	/* Handlers */

	const handleChanelFocus = async (element: Chanel) => {

		setChanelFocus({
			id: element.id.toString(),
			chanel_name: element.chanel_name,
			chanel_size: element.chanel_size.toString(),
			max_users: element.max_users.toString(),
			logo: element.logo
		});
	}

	const handleChangeOnglet = (id: number) => {
		try {
			if (id < 1 || id > 4)
				throw new Error("ID should be between 1 & 4");
			setSideBarFocus(id);
		}
		catch (e) {
			console.log("Error Nav: ", e);
		}
	}

	const handleChatRefetch = () => {
		setRefetchChat(prevValue => !prevValue);
	}

	const handleChanelReftch = () => {
		setRefetchChanel(prevValue => !prevValue);
	}

	/* //////////////////////////////////////////////////////// */
	/* Switch */

	const renderSwitch = (id: number) => {
		switch(id) {
			case 1: {
				return (
					<div>
						{/* Direct Message her */}
					</div>
				);
				break;
			}
			case 2: {
				return (
					<Chanels 
						user={user}
						private_chan={true}
						refetchChat={refetchChat}
						chanel_focus={chanel_focus}
						refetchChanel={refecthChanels}
						handleChanelFocus={handleChanelFocus}
						handleChanelRefetch={handleChanelReftch}
						handleChatRefetch={handleChatRefetch}
					/>
				);
				break;
			}
			case 3: {
				return (
					<Chanels 
						user={user}
						private_chan={false}
						refetchChat={refetchChat}
						chanel_focus={chanel_focus}
						refetchChanel={refecthChanels}
						handleChanelFocus={handleChanelFocus}
						handleChanelRefetch={handleChanelReftch}
						handleChatRefetch={handleChatRefetch}
					/>
				);
				break;
			}
			case 4: {
				return (
					<ChanelsRequest 
						user={user}
						handleChanelRefetch={handleChanelReftch}
						refetchChanel={refecthChanels}
					/>
				);
				break;
			}
			default: {
				break;
			}
		}
	}

	/* //////////////////////////////////////////////////////// */
	/* JSX.Element return */

	return (
		<div className="container">
        <Link to="/">
          <button className='home-button logo-box'></button>
        </Link>

		  <div className="row clearfix">
			<div className="col-lg-12">
				<div>
					<button onClick={() => handleChangeOnglet(1)}>1</button>
					<button onClick={() => handleChangeOnglet(2)}>2</button>
					<button onClick={() => handleChangeOnglet(3)}>3</button>
					<button onClick={() => handleChangeOnglet(4)}>4</button>
				</div>

			  <div className="screen-box chat-app">
				{ renderSwitch(side_bar_focus) }
			  </div>
			  
			 </div> 
		  </div>
		</div>
	  );
};

export default Message;