import React, { FC, useState } from 'react';
import { CheckPlayer } from './micro-components/CheckPlayer';
import { Display } from './micro-components/Display';
import { Player } from '../Interface';



const Pong: FC = () => {

  const playerFromStorageString = sessionStorage.getItem('player');

  let playerFromStorage = null;
  if (playerFromStorageString && playerFromStorageString !== 'undefined')
    playerFromStorage = JSON.parse(playerFromStorageString);

  const [player, setPlayer] = useState<Player | null>(playerFromStorage);
  

  return (
    <div>
      {player ? (
        <Display player={player} setPlayer={setPlayer} />
      ) : (
        <CheckPlayer setPlayer={setPlayer} />
      )}
    </div>
  );
};
export default Pong;

// import {SubscriptionClient} from 'subscriptions-transport-ws';
// const wsClient = new SubscriptionClient('ws://localhost:4000/graphql', {});
