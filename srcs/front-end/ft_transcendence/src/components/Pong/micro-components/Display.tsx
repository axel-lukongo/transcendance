import React, { FC, useEffect, useState  } from 'react';
import {SubscriptionClient} from 'subscriptions-transport-ws';
import { Ball, Player, PongI } from '../../interfaces/interfaces';
import { UPDATE_PLAYER, PLAYER_UPDATED_SUBSCRIPTION, BALL_UPDATED_SUBSCRIPTION, START_PONG, PONG_UPDATED_SUBSCRIPTION} from '../graphql/Mutation';
import '../css/Pong.css'
import { useMutation } from '@apollo/client';
import { wsClient } from '../../..';


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

  const host = player?.host === true;

  const playerStickClass = host ? "green-stick" : "red-stick";
  const playerScoreClass = host ? "green-stick-score" : "red-stick-score";

  const otherPlayerStickClass = !host ? "green-stick" : "red-stick";
  const otherPlayerScoreClass = !host ? "green-stick-score" : "red-stick-score";

  const [ball, setBall]= useState<Ball | null>(default_ball);
  const [mount, setMount] = useState(false);
  const [playerScore, setPlayerScore] = useState(0);
  const [otherPlayerScore, setOtherPlayerScore] = useState(0);
  const [updatePlayer] = useMutation(UPDATE_PLAYER);
  const [startPong] = useMutation(START_PONG);

/*
*   SET GAME 
*/

// START GAME
  useEffect(() => {
    if (player && otherPlayer && !mount) {
      
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
    }, [player, otherPlayer, ball, mount, setMount, startPong]);
    
/*
*   BALL ACTION     
*/

// BALL MOVE
  useEffect(() => {
    if (player) {
      const subscription = wsClient.request({ query: BALL_UPDATED_SUBSCRIPTION, variables: {id : ball?.id} }).subscribe({
        next(response) {
          if (response.data) {
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
  }, [ball, player, setBall,]);

/*
*     PLAYER / OTHER PLAYER MOVE
*/

  //PLAYER MOVE
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const speed = 5; // Ajustez la vitesse de déplacement en %
    if (!player) {
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
    if (otherPlayer) {
      const subscription = wsClient.request({ query: PLAYER_UPDATED_SUBSCRIPTION, variables: {id : otherPlayer.id} }).subscribe({
        next(response) {
          if (response.data) {
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
  }, [otherPlayer, setOtherPlayer]);

  useEffect(() => {
    if (player && otherPlayer) {
      const subscription = wsClient.request({ query: PONG_UPDATED_SUBSCRIPTION, variables: {id : player.pongId} }).subscribe({
        next(response) {
          if (response.data) {
            const updatedPong: PongI = response.data?.playerUpdatedSubscription as PongI;
            console.log('pong update', updatedPong);
            if (updatedPong.scoreUser1 && updatedPong.scoreUser1 !== playerScore)
              setPlayerScore(updatedPong.scoreUser1);
            else if (updatedPong.scoreUser2 && updatedPong.scoreUser2 !== otherPlayerScore)
              setOtherPlayerScore(updatedPong.scoreUser2);
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
  }, [player, otherPlayer, playerScore, otherPlayerScore, setPlayerScore, setOtherPlayerScore]);

  return (
    <div className="pong-container-box" tabIndex={0} onKeyDown={handleKeyDown}>
      <div className={playerStickClass} style={{ top: `${player?.positionY}%` }} />
      {/* <div className={playerScoreClass}> {playerScore} </div> */}
    
      <div className={otherPlayerStickClass} style={{ top: `${otherPlayer?.positionY}%` }} />
      {/* <div className={otherPlayerScoreClass}> {otherPlayerScore} </div> */}
    
      <div className='ball' style={{ top: `${ball?.positionY}%` , left: `${ball?.positionX}%`, }} /> 
    </div>
  )
}