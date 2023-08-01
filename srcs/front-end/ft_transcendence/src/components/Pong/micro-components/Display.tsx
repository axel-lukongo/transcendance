import React, { FC, useEffect, useState  } from 'react';
import {SubscriptionClient} from 'subscriptions-transport-ws';
import { Ball, Player, PongI } from '../../Interface';
import { UPDATE_PLAYER, PLAYER_UPDATED_SUBSCRIPTION, BALL_UPDATED_SUBSCRIPTION, START_BALL_MOVE} from '../graphql/Mutation';
import '../css/Pong.css'
import { useMutation } from '@apollo/client';


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
  
  const [ball, setBall]= useState<Ball | null>(default_ball);
  const [pong, setPong] = useState<PongI | null>(null);
  
  const [updatePlayer] = useMutation(UPDATE_PLAYER);
  const [startBallMove] = useMutation(START_BALL_MOVE);
  const activeMirror = pong?.userId2 === player?.userId;
    
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
          waitingRoomId: player.waitingRoomId,
          opponentPlayerId: player.opponentPlayerId,
          ballId: player.ballId
        },
      },
    })
    .then((response) => {
      // console.log('player has been updated:', response.data.updatePlayer);
    })
    .catch((error) => {
      console.error('Error updating player:', error);
    });
    sessionStorage.setItem('player', JSON.stringify(updatedPlayer));
  }

  useEffect(() => {
    if (player && otherPlayer && ball) {
      startBallMove({
        variables: {
          id: ball.id,
          playerId: player.id,
          otherPlayerId: otherPlayer.id,
        },
      })
        .then((response) => {
          // Appel réussi, le démarrage de ballMove est activé côté serveur
          console.log(response.data.startBallMove);
        })
        .catch((error) => {
          console.error('Error calling startBallMove mutation:', error);
        });
    }
  }, [player, otherPlayer, ball, startBallMove]); // Le tableau de dépendances est vide, ce qui signifie que ce useEffect ne s'exécutera qu'une seule fois après le premier rendu

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
  
  // BALL MOVE
  useEffect(() => {
    if (player) {
      const subscription = wsClient.request({ query: BALL_UPDATED_SUBSCRIPTION, variables: {id : ball?.id} }).subscribe({
        next(response) {
          if (response.data) {
            const updatedBall: Ball = response.data?.ballUpdatedSubscription as Ball;
            if (activeMirror) {
              // Inversion en miroir
              const tempDirectionX = updatedBall.directionX;
              updatedBall.directionX = -updatedBall.directionY;
              updatedBall.directionY = -tempDirectionX;
            
              const tempPositionX = updatedBall.positionX;
              updatedBall.positionX = -updatedBall.positionY;
              updatedBall.positionY = -tempPositionX;
            }
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
  }, [ball, player, setBall, activeMirror]);

  
  return (
      <div className="pong-container-box" tabIndex={0} onKeyDown={handleKeyDown}>
          <div className="green-stick" style={{ top: `${player?.positionY}%` }} />
          <div className="red-stick" style={{ top: `${otherPlayer?.positionY}%` }} />
          <div className='ball'
          style={{ 
            top: `${ball?.positionY}%` ,
            left: `${ball?.positionX}%`,
          }} />
      </div>
  )
}