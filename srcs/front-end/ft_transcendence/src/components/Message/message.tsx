import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Chanel } from '../interfaces/interfaces';
import Chanels from './micro-components/Chanels';
import ChanelsRequest from './micro-components/ChanelsRequests';
import HeaderChanel from './micro-components/Box/HeaderChanel';
import CreateChanelForm from './micro-components/forms/CreateChanelForm';
import ChatBox from './micro-components/Box/ChatBox';
import CreateMsg from './micro-components/forms/createMessage';
import Direct_message from './micro-components/direct-message';
import AddUserInChan from './micro-components/forms/AddUserInChan'
import Param_Chan from './micro-components/forms/chan_param';
import { User } from '../interfaces/interfaces';

/* Images */
import user_onglet from '../../image/send.svg'
import public_onglet from '../../image/visible.svg'
import request_onglet from '../../image/wait-svgrepo-com.svg'

// import { User } from '../interfaces/interfaces';
/* CSS */
import './css/messages.css';

export const __CREATE_CHANEL__ = 1;
export const __ADD_USER__ = 2;
export const __CHAT__ = 3;
export const __CHAN_PARAM__ = 5;

export const __DIRECT_MESSAGE__ = 1;
export const __PRIVATE_CHANEL__ = 2;
export const __PUBLIC_CHANEL__ = 3;
export const __CHANEL_REQUEST__ = 4;

const Message = () => {

	/* //////////////////////////////////////////////////////// */
	/* User from sessionStorage */
	
	const user = JSON.parse(sessionStorage.getItem('user') || '');
	const initialInterlocutor: User = {
		avatar: "",
		email: "",
		id: 0,
		nickname: "",
		token: "",
		level: 0,
		rank: ""
	  };
	/* //////////////////////////////////////////////////////// */
	/* States */

	

	const [chanel_focus, setChanelFocus] = useState({
		id: "",
		chanel_name: "",
		chanel_size: "",
		max_users: "",
		logo: "",
		owner_id: "",
		directMsg: false,
		interlocutor: initialInterlocutor
	});

	const [refecthChanels, setRefetchChanel] = useState(false);

	const [side_bar_focus, setSideBarFocus] = useState(1);

	const [refetchChat, setRefetchChat] = useState(false);

	const [chatBox, setChatBox] = useState(__CHAT__);

	const [is_chanel] = useState(true);


	/* //////////////////////////////////////////////////////// */
	/* Use Effect */
	
	


	/* //////////////////////////////////////////////////////// */
	/* Handlers */

	const handleChanelFocus = async (element: Chanel) => {
		setChanelFocus({
			id: element.id.toString(),
			chanel_name: element.chanel_name,
			chanel_size: element.chanel_size.toString(),
			max_users: element.max_users.toString(),
			logo: element.logo,
			owner_id: element.owner_id.toString(),
			directMsg: element.directMsg,
			interlocutor: element.interlocutor
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
		if (switch_id < 1 || switch_id > 5)
			throw new Error("Bad ID");
		else
			setChatBox(switch_id);
	}
	
	// const handleIsChanel = () => {
	// 	setIsChanel(prevValue => !prevValue);
	// }

	/* //////////////////////////////////////////////////////// */
	/* Switch */
	// console.log('dans les message ====>>>>   ',chanel_focus );

	const renderSwitch = (id: number) => {
		switch(id) {
			case __DIRECT_MESSAGE__: {
				return (
					<Direct_message
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
						/>
						<div className='chat-history'>
							<CreateChanelForm
								user={user}
								handleChanelRefetch={handleChanelReftch}
							/>
						</div>
					</div>
				);
			}
			case __CHAT__: {
				return (
					<div className="chat"> 
						<HeaderChanel
							user={user}
							chanel_focus={chanel_focus}
							handleChatBox={handleChatBox}
						/>
						<div className="chat-history">
							<ChatBox chan={chanel_focus} />
						</div>
						<div className="chat-message ">
							<CreateMsg chan={chanel_focus}/>
						</div>
					</div>
				);
			}
			case __ADD_USER__: {
				return (
					<div className="chat"> 
						<HeaderChanel
							user={user}
							chanel_focus={chanel_focus}
							handleChatBox={handleChatBox}
						/>
						<div className="chat-history">
						<AddUserInChan 
							user={user}
							chanel_focus={chanel_focus}
						/>
						</div>
						<div className="chat-message ">
						</div>
					</div>
				);
			}
			case __CHAN_PARAM__: {
				return (
					<div className="chat"> 
						<HeaderChanel
							user={user}
							chanel_focus={chanel_focus}
							handleChatBox={handleChatBox}
						/>
						<div className="chat-history">
						<Param_Chan 
							user={user}
							chanel_focus={chanel_focus}
						/>
						</div>
						<div className="chat-message ">
						</div>
					</div>
				);
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
			  <div className="screen-box chat-app">
				<div className='side-bar'>
					<div className='nav_section_message'>
						<button onClick={() => handleChangeOnglet(__DIRECT_MESSAGE__)} className='nav_section_btn'>
							<img src={user_onglet} alt="" id='btn1' />
						</button>
						<button onClick={() => handleChangeOnglet(__PRIVATE_CHANEL__)} className='nav_section_btn'>
							<img src={public_onglet} alt="" id='btn2'/>
						</button>
						<button onClick={() => handleChangeOnglet(__PUBLIC_CHANEL__)} className='nav_section_btn'>
							<img src={public_onglet} alt="" id='btn3'/>
						</button>
						<button onClick={() => handleChangeOnglet(__CHANEL_REQUEST__)} className='nav_section_btn'>
							<img src={request_onglet} alt="" id='btn4'/>
						</button>
					</div>
					{ renderSwitch(side_bar_focus) }
				</div>
				{ renderSwitchChatBox(chatBox) }
			  </div>
			  
			 </div> 
	  );
};

export default Message;