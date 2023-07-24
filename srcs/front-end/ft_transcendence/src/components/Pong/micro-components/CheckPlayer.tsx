import { FC, useEffect } from 'react';
import { useMutation, useQuery,} from '@apollo/client';
import { Player } from '../../Interface';
import { CREATE_PLAYER,  } from '../graphql/Mutation';
import { IS_PLAYER_IN_GAME } from '../graphql/Query';

interface CheckPlayerProps {
  setPlayer: (player: Player | null) => void;
}

export const CheckPlayer: FC<CheckPlayerProps> = ({ setPlayer }) => {
  const userFromStorageString = sessionStorage.getItem('user');
  const userFromStorage = userFromStorageString ? JSON.parse(userFromStorageString) : null;
  const userId = userFromStorage?.id;

  const { data: dataIsPlayerInGame, error: errorIsPlayerInGame } = useQuery(IS_PLAYER_IN_GAME, {
    variables: { id: userId },
    skip: !userId,
  });

  const [createPlayer] = useMutation(CREATE_PLAYER);

  useEffect(() => {
    if (errorIsPlayerInGame) {
      console.log('user game slot not found:', errorIsPlayerInGame);
      createPlayer({
        variables: {
          input: {
            userId: userId,
            positionX: 4,
            positionY: 200,
            waitingRoomId: 1,
          },
        },
      })
        .then((response) => {
          if (response?.data?.createPlayer) {
            console.log('user slot game created:', response.data.createPlayer);
            // updateWaitingRoom({
            //   variables: {
            //     id: 1,
            //     player: response.data.createPlayer,
            //   }
            //     })
            //     .then((res) =>{
            //         console.log('user has been added to the wainting List', res);
            //     })
            //     .catch ((error) => {
            //         console.log('Error adding player to the waintinglist');
            //     })

            // sessionStorage.setItem('player', JSON.stringify(response.data.createPlayer));
            // setPlayer(response.data.createPlayer);
          }
        })
        .catch((error) => {
          console.error('Error creating position player:', error);
        });
    }
  }, [errorIsPlayerInGame, createPlayer, userId, setPlayer]);

  useEffect(() => {
    if (dataIsPlayerInGame?.isPlayerInGame) {
      console.log('user game slot found:', dataIsPlayerInGame.isPlayerInGame);
      // sessionStorage.setItem('player', JSON.stringify(dataIsPlayerInGame.isPlayerInGame));
      // setPlayer(dataIsPlayerInGame.isPlayerInGame);
    }
  }, [dataIsPlayerInGame, setPlayer]);

  return null;
};