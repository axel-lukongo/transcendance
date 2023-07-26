import { FC, useState } from 'react';
import { MatchMaking } from './micro-components/MatchMaking';
import { Display } from './micro-components/Display';
import { Player, OtherPlayer } from '../Interface';



const Pong: FC = () => {

  const playerFromStorageString = sessionStorage.getItem('player');

  let playerFromStorage = null;
  if (playerFromStorageString && playerFromStorageString !== 'undefined')
    playerFromStorage = JSON.parse(playerFromStorageString);

  const [player, setPlayer] = useState<Player | null>(playerFromStorage);
  const [otherPlayer, setOtherPlayer] =useState<OtherPlayer | null>(null);
  

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
          setPlayer={setPlayer}
          setOtherPlayer={setOtherPlayer}
        />
      )}
    </div>
  );
};
export default Pong;

