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
  
	const handleLogOut = () => {
		sessionStorage.removeItem('user');
		window.location.reload();
	}

  return (
    <div className='Home'>
      {userFromStorage && (
        <>
          <div className='screen-box'>
            
            <div className="stat-box profil-box">
              <MatchStatistic user={userFromStorage} />
            </div>
            
            <AvatarBox />

            <div className="history-match-box profil-box">
              <HistoryMatch user={userFromStorage} />
            </div>

            <NicknameBox/>

            <div className='email-box profil-box'>
              {userFromStorage.email}
            </div>

            <TfaToggleButton userId={userFromStorage.id} tfaCode={userFromStorage.tfa_code} />
            
            <Link to='/pong'>
              <button className='game-box profil-box' >
                <h1>PLAY</h1>
                <div className="movement-ball"></div>
              </button>
            </Link>
            <Link to ='/'>
              <button className='log-out-button logo-box' onClick={handleLogOut}></button>
            </Link>
            <Link to="/">
              <button className='home-button logo-box'></button>
            </Link>
            <Link to="/leaderBoard">
              <button className='leader-board-button logo-box'></button>
            </Link>
            <Link to="/message">
              <button className='message-button logo-box'></button>
            </Link>
            <Link to="/contact">
              <button className='contact-button logo-box'></button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;