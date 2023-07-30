import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Chanel } from '../interfaces/interfaces';
import Chanels from './micro-components/Chanels';
import ChanelsRequest from './micro-components/ChanelsRequests';
import HeaderChanel from './micro-components/Box/HeaderChanel';
import CreateChanelForm from './micro-components/forms/CreateChanelForm';
import ChatBox from './micro-components/requests/ChatBox';
import CreateMsg from './micro-components/forms/createMessage';

/* CSS */
import './css/messages.css';

export const __CREATE_CHANEL__ = 1;
export const __ADD_USER__ = 2;
export const __CHAT__ = 3;

export const __DIRECT_MESSAGE__ = 1;
export const __PRIVATE_CHANEL__ = 2;
export const __PUBLIC_CHANEL__ = 3;
export const __CHANEL_REQUEST__ = 4;

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

	const [chatBox, setChatBox] = useState(__CHAT__);

	const [is_chanel, setIsChanel] = useState(true);

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


	const handleChatBox = (switch_id: number) => {
		setChatBox(switch_id);
	}
	

	/* //////////////////////////////////////////////////////// */
	/* Switch */

	const renderSwitch = (id: number) => {
		switch(id) {
			case __DIRECT_MESSAGE__: {
				return (
					<div>
						{/* Direct Message her */}
					</div>
				);
				break;
			}
			case __PRIVATE_CHANEL__: {
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
						handleChatBox={handleChatBox}
					/>
				);
				break;
			}
			case __PUBLIC_CHANEL__: {
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
						handleChatBox={handleChatBox}
					/>
				);
				break;
			}
			case __CHANEL_REQUEST__: {
				return (
					<ChanelsRequest 
						user={user}
						handleChanelRefetch={handleChanelReftch}
						refetchChanel={refecthChanels}
						chanel_focus={chanel_focus}
						handleChatBox={handleChatBox}
					/>
				);
				break;
			}
			default: {
				break;
			}
		}
	}

	const renderSwitchChatBox = (switch_id: number) => {
		switch(chatBox) {
			case __CREATE_CHANEL__: {
				return (
					<div className='chat'>
						<HeaderChanel 
							user={user}
							chanel_focus={chanel_focus}
							handleChatBox={handleChatBox}
							is_chanel={is_chanel}
						/>
						<div className='chat-history'>
							<CreateChanelForm
								user={user}
								handleChanelRefetch={handleChanelReftch}
							/>
						</div>
					</div>
				);
				break;
			}
			case __CHAT__: {
				return (
					<div className="chat"> 
						<HeaderChanel
							user={user}
							chanel_focus={chanel_focus}
							handleChatBox={handleChatBox}
							is_chanel={is_chanel}
						/>
						<div className="chat-history">
							<ChatBox chan={chanel_focus} />
						</div>
						<div className="chat-message ">
							<div className="input-group mb-0">
								<CreateMsg />
							</div>
						</div>
					</div>
				);

				break;
			}
			case __ADD_USER__: {
				return (
					<div className="chat"> 
						<HeaderChanel
							user={user}
							chanel_focus={chanel_focus}
							handleChatBox={handleChatBox}
							is_chanel={is_chanel}
						/>
						<div className="chat-history">
							<ChatBox chan={chanel_focus} />
						</div>
						<div className="chat-message ">
							<div className="input-group mb-0">
								<CreateMsg />
							</div>
						</div>
					</div>
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
					<button onClick={() => handleChangeOnglet(__DIRECT_MESSAGE__)}>1</button>
					<button onClick={() => handleChangeOnglet(__PRIVATE_CHANEL__)}>2</button>
					<button onClick={() => handleChangeOnglet(__PUBLIC_CHANEL__)}>3</button>
					<button onClick={() => handleChangeOnglet(__CHANEL_REQUEST__)}>4</button>
				</div>

			  <div className="screen-box chat-app">
				{ renderSwitch(side_bar_focus) }
				{ renderSwitchChatBox(chatBox) }
			  </div>
			  
			 </div> 
		  </div>
		</div>
	  );
};

export default Message;