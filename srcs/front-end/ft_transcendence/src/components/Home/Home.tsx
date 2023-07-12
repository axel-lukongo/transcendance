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
    <div className='Home'>
      <div className='screen-box'></div> 
        <div className='rank-box profil-box'>RANK #?</div> 
        <div className='avatar-box profil-box'></div> 
        <div className="history-match-box profil-box">
          MATCH HISTORY
        </div>
        <div className='nickname-box profil-box'>nickname</div>
        <div className='email-box profil-box'>email</div> 
        <div className='game-box profil-box'>
          <span>PLAY</span>
          <div className="movement-ball"></div>
        </div>
        <button className='log-out-button logo-box'></button>
        <Link to="/">
          <button className='home-button logo-box'></button>
        </Link>
        <Link to="/message">  
           <button className='message-button logo-box' ></button> 
         </Link>
         
         <Link to="/contact">  
           <button className='contact-button logo-box' ></button> 
         </Link>
         <input type="checkbox" id="switch" /><label htmlFor="switch">Toggle</label>
      </div>
  );
}

export default Home;

