import {Link} from 'react-router-dom';
import NicknameBox from './micro-components/Nickname';
import AvatarBox from './micro-components/Avatar';
import HistoryMatch from './micro-components/MatchHistory';
import { TfaToggleButton } from './micro-components/TfaToogleButton';
import { User } from '../interfaces/interfaces';
import NavBar from '../../NavBar';

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
          <div className='screen-box'>
			<NavBar />
            
            <div className="stat-box profil-box">
              <MatchStatistic  />
            </div>
            
            <AvatarBox />

            <div className="history-match-box profil-box">
              <h1>MATCH HISTORY</h1>
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
          </div>
      )}
    </div>
  );
}

export default Home;