import React, { FC, useEffect, useState  } from 'react';
import {SubscriptionClient} from 'subscriptions-transport-ws';
import { Player, OtherPlayer } from '../../Interface';
import { UPDATE_PLAYER, PLAYER_UPDATED } from '../graphql/Mutation';
import '../css/Pong.css'
import { useMutation } from '@apollo/client';


const wsClient = new SubscriptionClient('ws://localhost:4000/graphql', {});

interface DisplayProps {
  player: Player | null;
  setPlayer: (player: Player | null) => void;
}
export const Display: FC<DisplayProps> = ({ player, setPlayer }) => {

  const [otherPlayer, setOtherPlayer] =useState<OtherPlayer | null>(null);
  const [updatePlayer] = useMutation(UPDATE_PLAYER);
    
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const step = 10; // Ajustez la vitesse de déplacement ici
    if (!player) {
      return; 
    }
    let updatedPositionY = player.positionY;
    switch (e.key) {
      case 'a':
        updatedPositionY -= step;
        break;
      case 'q':
        updatedPositionY += step;
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
  }

  useEffect(() => {
    if (player) {
      updatePlayer({
        variables: {
          input: {
            id: player.id,
            userId: player.userId,
            positionY: player.positionY,
            positionX: player.positionX
          },
        },
      })
        .then((response) => {
          console.log('player has been updated:', response.data.updatePlayer);
        })
        .catch((error) => {
          console.error('Error updating player:', error);
        });
    }
  }, [player]);

  useEffect(() => {
    console.log('other player id tbale:', otherPlayer?.id)
    const subscription = wsClient.request({ query: PLAYER_UPDATED, variables: { id: otherPlayer?.id } }).subscribe({
      next(response) {
        if (response.data) {
          const updatedOtherPlayer: OtherPlayer = response.data?.playerUpdated as OtherPlayer;
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

  }, []);
  
  return (
      <div className="pong-container-box" tabIndex={0} onKeyDown={handleKeyDown}>
          <div className="green-stick" style={{ top: `${player?.positionY}px` }} />
          <div className="red-stick" style={{ top: `${otherPlayer?.positionY}px` }} />
      </div>
  )
}