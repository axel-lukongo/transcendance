import React, { useState } from 'react';
import './Home.css';
import '../message/messages.css';
import Chat from '../message/message';
import CreatMsg from '../message/creat_message';
import Contact from '../Contact/Contact';
import { Route, Routes, Link} from 'react-router-dom';

// This component is call in authentification

const Home = () => {
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
        <div className='overlay1'></div> { /* la grande case qui englobe les autres case */ }
        <div className='overlay2'></div> { /* la case tout en bas */ }
        <div className='overlay3'></div> { /* la case du milieu */ }
        <div className='overlay4'></div> { /* la case violet en haut */ }
        <div className='overlay5'></div> { /* la case pour le avatar*/ }
        <div className='overlay6'> nickname: </div> { /* la case du nickname*/ }
        <div className='overlay7'></div> { /* la case du mail*/ }
        <button className='back-button'></button>
        <Link to="/message">
          <button className='message-button' onClick={handleChatClick}></button>
        </Link>

        <button className='avatar-button' onClick={handleContactClick}></button>


		<Chat show={showChat} />
		<CreatMsg show={showChat} />
		<Contact show={showContact} />

    <Routes>
          {/* <Route path='*' 			Component={Home} /> */}
		  {/* <Route path="/contact"	Component={() => <Contact show={showContact} />} /> */}
		  <Route path="/creatMsg"	Component={() => <CreatMsg show={showContact} />} />
    </Routes> 

      </div>
  );
};

export default Home;