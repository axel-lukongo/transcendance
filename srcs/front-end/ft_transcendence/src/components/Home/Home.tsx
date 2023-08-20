import {Link} from 'react-router-dom';
import NicknameBox from './micro-components/Nickname';
import AvatarBox from './micro-components/Avatar';
import HistoryMatch from './micro-components/MatchHistory';
import { TfaToggleButton } from './micro-components/TfaToogleButton';
import { User } from '../interfaces/interfaces';

import './css/Home.css';
import MatchStatistic from './micro-components/MatchStatistic';

const Home = () => {

  const userFromStorageString = sessionStorage.getItem('user');
  let userFromStorage: User | null = null;
  if (userFromStorageString && userFromStorageString !== 'undefined')
    userFromStorage = JSON.parse(userFromStorageString);


  return (
    <div className='Home'>
      {userFromStorage && (
        <>
          <div className='screen-box'>
          
          <MatchStatistic user={userFromStorage} />
          
          <AvatarBox />
          
          <div className="history-match-box profil-box">
          <HistoryMatch user={userFromStorage} />
          </div>
          <NicknameBox/>
          
          <div className='email-box profil-box'>
          {userFromStorage.email}
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
          <Link to="/leaderBoard">
            <button className='leader-board-button logo-box'></button>
          </Link>
          </Link>
          <Link to="/message">
            <button className='message-button logo-box'></button>
          </Link>
          <Link to="/contact">
            <button className='contact-button logo-box'></button>
          </Link>
          <TfaToggleButton userId={userFromStorage.id} tfaCode={userFromStorage.tfa_code} />
          </div>
        </>
      )}
    </div>
  );
}

export default Home;