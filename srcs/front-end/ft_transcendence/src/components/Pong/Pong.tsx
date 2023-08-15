import { FC, useEffect, useState } from 'react';
import { Display } from './micro-components/Display';
import { Player, User, Ball, PongI } from '../interfaces/interfaces';
import {useMutation, } from '@apollo/client';
import { END_PONG, JOIN_PONG } from './graphql/Mutation';
import Xp from './micro-components/Xp';


const Pong: FC = () => {

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
      joinPong({
        variables: {
          userId: userFromStorage.id,
        },
      })
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
        else
        {

        }
      })
      .catch(error => {
        console.error('Error joining pong:', error);
      });
    }
  
    //Cleanup function
    return () => {
        endPong({
          variables: {
            userId: userFromStorage?.id
          }
        })
        .then(endPongResponse => {
          console.log('endPong result:', endPongResponse.data.endPong); // Result string
        })
        .catch(error => {
          console.error('Error ending pong:', error);
        });
      }
    }, []);

    return (
      <div>
        {pong && pong.winnerId === null ? (
          <Display
            player={player}
            otherPlayer={otherPlayer}
            ball={ball}
            pong={pong}
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
    
    
};
export default Pong;

  

      // useEffect(() => {
      //   return () => {
  
      // }, [player, otherPlayer, victory, removeBall, stopPong, updatePong, removePlayer]);
      