import React, { useState} from 'react';
import {Link} from 'react-router-dom';
import { User } from '../Interface';

import './Home.css';

const Home = ({ user }: { user: User }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className='Home'>
      {user && (
        <>
          <div className='screen-box'></div>
          <div className='rank-box profil-box'>RANK #?</div>
          <div className='avatar-box profil-box'>
            <img src={user.avatar} alt="User Avatar" />
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
            <button className='message-button logo-box'></button>
          </Link>
          <Link to="/contact">
            <button className='contact-button logo-box'></button>
          </Link>
          <div className="toggle-button-container">
            <input type="checkbox" id="switch" checked={isChecked} onChange={handleToggle} />
            <label htmlFor="switch" className={`toggle-button ${isChecked ? "activated" : "deactivated"}`}>
              <span className="toggle-button-text">
                {isChecked ? "2FA ACTIVATED" : "2FA DESACTIVATED"}
              </span>
            </label>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;


