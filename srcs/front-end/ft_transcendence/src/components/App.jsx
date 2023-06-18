
import React, { useState } from 'react';
import '../css/App.css';
import '../css/message.css';
import Chat from './message/message';
import CreatMsg from './message/creat_message';

const App = () => {

	const [showChat, setShowChat] = useState(false);

	const handleChatClick = () => {
		if(showChat === true)
			setShowChat(false);
		else
			setShowChat(true);
	};
	
	return (
		<div className="App">

		<div className='bg'></div>


		<div className="overlay1"></div> */Nouvel élément pour le rectangle*/

		<div className="overlay2"></div> 
		<div className="overlay3"></div> Nouvel élément pour le rectangle
		<div className="overlay4"></div> Nouvel élément pour le rectangle
		<div className="overlay5"></div> Nouvel élément pour le rectangle
		<div className="overlay6"></div> Nouvel élément pour le rectangle
		<div className="overlay7"></div> Nouvel élément pour le rectangle

		<button className="back-button"></button>
		<button className="message-button" onClick={handleChatClick}></button>
		<button className="avatar-button"></button>

		<Chat show={showChat} />
		<CreatMsg show={showChat} />

		</div>
	)
}

export default App;
