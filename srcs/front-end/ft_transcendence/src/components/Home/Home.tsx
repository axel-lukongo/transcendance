import React from 'react';
import {Link} from 'react-router-dom';
import { User } from '../Interface';
import { TfaToggleButton } from './micro-components/TfaToogleButton';

import './css/Home.css';

const Home = () => {

  const user = JSON.parse(sessionStorage.getItem('user') || '');

  return (
    <div className='Home'>
      {user && (
        <>
          <div className='screen-box'>
          <div className='rank-box profil-box'>RANK #?</div>
          <div className='avatar-box profil-box'>
            <img src={user.avatar} alt="User Avatar" />
          </div>
          <div className="history-match-box profil-box">
            MATCH HISTORY
          </div>
          <div className='info-box profil-box'>
          {user.nickname}
          <br />
          {user.email}
          </div>

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
          <TfaToggleButton userId={user.id} tfaCode={user.tfa_code} />
          </div>
        </>
      )}
    </div>
  );
}

export default Home;


