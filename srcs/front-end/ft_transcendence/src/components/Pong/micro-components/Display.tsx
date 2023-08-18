import React, { FC, useEffect, useState,   } from 'react';
import {SubscriptionClient} from 'subscriptions-transport-ws';
import { useMutation } from '@apollo/client';
import { Ball, Player, PongI } from '../../interfaces/interfaces';
import { UPDATE_PLAYER, PLAYER_UPDATED_SUBSCRIPTION, BALL_UPDATED_SUBSCRIPTION, START_PONG, PONG_UPDATED_SUBSCRIPTION} from '../graphql/Mutation';
import Xp from './Xp';
import '../css/Pong.css'

const wsClient = new SubscriptionClient('ws://localhost:4000/graphql', {});

interface DisplayProps {
  player:               Player | null;
  otherPlayer:          Player | null;
  ball:                 Ball | null;
  pong:                 PongI | null;
  pongMap:              string| null; 
  setPlayer:            (player: Player | null) => void;
  setOtherPlayer:       (player: Player | null) => void;
  setBall:              (ball: Ball | null) => void;
}

export const Display: FC<DisplayProps> = ({ player,
                                            otherPlayer,
                                            ball,
                                            pong,
                                            pongMap,
                                            setPlayer,
                                            setOtherPlayer,
                                            setBall,}) => {

                                              
                                              //POSITION OF THE STICK AND SCORE  IN SCREEN
  const playerStickClass = player?.host ? "green-stick" : "red-stick";
  const playerScoreClass = player?.host ? "green-stick-score-host" : "green-stick-score-not-host";
  
  const otherPlayerStickClass = player?.host ? "red-stick" : "green-stick";
  const otherPlayerScoreClass = player?.host ? "red-stick-score-host" : "red-stick-score-not-host";
  
  const [playerScore, setPlayerScore] = useState(() => {
    if (player) {
      return player.host ? pong?.scoreUser1 : pong?.scoreUser2;
    }
    return 0;
  });

  const [otherPlayerScore, setOtherPlayerScore] = useState(() => {
    if (otherPlayer) {
      return otherPlayer.host ? pong?.scoreUser1 : pong?.scoreUser2;
    }
    return 0; 
  });

  const [victory, setVictory] = useState(() => {
    if (pong && pong.winnerId) {
      return  pong.winnerId === player?.userId ? true : false;
    }
    return null; 
  });
  
  const [updatePlayer] = useMutation(UPDATE_PLAYER);
  const [startPong] = useMutation(START_PONG);

/*
*   SET GAME 
*/
  useEffect(() => {

      // START PONG
      if (player?.host)
      {
        startPong({
          variables: {
            ballId: ball?.id,
            playerId: player?.id,
            otherPlayerId: otherPlayer?.id,
            pongId: pong?.id
          },
        })
        .then((response) => {
          // Appel réussi, le démarrage de ballMove est activé côté serveur
          console.log('game start', response);
        })
        .catch((error) => {
          console.error('Error calling startPong mutation:', error);
        });
      }
  }, []); 

/*
*   BALL ACTION     
*/

  // BALL MOVE
  useEffect(() => {
    const subscription = wsClient
      .request({ query: BALL_UPDATED_SUBSCRIPTION, variables: { id: ball?.id } })
      .subscribe({
        next(response) {
          if (ball && victory === null) {
            if (response.data) {
              const updatedBall: Ball = response.data?.ballUpdatedSubscription as Ball;
              setBall(updatedBall);
            }
          }
        },
        error(error) {
          console.error('WebSocket error:', error);
        },
      });

    return () => {
      subscription.unsubscribe();
    };
  }, [ball, victory, setBall]);

/*
*     PLAYER / OTHER PLAYER MOVE
*/

  //PLAYER MOVE
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const speed = 5; // Ajustez la vitesse de déplacement en %
    if (!player || victory !== null) {
      return; 
    }
    let updatedPositionY = player.positionY;
    switch (e.key) {
      case 'a':
        updatedPositionY = Math.max(updatedPositionY - speed, 0); 
        break;
      case 'q':
        updatedPositionY = Math.min(updatedPositionY + speed, 75);
        break;
      default:
        break;
    }

    const updatedPlayer: Player = {
      ...player,
      positionY: updatedPositionY,
    };

    setPlayer(updatedPlayer);

    updatePlayer({
      variables: {
        input: {
          id: player.id,
          userId: player.userId,
          positionY: player.positionY,
          positionX: player.positionX,
          host: player.host,
          waitingRoomId: player.waitingRoomId,
          opponentPlayerId: player.opponentPlayerId,
          ballId: player.ballId,
        },
      },
    })
    .then((response) => {
      // console.log('player has been updated:', response.data.updatePlayer);
    })
    .catch((error) => {
      console.error('Error updating player:', error);
    });
  }

  //OTHER PLAYER MOVE
  useEffect(() => {
    const subscription = wsClient
    .request({ query: PLAYER_UPDATED_SUBSCRIPTION, variables: { id: otherPlayer?.id } })
    .subscribe({
        next(response) {
            if (response.data) {
              const updatedOtherPlayer: Player = response.data?.playerUpdatedSubscription as Player;
              updatedOtherPlayer.positionY = Math.min(updatedOtherPlayer.positionY, 75);
              setOtherPlayer(updatedOtherPlayer);
            }
        },
        error(error) {
          console.error('WebSocket error:', error);
        },
      });
  
    return () => {
      subscription.unsubscribe();
    };
  }, [otherPlayer, victory, setOtherPlayer]);
  
  

  useEffect(() => {
    const subscription = wsClient
      .request({ query: PONG_UPDATED_SUBSCRIPTION, variables: { id: pong?.id } })
      .subscribe({
        next(response) {
            if (response.data) {
              const updatedPong: PongI = response.data?.pongUpdatedSubscription as PongI;

              if (updatedPong.scoreUser1 && updatedPong.scoreUser1 !== playerScore) {
                setPlayerScore(updatedPong.scoreUser1);
              } 
              else if (updatedPong.scoreUser2 && updatedPong.scoreUser2 !== otherPlayerScore) {
                setOtherPlayerScore(updatedPong.scoreUser2);
              }
              if (updatedPong.winnerId !== null) {
                if (updatedPong.winnerId === player?.userId) {
                  setVictory(true);
                } 
                else {
                  setVictory(false);
                }
              }
            }
        },
        error(error) {
          console.error('WebSocket error:', error);
        },
      });
  
    return () => {
      subscription.unsubscribe();
    };
  }, [player, , playerScore, otherPlayerScore, victory, setPlayerScore, setOtherPlayerScore]);
  
  return (
<div>
  <div className="score-container-box">
    <h1 className={playerScoreClass}>{playerScore}</h1>
    <div className="score-separator" />
    <h1 className={otherPlayerScoreClass}>{otherPlayerScore}</h1>
  </div>
  {victory !== null ? (
    <div className="pong-container-result-box">
      <div className="result-text">
        <h1>{victory ? 'YOU WIN 🏆' : 'YOU LOSE 😓'}</h1>
      </div>
      <Xp userId={player?.userId}/>
    </div>
  ) : (
  <div className="pong-container-box" style={pongMap && pongMap !== "/static/media/default_map.313d94a21c71d5064795.png" ? { backgroundImage: `url(${pongMap})`, backgroundSize: 'cover' } : {}} tabIndex={0} onKeyDown={handleKeyDown}>
      <div className={playerStickClass} style={{ top: `${player?.positionY}%` }} />
      <div className={otherPlayerStickClass} style={{ top: `${otherPlayer?.positionY}%` }} />
      <div className='ball' style={{ top: `${ball?.positionY}%`, left: `${ball?.positionX}%` }} /> 
    </div>
  )}
</div>
  );
}