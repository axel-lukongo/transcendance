import React, { FC, useEffect, useState  } from 'react';
import {SubscriptionClient} from 'subscriptions-transport-ws';
import { Ball, Player } from '../../Interface';
import { UPDATE_PLAYER, PLAYER_UPDATED_SUBSCRIPTION, BALL_UPDATED_SUBSCRIPTION, BALL_MOVE} from '../graphql/Mutation';
import '../css/Pong.css'
import { useMutation } from '@apollo/client';


const wsClient = new SubscriptionClient('ws://localhost:4000/graphql', {});

interface DisplayProps {
  player: Player | null;
  otherPlayer: Player | null;
  setPlayer: (player: Player | null) => void;
  setOtherPlayer: (player: Player | null) => void;
}


export const Display: FC<DisplayProps> = ({ player, otherPlayer, setPlayer, setOtherPlayer  }) => {
  
  const default_ball: Ball = {
    id: player?.ballId  || 0,
    positionX: 44,
    positionY: 44,
    directionX: -50,
    directionY: 50,
  };
  
  const [ball, setBall]= useState<Ball | null>(default_ball);
  
  const [updatePlayer] = useMutation(UPDATE_PLAYER);
  const [ballMove] = useMutation(BALL_MOVE);
  
    
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
      // Function to call the ballMove mutation
      const Ball_ = () => {
          ballMove({
          variables: {
            id: ball.id,
            playerId: player.id,
            otherPlayerId: otherPlayer.id,
          },
        })
          .then((response) => {
            setBall(response.data.ballMove);
            // console.log('ballmove', response.data.ballMove);
          })
          .catch((error) => {
            console.error('Error calling BallMove mutation:', error);
          });
      };

      // Call the ballMove mutation immediately on component mount
      Ball_();
      // Set up an interval to call ballMove every 50ms
      const intervalId = setInterval(Ball_, 10000);
      // Clean up the interval when the component unmounts
      return () => clearInterval(intervalId);
    }
  }, [player, otherPlayer, ball, ballMove]);


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
            console.log('ici');
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
  }, [ball, player, setBall]);

  
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
// useEffect(() => {
//   if (ball && player && otherPlayer) {
//     // Fonction pour mettre à jour la position de la balle et gérer les rebonds
//     const updateBallPosition = () => {

//       const speed = 5 ;
//       // Mettre à jour les nouvelles coordonnées X et Y en fonction de la direction et de la vitesse
//       const newX = ball.positionX + (ball.directionX * speed)/100 //window.innerWidth;
//       const newY = ball.positionY + (ball.directionY * speed)/100 //window.innerHeight;

//       // Vérifier les limites de l'environnement pour gérer les rebonds
//       const maxX = 100; // Valeur maximale de la coordonnée X (par exemple, 100%)
//       const maxY = 100; // Valeur maximale de la coordonnée Y (par exemple, 100%)
//       const minX = 0; // Valeur minimale de la coordonnée X (par exemple, 0%)
//       const minY = 0; // Valeur minimale de la coordonnée Y (par exemple, 0%)


//       // Gérer les rebonds en inversant la direction lorsque la balle atteint les bords
//       const HitWallX = newX > maxX || newX < minX;
//       const HitWallY = newY > maxY || newY < minY;

//       // Gérer les rebonds en inversant la direction lorsque la balle atteint les stick
//       const hitGreenStickPosX = newX <= player.positionX -5 
//       const hitGreenStickPosY = newY >= player.positionY && newY <= player.positionY + 25; // 25% de la taille de l'écran

//       const hitRedStickPosX = newX >= otherPlayer.positionX + 5
//       const hitRedStickPosY = newY >= otherPlayer.positionY && newY <= otherPlayer.positionY + 25; // 25% de la taille de l'écran
//       // Mettre à jour la position de la balle
//       setBall({
//         ...ball,
//         positionX: HitWallX || (hitGreenStickPosX && hitGreenStickPosY) || (hitRedStickPosX && hitRedStickPosY) ? ball.positionX : newX,
//         positionY: HitWallY || (hitGreenStickPosX && hitGreenStickPosY) || (hitRedStickPosX && hitRedStickPosY) ? ball.positionY : newY,
//       });
      
//       // si un mur est touche on met a jour la direction de la balle et on fait une requete update
//       if (HitWallX || HitWallY) {
//         const newDirectionX = HitWallX ? -ball.directionX : ball.directionX;
//         const newDirectionY = HitWallY ? -ball.directionY : ball.directionY;

//         setBall({
//           ...ball,
//           directionX : newDirectionX,
//           directionY : newDirectionY,
//         })
//       }
//       else if (hitGreenStickPosX && hitGreenStickPosY) {
//         const newDirectionX = (hitGreenStickPosX && hitGreenStickPosY) ? -ball.directionX : ball.directionX;
//         setBall({
//           ...ball,
//           directionX : newDirectionX,
//         })
//       }
//       else if (hitRedStickPosX && hitRedStickPosY) {
//         const newDirectionX = (hitRedStickPosX && hitRedStickPosY) ? -ball.directionX : ball.directionX;
//         setBall({
//           ...ball,
//           directionX : newDirectionX,
//         })
//       }
     
//     };
//     // Mettre à jour la position de la balle à intervalles réguliers (par exemple, toutes les 50 ms)
//     const updateInterval = setInterval(updateBallPosition, 100);
//     // Nettoyer l'intervalle lorsque le composant est démonté
//     return () => clearInterval(updateInterval);
//   }
// }, [ball]);