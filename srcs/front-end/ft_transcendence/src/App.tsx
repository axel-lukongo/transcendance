
import React, {useState} from 'react';
import './css/App.css';
import './css/message.css';
import Chat from './components/message/message';
import CreatMsg from './components/message/creat_message';
import Chanel from './components/Chanel/Chanel';
import Mymsg from './components/message/my_message_app';

const App = () => {
	return (
		<div className='App'>
			<Chanel />
			{/* <div className='bg'></div>
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
			<CreatMsg show={showChat} /> */}

			<Mymsg />
		</div>
	);
};

export default App;
