
import { FC, useEffect, useState } from 'react';
import { Display } from './Display';
import { Player, User, Ball, PongI } from '../../interfaces/interfaces'
import {useMutation, } from '@apollo/client';
import { END_PONG, JOIN_PONG } from '../graphql/Mutation';


interface GameProps {
    pongMap:  string| null; 
  }
  const Game: FC<GameProps> = ({ pongMap }) => {

    const userFromStorageString = sessionStorage.getItem('user');
    let userFromStorage: User | null = null;
    if (userFromStorageString && userFromStorageString !== 'undefined')
      userFromStorage = JSON.parse(userFromStorageString);
  
    const [player, setPlayer] = useState<Player | null>(null);
    const [otherPlayer, setOtherPlayer] = useState<Player | null>(null);
    const [ball, setBall]= useState<Ball | null>(null); 
    const [pong, setPong] = useState<PongI | null>(null);
  
  
    const [joinPong] = useMutation(JOIN_PONG);
    const [endPong] = useMutation(END_PONG);
    
    
    useEffect(() => {
      if (!player && userFromStorage) {
        joinPong({})
        .then(response => {
          console.log(response);
          const { player, otherPlayer, ball, pong } = response.data.joinPong;
    
          if (player && otherPlayer && ball && pong) {
            setPlayer(player);
            setOtherPlayer(otherPlayer);
            setBall(ball);
            setPong(pong);
            // console.log('Setting otherPlayer:', otherPlayer);
            // console.log('Setting player:', player);
            // console.log('Setting ball:', ball);
            // console.log('Setting pong:', pong);
          }
        })
        .catch(error => {
          console.error('Error joining pong:', error);
        });
      }
    
      //Cleanup function
      return () => {
          endPong({})
          .then(endPongResponse => {
            // console.log('endPong result:', endPongResponse.data.endPong); 
          })
          .catch(error => {
            console.error('Error ending pong:', error);
          });
        }
      }, []);
  
      const handleUnload = async () => {
        if (player && userFromStorage) {
          try {
            await endPong({});
          } catch (error) {
            console.error('Error ending pong:', error);
          }
        }
      };
    
      useEffect(() => {
        window.addEventListener('beforeunload', handleUnload);
    
        return () => {
          window.removeEventListener('beforeunload', handleUnload);
        };
      }, [player, userFromStorage]);
  
      return (
        <div>
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