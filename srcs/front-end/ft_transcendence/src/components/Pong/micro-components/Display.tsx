import React, { FC, useEffect, useState  } from 'react';
import {SubscriptionClient} from 'subscriptions-transport-ws';
import { Ball, Player } from '../../Interface';
import { UPDATE_BALL, UPDATE_PLAYER} from '../graphql/Mutation';
import { PLAYER_UPDATED_SUBSCRIPTION, BALL_UPDATED_SUBSCRIPTION } from '../graphql/Query';
import '../css/Pong.css'
import { useMutation } from '@apollo/client';


const wsClient = new SubscriptionClient('ws://localhost:4000/graphql', {});

interface DisplayProps {
  player: Player | null;
  otherPlayer: Player | null;
  setPlayer: (player: Player | null) => void;
  setOtherPlayer: (player: Player | null) => void;
}

const default_ball: Ball = {
  id: 0,
  positionX: 44,
  positionY: 44,
  directionX: -50,
  directionY: 55,
};

export const Display: FC<DisplayProps> = ({ player, otherPlayer, setPlayer, setOtherPlayer  }) => {

  const [ball, setBall]= useState<Ball | null>(default_ball);
  
  const [updatePlayer] = useMutation(UPDATE_PLAYER);
  const [updateBall] = useMutation(UPDATE_BALL);
  
    
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
          opponentPlayerId: player.opponentPlayerId
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
    if (otherPlayer) {
      const subscription = wsClient.request({ query: PLAYER_UPDATED_SUBSCRIPTION, variables: {id : otherPlayer.id} }).subscribe({
        next(response) {
          if (response.data) {
            const updatedOtherPlayer: Player = response.data?.playerUpdatedSubscription as Player;
            updatedOtherPlayer.positionY = Math.min(updatedOtherPlayer.positionY, 75);
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
    if (ball) {
      // Fonction pour mettre à jour la position de la balle et gérer les rebonds
      const updateBallPosition = () => {

        const speed = 5;
        // Mettre à jour les nouvelles coordonnées X et Y en fonction de la direction et de la vitesse
        const newX= ball.positionX  + ball.directionX * speed;
        const newY= ball.positionY + ball.directionY * speed;

        // Vérifier les limites de l'environnement pour gérer les rebonds
        const maxX = 100; // Valeur maximale de la coordonnée X (par exemple, 100%)
        const maxY = 100; // Valeur maximale de la coordonnée Y (par exemple, 100%)
        const minX = 0; // Valeur minimale de la coordonnée X (par exemple, 0%)
        const minY = 0; // Valeur minimale de la coordonnée Y (par exemple, 0%)

        // Gérer les rebonds en inversant la direction lorsque la balle atteint les bords
         const newDirectionX = newX > maxX || newX < minX ? -ball.directionX : ball.directionX;
         const newDirectionY=  newY > maxY || newY < minY ? -ball.directionY : ball.directionY;

        // Mettre à jour la position de la balle
        
        setBall({
          id: ball.id,
          positionX : newX,
          positionY: newY,
          directionX: newDirectionX,
          directionY: newDirectionY,
        });

        // Mettre à jour la direction de la balle pour le prochain mouvement
        updateBall({
          variables: {
            id: ball.id,
            positionX : ball.positionX,
            positionY: ball.directionY,
            directionX: ball.directionX,
            directionY: ball.directionY,
          },
        })
        .then((response) => {
          // console.log('player has been updated:', response.data.updatePlayer);
        })
        .catch((error) => {
          console.error('Error updating ball:', error);
        });
        // sessionStorage.setItem('ball', JSON.stringify(ball));
      };

      // Mettre à jour la position de la balle à intervalles réguliers (par exemple, toutes les 50 ms)
      const updateInterval = setInterval(updateBallPosition, 500000);

      // Nettoyer l'intervalle lorsque le composant est démonté
      return () => clearInterval(updateInterval);
    }
  }, [ball]);

  useEffect(() => {
    if (player) {
      const subscription = wsClient.request({ query: BALL_UPDATED_SUBSCRIPTION, variables: {id : player?.BallId} }).subscribe({
        next(response) {
          if (response.data) {
            const updatedBall: Ball = response.data?.ballUpdatedSubscription as Ball;
            setBall(updatedBall);
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

  
  return (
      <div className="pong-container-box" tabIndex={0} onKeyDown={handleKeyDown}>
          <div className="green-stick" style={{ top: `${player?.positionY}%` }} />
          <div className="red-stick" style={{ top: `${otherPlayer?.positionY}%` }} />
          <div className='ball'
          style={{ 
            top: `${ball?.positionY}%` ,
            right: `${ball?.positionX}%`,
            left: `${ball?.positionX}%`,
            }} />
      </div>
  )
}