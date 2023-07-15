import React, { useState} from 'react';
import './Home.css';
// import Chat from '../Message/message';
// import CreatMsg from '../message/creat_message';
// import Contact from '../Contact/Contact';
import {Link} from 'react-router-dom';

// This component is call in authentification

const Home = () => {

  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };
  const user = JSON.parse(sessionStorage.getItem('user') || '');
  const imagePath = `http://localhost:4000/uploads/${user.avatar}`;


  return (
    <div className='Home'>
      <div className='screen-box'></div> 
        <div className='rank-box profil-box'>RANK #?</div> 
        <div className='avatar-box profil-box'>
        <img src={imagePath} alt="User Avatar" />
        </div>
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

        <div className="toggle-button-container">
          <input type="checkbox" id="switch" checked={isChecked} onChange={handleToggle} />
          <label htmlFor="switch" className={`toggle-button ${isChecked ? "activated" : "deactivated"}`}>
            <span className="toggle-button-text">
              {isChecked ? "2FA ACTIVATED" : "2FA DESACTIVATED"}
            </span>
          </label>
        </div>
    </div>
  );
}

export default Home;

