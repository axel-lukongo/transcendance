
import { FC, useEffect, useState } from 'react';
import { Display } from './Display';
import { Player, User, Ball, PongI } from '../../interfaces/interfaces'
import {useMutation, } from '@apollo/client';
import { END_PONG, JOIN_PONG, JOIN_PONG_INVITE, SET_INVITE } from '../graphql/Mutation';
import { UPDATE_STATE } from '../../Authentication/graphql/Mutation';
import { __CONNECTED_, __DISCONECTED__ } from '../../../App';
import NavBar from '../../../NavBar';


interface GameProps {
	pongMap:  string| null;
	friendId: number | undefined;
  }
  const Game: FC<GameProps> = ({ pongMap, friendId }) => {

	const userFromStorageString = sessionStorage.getItem('user');
	let userFromStorage: User | null = null;
	if (userFromStorageString && userFromStorageString !== 'undefined')
	  userFromStorage = JSON.parse(userFromStorageString);
  
	const [player, setPlayer] = useState<Player | null>(null);
	const [otherPlayer, setOtherPlayer] = useState<Player | null>(null);
	const [ball, setBall]= useState<Ball | null>(null); 
	const [pong, setPong] = useState<PongI | null>(null);
  
  
	const [joinPong] = useMutation(JOIN_PONG);
	const [setInvite] =useMutation(SET_INVITE);
	const [joinPongInvite] = useMutation(JOIN_PONG_INVITE);
	const [updateState] = useMutation(UPDATE_STATE);

	const [endPong] = useMutation(END_PONG);
	
	
	useEffect(() => {
	  if (!player && userFromStorage) {
		if (friendId !== undefined) {
		  setInvite({
			variables: {
			  friendId: friendId
			}
		  })
			.then(response => {
			  const {waitingRoomId} = response.data.setPongInvite;
			  joinPongInvite({
				variables: {
				  friendId: friendId,
				  waitingRoomId: waitingRoomId,
				}
			  })
				.then(response => {
				  const { player, otherPlayer, ball, pong } = response.data.joinPongInvite;
				  if (player && otherPlayer && ball && pong) {
					setPlayer(player);
					setOtherPlayer(otherPlayer);
					setBall(ball);
					setPong(pong);
				  }
				})
				.catch(error => {
				  console.error('Error joining pong:', error);
				});
			})
			.catch(error => {
			  console.error('Error setting invite:', error);
			});
		}
		else
		{
		  joinPong({
			variables: {
			  userId: userFromStorage?.id
			}
		  })
		  .then(response => {
			const { player, otherPlayer, ball, pong } = response.data.joinPong;
			if (player && otherPlayer && ball && pong) {
			  setPlayer(player);
			  setOtherPlayer(otherPlayer);
			  setBall(ball);
			  setPong(pong);
			}
		  })
		  .catch(error => {
			console.error('Error joining pong:', error);
		  });
		}
	}
	
	 //Cleanup function
	return () => {
	  endPong()
	  .catch(error => {
		console.error('Error ending pong:', error);
	  });
	  
	  updateState({
		variables: {
			state: __CONNECTED_
		}
	  })
	  
	  sessionStorage.removeItem('playerMap');
	}
  }, []);

  useEffect(() => {
	const handleUnload = async () => {
		endPong()
		.catch(error => {
		  console.error('Error ending pong:', error);
		});
		updateState({
			variables: {
				state: __DISCONECTED__
			}
		  })

		sessionStorage.removeItem('playerMap');
	};
  
	window.addEventListener('beforeunload', handleUnload);
  
	return () => {
	  window.removeEventListener('beforeunload', handleUnload);
	};
  }, []);
  
  
	  return (
		<div>
			<NavBar/>
		  	{pong && pong.winnerId === null ? (
			<Display
			  player={player}
			  otherPlayer={otherPlayer}
			  ball={ball}
			  pong={pong}
			  pongMap={pongMap}
			  setPlayer={setPlayer}
			  setOtherPlayer={setOtherPlayer}
			  setBall={setBall}
			/>
		  ) : (
			<div className="loading-container">
			  <h2 className="loading-text">Loading GAME...</h2>
			</div>
		  )}
		</div>
	  
	  );

}
export default Game;