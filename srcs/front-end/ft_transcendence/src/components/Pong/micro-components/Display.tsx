import React, { FC, useEffect  } from 'react';
import {SubscriptionClient} from 'subscriptions-transport-ws';
import { Player, OtherPlayer } from '../../Interface';
import { UPDATE_PLAYER} from '../graphql/Mutation';
import { PLAYER_UPDATED_SUBSCRIPTION } from '../graphql/Query';
import '../css/Pong.css'
import { useMutation } from '@apollo/client';


const wsClient = new SubscriptionClient('ws://localhost:4000/graphql', {});

interface DisplayProps {
  player: Player | null;
  otherPlayer: OtherPlayer | null;
  setPlayer: (player: Player | null) => void;
  setOtherPlayer: (player: OtherPlayer | null) => void;
}

export const Display: FC<DisplayProps> = ({ player, otherPlayer, setPlayer, setOtherPlayer  }) => {

  const containerHeight = document.querySelector('.pong-container-box')?.clientHeight  || 0;
  const stickHeight = 0.25 * containerHeight;
  const maxHeight = containerHeight - stickHeight;
  const [updatePlayer] = useMutation(UPDATE_PLAYER);
    
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const step = 5; // Ajustez la vitesse de déplacement ici
    if (!player) {
      return; 
    }
    let updatedPositionY = player.positionY;
    switch (e.key) {
      case 'a':
        updatedPositionY = Math.max(updatedPositionY - step, 0); 
        break;
      case 'q':
        updatedPositionY = Math.min(updatedPositionY + step, 75);
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
            const updatedOtherPlayer: OtherPlayer = response.data?.playerUpdatedSubscription as OtherPlayer;
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
  
  return (
      <div className="pong-container-box" tabIndex={0} onKeyDown={handleKeyDown}>
          <div className="green-stick" style={{ top: `${player?.positionY}%` }} />
          <div className="red-stick" style={{ top: `${otherPlayer?.positionY}%` }} />
      </div>
  )
}