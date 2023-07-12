import React, { useState, useEffect } from 'react';
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

  // const user = JSON.parse(sessionStorage.getItem('user') || '');

  // useEffect(() => {
  //   const randomX = Math.random();
  //   const randomY = Math.random();
  
  //   const gameBoxWidth = 50; // Largeur en pourcentage de la boîte du jeu
  //   const gameBoxHeight = 15; // Hauteur en pourcentage de la boîte du jeu
  
  //   const randomXPercentage = randomX * (100 - gameBoxWidth);
  //   const randomYPercentage = randomY * (100 - gameBoxHeight);
  
  //   document.documentElement.style.setProperty('--randomX', `${randomXPercentage}%`);
  //   document.documentElement.style.setProperty('--randomY', `${randomYPercentage}%`);
  // }, []);


  
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
    // peut etre rajouter une verif du session storage
    <div className='Home'>
      <div className='screen-box'></div> 
      <div className='rank-box profil-box'>RANK #?</div> 
      <div className='avatar-box profil-box'></div> 
      <div className="history-match-box profil-box">
      MATCH HISTORY </div>
      <div className='nickname-box profil-box'> nickname </div>
      <div className='email-box profil-box'>email</div> 
      <div className='game-box profil-box'>
        <span>PLAY</span>
        <div className="movement-ball"></div>
      </div>

      {/* <Routes> */}
            {/* <Route path='*' 			Component={Home} /> */}
		    {/* <Route path="/contact"	Component={() => <Contact show={showContact} />} /> */}
		    {/* <Route path="/creatMsg"	Component={() => <CreatMsg show={showContact} />} /> */}
      {/* </Routes>  */}
      {/* <button className='logout-button'>LOG OUT</button> */}
      {/* <Link to="/home"> */}
        {/* <button className='home-button'>Home</button> */}
      {/* </Link> */}
      {/* <Link to="/message"> */}
        {/* <button className='message-button' onClick={handleChatClick}>Message </button> */}
      {/* </Link> */}
      {/* <Link to="/contact"> */}
        {/* <button className='contact-button'>Contact</button> */}
      {/* </Link> */}
		  {/* <Chat show={showChat} /> */}
		  {/* <CreatMsg show={showChat} /> */}
		  {/* <Contact show={showContact} /> */}

  </div>
  );
};

export default Home;