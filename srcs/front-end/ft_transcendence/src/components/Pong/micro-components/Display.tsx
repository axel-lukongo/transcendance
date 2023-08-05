import React, { FC, useEffect, useState  } from 'react';
import {SubscriptionClient} from 'subscriptions-transport-ws';
import { Ball, Player, PongI } from '../../interfaces/interfaces';
import { UPDATE_PLAYER, PLAYER_UPDATED_SUBSCRIPTION, BALL_UPDATED_SUBSCRIPTION, START_PONG, PONG_UPDATED_SUBSCRIPTION} from '../graphql/Mutation';
import '../css/Pong.css'
import { useMutation } from '@apollo/client';
import Xp from './Xp';

const wsClient = new SubscriptionClient('ws://localhost:4000/graphql', {});

interface DisplayProps {
  player: Player | null;
  otherPlayer: Player | null;
  setPlayer: (player: Player | null) => void;
  setOtherPlayer: (player: Player | null) => void;
}

export const Display: FC<DisplayProps> = ({ player, otherPlayer, setPlayer, setOtherPlayer }) => {
  
  const default_ball: Ball = {
    id: player?.ballId  || 0,
    positionX: 44,
    positionY: 44,
    directionX: -50,
    directionY: 50,
  };


  const playerStickClass = player?.host ? "green-stick" : "red-stick";
  const playerScoreClass = player?.host ? "green-stick-score-host" : "green-stick-score-not-host";
  
  const otherPlayerStickClass = player?.host ? "red-stick" : "green-stick";
  const otherPlayerScoreClass = player?.host ? "red-stick-score-host" : "red-stick-score-not-host";
  

  const [ball, setBall]= useState<Ball | null>(default_ball);
  const [mount, setMount] = useState(false);
  const [playerScore, setPlayerScore] = useState(0);
  const [otherPlayerScore, setOtherPlayerScore] = useState(0);
  const [victory, setVictory] = useState<Boolean | null>(false);

  const [updatePlayer] = useMutation(UPDATE_PLAYER);
  const [startPong] = useMutation(START_PONG);

/*
*   SET GAME 
*/

// START GAME
  useEffect(() => {
    if (player && otherPlayer && !mount && victory === null) {
      
      setMount(true);

      startPong({
        variables: {
          id: ball?.id,
          playerId: player.id,
          otherPlayerId: otherPlayer.id,
          pongId: player.pongId
        },
      })
      .then((response) => {
        // Appel réussi, le démarrage de ballMove est activé côté serveur
          console.log(response.data.startPong);
        })
        .catch((error) => {
          console.error('Error calling startPong mutation:', error);
        });
      }
    }, [player, otherPlayer, ball, mount, victory, setMount, startPong]);
    
/*
*   BALL ACTION     
*/

// BALL MOVE
  useEffect(() => {
    if (player && victory === null) {
      const subscription = wsClient.request({ query: BALL_UPDATED_SUBSCRIPTION, variables: {id : ball?.id} }).subscribe({
        next(response) {
          if (victory !== null) {
            subscription.unsubscribe()
          }
          else if (response.data) {
            const updatedBall: Ball = response.data?.ballUpdatedSubscription as Ball;
            setBall(updatedBall);
            sessionStorage.setItem('ball', JSON.stringify(ball));
          }
        },
        error(error) {
          console.error('WebSocket error:', error);
        },
      });
      // Fonction de retour pour annuler l'abonnement lors du démontage du composant
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [ball, player, victory, setBall]);

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
    sessionStorage.setItem('player', JSON.stringify(updatedPlayer));

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
    if (otherPlayer && victory === null) {
      const subscription = wsClient.request({ query: PLAYER_UPDATED_SUBSCRIPTION, variables: {id : otherPlayer.id} }).subscribe({
        next(response) {
          if (victory !== null) {
            subscription.unsubscribe()
          }
          else if (response.data) {
            const updatedOtherPlayer: Player = response.data?.playerUpdatedSubscription as Player;
            updatedOtherPlayer.positionY = Math.min(updatedOtherPlayer.positionY, 75);
            updatedOtherPlayer.positionX += 80;
            setOtherPlayer(updatedOtherPlayer);
            sessionStorage.setItem('otherPlayer', JSON.stringify(updatedOtherPlayer));
          }
        },
        error(error) {
          console.error('WebSocket error:', error);
        },
      });
      // Fonction de retour pour annuler l'abonnement lors du démontage du composant
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [otherPlayer, victory, setOtherPlayer]);

  useEffect(() => {
    if (player && otherPlayer && victory === null) {
      const subscription = wsClient.request({ query: PONG_UPDATED_SUBSCRIPTION, variables: {id : player.pongId} }).subscribe({
        next(response) {
          if (victory !== null) {
            subscription.unsubscribe()
          }
          else if(response.data) {
            const updatedPong: PongI = response.data?.pongUpdatedSubscription as PongI;
            if (updatedPong.scoreUser1 && updatedPong.scoreUser1 !== playerScore)
              setPlayerScore(updatedPong.scoreUser1);
            else if (updatedPong.scoreUser2 && updatedPong.scoreUser2 !== otherPlayerScore)
              setOtherPlayerScore(updatedPong.scoreUser2);
            if (updatedPong.winnerId !== null)
            {
              console.log ('you win or lose');
              if (updatedPong.winnerId === player.id)
                setVictory(true);
              else
                setVictory(false);
            }
          }
        },
        error(error) {
          console.error('WebSocket error:', error);
        },
      });
      // Fonction de retour pour annuler l'abonnement lors du démontage du composant
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [player, otherPlayer, playerScore, otherPlayerScore, victory, setPlayerScore, setOtherPlayerScore]);

  return (
<div>
  <div className="score-container-box">
    <div className={playerScoreClass}>{playerScore}</div>
    <div className="score-separator" />
    <div className={otherPlayerScoreClass}>{otherPlayerScore}</div>
  </div>
  {victory !== null ? (
    <div className="pong-container-result-box">
      <div className="result-text">
        <h1>{victory ? 'YOU WIN 🏆' : 'YOU LOSE 😓'}</h1>
      </div>
      <Xp level={29} victory={victory}  />
    </div>
  ) : (
    <div className="pong-container-box" tabIndex={0} onKeyDown={handleKeyDown}>
      <div className={playerStickClass} style={{ top: `${player?.positionY}%` }} />
      <div className={otherPlayerStickClass} style={{ top: `${otherPlayer?.positionY}%` }} />
      <div className='ball' style={{ top: `${ball?.positionY}%`, left: `${ball?.positionX}%` }} /> 
    </div>
  )}
</div>
  );
}