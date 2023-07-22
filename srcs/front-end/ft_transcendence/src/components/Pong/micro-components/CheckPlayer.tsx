import { FC } from 'react';
import { useMutation, useQuery,} from '@apollo/client';
import { Player } from '../../Interface';
import { CREATE_PLAYER } from '../graphql/Mutation';
import { IS_PLAYER_IN_GAME } from '../graphql/Query';

interface CheckPlayerProps {
  setPlayer: (player: Player | null) => void;
}


export const CheckPlayer: FC<CheckPlayerProps> = ({ setPlayer }) => {
  
    const userFromStorageString = sessionStorage.getItem('user');
    const userFromStorage = userFromStorageString ? JSON.parse(userFromStorageString) : null;
    
    const userId = userFromStorage?.id;
  
    const { data: dataIsPlayerInGame, error: ErrorIsplayerInGame } = useQuery(IS_PLAYER_IN_GAME, {
      variables: { id: userId },
      skip: !userId,
    });
  
    const [createPlayer] = useMutation(CREATE_PLAYER);

    // Si la requete IS_PLAYER_IN_GAME echoue , on créer le slot du joueur
      if (ErrorIsplayerInGame && userId) {
        console.log('user game slot not found :', ErrorIsplayerInGame)
        createPlayer({
          variables: {
            input: {
              userId: userId,
              positionX: 4,
              positionY: 200,
            },
          },
        })
          .then((response) => {
            if (response && response.data) {
              console.log('user slot game created :', response.data.createPlayer);
              sessionStorage.setItem('player', JSON.stringify(response.data.createPlayer));
              setPlayer(response.data.createPlayer);
            }
          })
          .catch((error) => {
            console.error('Error creating position player:', error);
          });
      }
    
    // On va check si le user a une game en cours 
      if (dataIsPlayerInGame && userId) {
        console.log('user game slot found :', dataIsPlayerInGame.isPlayerInGame)
        sessionStorage.setItem('player', JSON.stringify(dataIsPlayerInGame.isPlayerInGame));
        setPlayer(dataIsPlayerInGame.isPlayerInGame);
      }
    
    return null;
  };