import { useContext, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import {Link} from 'react-router-dom';
import NicknameBox from './micro-components/Nickname';
import AvatarBox from './micro-components/Avatar';
import HistoryMatch from './micro-components/MatchHistory';
import { TfaToggleButton } from './micro-components/TfaToogleButton';
import { User } from '../interfaces/interfaces';
import NavBar from '../../NavBar';
import { WebSocketContext } from '../../WebSocketProvider';
import { UPDATE_STATE } from '../Authentication/graphql/Mutation';
import { __CONNECTED_ } from '../../App';

import './css/Home.css';
import MatchStatistic from './micro-components/MatchStatistic';

const Home = () => {
	
	
	const wsContext = useContext(WebSocketContext);
	
	const [updateState] = useMutation(UPDATE_STATE);
	
	useEffect(() => {
		const userFromStorageString = sessionStorage.getItem('user');
		let userFromStorage: User | null = null;
		
		if (userFromStorageString && userFromStorageString !== 'undefined')
			userFromStorage = JSON.parse(userFromStorageString);

		wsContext?.updateUser(userFromStorage);
		updateState({
			variables: {
				state: __CONNECTED_
			}
		})
	}, [])

  

  return (
    <div className='Home'>
      {wsContext?.user && (
          <div className='screen-box'>
			<NavBar />
            
            <div className="stat-box profil-box">
              <MatchStatistic  />
            </div>
            
            <AvatarBox />

            <div className="history-match-box profil-box">
              <h1>MATCH HISTORY</h1>
              <HistoryMatch user={wsContext?.user} />
            </div>

            <NicknameBox/>

            <div className='email-box profil-box'>
              {wsContext?.user.email}
            </div>

            <TfaToggleButton userId={wsContext?.user.id} tfaCode={wsContext?.user.tfa_code} />
            
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