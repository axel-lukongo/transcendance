import React, { FC, useState } from 'react';
import './css/Pong.css';
import {SubscriptionClient} from 'subscriptions-transport-ws';

interface PosOtherPlayer {
  greenButtonY: number;
}

const wsClient = new SubscriptionClient('ws://localhost:4000/graphql', {});


const Pong: FC = () => {
  const [redButtonY, setRedButtonY] = useState(0);
  const [posOtherPlayer, setPosOtherPlayer] = useState<PosOtherPlayer>({
    greenButtonY: 0,
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const step = 10; // Ajustez la vitesse de déplacement ici
    switch (e.key) {
      case 'a':
        setRedButtonY((prevY) => prevY - step);
        break;
      case 'q':
        setRedButtonY((prevY) => prevY + step);
        break;
      default:
        break;
    }
  };

  return (
    <div className="pong-container-box" tabIndex={0} onKeyDown={handleKeyDown}>
      <button className="red-button" style={{ top: `${redButtonY}px` }} />
      <button
        className="green-button"
        style={{ top: `${posOtherPlayer.greenButtonY}px` }}
      />
    </div>
  );
};

export default Pong;

