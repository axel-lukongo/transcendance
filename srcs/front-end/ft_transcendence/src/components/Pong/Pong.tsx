import React, { FC, useEffect, useState } from 'react';
// import {SubscriptionClient} from 'subscriptions-transport-ws';
import { useMutation, useQuery, gql } from '@apollo/client';
import './css/Pong.css';
import { Interface } from 'readline';


// const wsClient = new SubscriptionClient('ws://localhost:4000/graphql', {});


const IS_PLAYER_IN_GAME = gql`
  query IsPlayerInGame($id: Int!) {
    isPlayerInGame(id: $id) {
      id
      playerId
      positionX
      positionY
    }
  }
`;

const CREATE_PLAYER = gql`
  mutation CreatePlayer($input: CreatePlayerInput!) {
    createPlayer(createPlayerInput: $input) {
      id
      playerId
      positionX
      positionY
    }
  }
`;


interface Player {
  id: number;
  playerId: number;
  positionX: number;
  positionY: number;
}

const Pong: FC = () => {
  const userFromStorage = JSON.parse(sessionStorage.getItem('user') || '');
  const playerId = userFromStorage.id;

  const defaultPlayer: Player = {
    id: 0,
    playerId: playerId,
    positionX: 4,
    positionY: 200,
  };

  const [player, setPlayer] = useState<Player>(
    JSON.parse(sessionStorage.getItem('player') || JSON.stringify(defaultPlayer))
  );

  const { data: dataIsPlayerInGame, error: ErrorIsplayerInGame } = useQuery(IS_PLAYER_IN_GAME, {
    variables: { id: playerId },
    skip: !playerId,
  });

  const [createPlayer] = useMutation(CREATE_PLAYER);

  // On va si le user a une game en cours 
  useEffect(() => {
    if (dataIsPlayerInGame) {
      console.log('user slot game found :', dataIsPlayerInGame.createPlayer)
      setPlayer(dataIsPlayerInGame.createPlayer);
      sessionStorage.setItem('player', JSON.stringify(dataIsPlayerInGame.createPlayer));
    }
  }, [dataIsPlayerInGame]);

  // S'il y a une erreur dans la requête, créer la position du joueur
  useEffect(() => {
    if (ErrorIsplayerInGame) {
      createPlayer({
        variables: {
          input: {
            playerId: playerId,
            positionX: 4,
            positionY: 200,
          },
        },
      })
        .then((response) => {
          if (response && response.data) {
            console.log('user slot game created :', response.data.createPlayer);
            setPlayer(response.data.createPlayer.positionY);
            sessionStorage.setItem('player', JSON.stringify(response.data.createPlayer));
          }
        })
        .catch((error) => {
          console.error('Error creating position player:', error);
        });
    }
  }, [ErrorIsplayerInGame]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const PlayerFromStorage = JSON.parse(sessionStorage.getItem('player') || JSON.stringify(defaultPlayer));
    const step = 10; // Ajustez la vitesse de déplacement ici

    switch (e.key) {
      case 'a':
        PlayerFromStorage.positionY = (PlayerFromStorage.positionY) - step;
        break;
      case 'q':
        PlayerFromStorage.positionY = (PlayerFromStorage.positionY) + step;
        break;
      default:
        break;
    }
    setPlayer(PlayerFromStorage);
    // Réenregistrez l'objet mis à jour dans le sessionStorage
    sessionStorage.setItem('player', JSON.stringify(PlayerFromStorage));
  };

  return (
    <div>
      {player ? (
        <div className="pong-container-box" tabIndex={0} onKeyDown={handleKeyDown}>
          <div className="green-stick" style={{ top: `${player?.positionY}px` }} />
        </div>
      ) : (
        <div>Error: Game cannot be loaded</div>
      )}
    </div>
  );
};

export default Pong;
