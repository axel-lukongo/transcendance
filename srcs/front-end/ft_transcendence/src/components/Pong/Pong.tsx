import { FC, useEffect, useState } from 'react';
import { Display } from './micro-components/Display';
import { Player, User, Ball, PongI } from '../interfaces/interfaces';
import {useMutation, } from '@apollo/client';
import { JOIN_PONG } from './graphql/Mutation';


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
  
  
  useEffect(() => {
    if (!player && userFromStorage) {
      joinPong({
        variables: {
          id: userFromStorage.id,
        },
      })
        .then(response => {
          console.log(response);
          const { player, otherPlayer, ball, pong } = response.data.joinPong;
          
          if (player) {
            // console.log('Setting player:', player);
            setPlayer(player);
          } 
          if (otherPlayer) {
            // console.log('Setting otherPlayer:', otherPlayer);
            setOtherPlayer(otherPlayer);
          }
          if (ball) {
            // console.log('Setting ball:', ball);
            setBall(ball);
          }
          if (pong) {
            // console.log('Setting pong:', pong);
            setPong(pong);
          }
        })
        .catch(error => {
          console.error('Error joining pong:', error);
        });
        return () => {
         console.log('salut');
        }
    }
  }, []);

     
  
  return (
    <div>
      {player && otherPlayer && ball && pong ? (
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

// const [removeBall] = useMutation(REMOVE_BALL);
// const [removePlayer] = useMutation(REMOVE_PLAYER);
// const [updatePong] = useMutation(UPDATE_PONG);

      // useEffect(() => {
      //   return () => {
      //     if (player && otherPlayer && ball && playerScore !== undefined && otherPlayerScore !== undefined) {
      //       if (victory !== null) {  // NORMAL EXIT
      //        exitPong ()
      //        }
      //       else { // INTERUPTION ANORMAL
      //         stopPong();
      //         const updateDataPong = {
      //           id: player.pongId,
      //           scoreUser1: player.host ? 0 : 5,
      //           scoreUser2: player.host ? 5 : 0,
      //           winnerId: otherPlayer.userId,
      //           loserId: player.id,
      //         };
      //         updatePong({
      //           variables: {
      //             input: updateDataPong
      //           }
      //         })
      //         .then((response) => {
      //           console.log('pong instance was updated:', response.data.updatePong);
      //         })
      //         .catch((error) => {
      //           console.error('Error updating pong instance:', error);
      //         });
      //       }
      
      //       removePlayer({
      //         variables: {
      //           id: player.id
      //         }
      //       })
      //       .then((response) => {
      //         console.log('Player instance was deleted:', response.data.removePlayer);
      //         setPlayer(null);
      //       })
      //       .catch((error) => {
      //         console.error('Error deleting player instance:', error);
      //       });
      //     }
      //   };
      // }, [player, otherPlayer, victory, removeBall, stopPong, updatePong, removePlayer]);
      