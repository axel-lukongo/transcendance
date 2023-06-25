
import React, {useState} from 'react';
import '../../css/App.css';
import '../../css/message.css';
import Chat from './message';
import CreatMsg from './creat_message';

const Mymsg = () => {
	const [showChat, setShowChat] = useState(false);

	const handleChatClick = () => {
		if (showChat) {
			setShowChat(false);
		} else {
			setShowChat(true);
		}
	};

	return (
		<div className='my_message_app'>
			<div className='bg'></div>
			<div className='overlay1'></div>
			<div className='overlay2'></div>
			<div className='overlay3'></div>
			<div className='overlay4'></div>
			<div className='overlay5'></div>
			<div className='overlay6'></div>
			<div className='overlay7'></div>
			<button className='back-button'></button>
			<button className='message-button' onClick={handleChatClick}></button>
			<button className='avatar-button'></button>
			<Chat show={showChat} />
			<CreatMsg show={showChat} />
		</div>
	);
};

export default Mymsg;
