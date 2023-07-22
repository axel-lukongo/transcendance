import React, { FC,  } from 'react';
import { Player } from '../../Interface';
import '../css/Pong.css'

interface DisplayProps {
  player: Player | null;
  setPlayer: (player: Player | null) => void;
}
export const Display: FC<DisplayProps> = ({ player, setPlayer }) => {

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
      };

    return (
        <div className="pong-container-box" tabIndex={0} onKeyDown={handleKeyDown}>
            <div className="green-stick" style={{ top: `${player?.positionY}px` }} />
            <div className="red-stick"/>
        </div>
    )
}