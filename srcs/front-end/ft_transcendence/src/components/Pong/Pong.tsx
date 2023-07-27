import { FC, useState } from 'react';
import { MatchMaking } from './micro-components/MatchMaking';
import { Display } from './micro-components/Display';
import { Player, OtherPlayer } from '../Interface';



const Pong: FC = () => {

  const playerFromStorageString = sessionStorage.getItem('player');
  const otherPlayerFromStorageString = sessionStorage.getItem('otherPlayer');

  let playerFromStorage = null;
  let otherPlayerFromStrorage = null;
  
  if (playerFromStorageString && playerFromStorageString !== 'undefined')
    playerFromStorage = JSON.parse(playerFromStorageString);

  if (otherPlayerFromStorageString && otherPlayerFromStorageString !== 'undefined')
    otherPlayerFromStrorage = JSON.parse(otherPlayerFromStorageString);

  const [player, setPlayer] = useState<Player | null>(playerFromStorage);
  const [otherPlayer, setOtherPlayer] =useState<OtherPlayer | null>(otherPlayerFromStrorage);
  
  // console.log('player at racine',player);
  // console.log('otherPlayer at racine',otherPlayer);
  

  return (
    <div>
      {player && otherPlayer ? (
        <Display
          player={player}
          otherPlayer={otherPlayer}
          setPlayer={setPlayer}
          setOtherPlayer={setOtherPlayer}
        />
      ) : (
        <MatchMaking
          player={player}
          otherPlayer={otherPlayer}
          setPlayer={setPlayer}
          setOtherPlayer={setOtherPlayer}
        />
      )}
    </div>
  );
};
export default Pong;

