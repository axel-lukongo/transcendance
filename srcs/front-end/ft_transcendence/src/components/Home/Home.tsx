import React from 'react';
import {Link} from 'react-router-dom';
import { TfaToggleButton } from './micro-components/TfaToogleButton';

import './css/Home.css';
import NicknameBox from './micro-components/NicknameBox';
import AvatarBox from './micro-components/AvatarBox';


const Home = () => {

  const user = JSON.parse(sessionStorage.getItem('user') || '');

  return (
    <div className='Home'>
      {user && (
        <>
          <div className='screen-box'></div>
          <div className='rank-box profil-box'>RANK #?</div>
          <AvatarBox />
          <div className="history-match-box profil-box">
            MATCH HISTORY
          </div>
          <NicknameBox/>
          <div className='email-box profil-box'>
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
        </>
      )}
    </div>
  );
}

export default Home;