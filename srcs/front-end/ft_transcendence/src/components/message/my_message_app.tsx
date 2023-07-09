import React, { useState } from 'react';
import '../../css/App.css';
import '../../css/message.css';
import Chat from './message';
import CreatMsg from './creat_message';
import Contact from '../Contact/Contact';
import { Route, Routes, Link} from 'react-router-dom';


const MyMessage = () => {
  const [showChat, setShowChat] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const handleChatClick = () => {
    if (showChat) {
      setShowChat(false);
    } else {
      setShowChat(true);
      setShowContact(false);
    }
  };

  const handleContactClick = () => {
    if (showContact) {
      setShowContact(false);
    } else {
      setShowContact(true);
      setShowChat(false);
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
        <Link to="/message">
          <button className='message-button' onClick={handleChatClick}></button>
        </Link>

        <button className='avatar-button' onClick={handleContactClick}></button>


		<Chat show={showChat} />
		<CreatMsg show={showChat} />
		<Contact show={showContact} />

    <Routes>
          {/* <Route path='*' 			Component={MyMessage} /> */}
		  {/* <Route path="/contact"	Component={() => <Contact show={showContact} />} /> */}
		  <Route path="/creatMsg"	Component={() => <CreatMsg show={showContact} />} />
    </Routes> 

      </div>
  );
};

export default MyMessage;