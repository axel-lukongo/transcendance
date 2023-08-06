import {Link} from 'react-router-dom';
import { TfaToggleButton } from './micro-components/TfaToogleButton';

import './css/Home.css';
import NicknameBox from './micro-components/NicknameBox';
import AvatarBox from './micro-components/AvatarBox';
import HistoryMatch from './micro-components/HistoryMatch';


const Home = () => {

  const user = JSON.parse(sessionStorage.getItem('user') || '');

  return (
    <div className='Home'>
      {user && (
        <>
          <div className='screen-box'>
          <div className='rank-box profil-box'>
            <h1>RANK #?</h1>
            </div>
          <AvatarBox />
          <div className="history-match-box profil-box">
            <h3>MATCH HISTORY</h3>
            <HistoryMatch />
          </div>
          <NicknameBox/>
          <div className='email-box profil-box'>
          {user.email}
          </div>
            <Link to='/pong'>
              <button id="play-button" className='game-box profil-box' >
                <h1>PLAY</h1>
                <div className="movement-ball"></div>
              </button>
            </Link>
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