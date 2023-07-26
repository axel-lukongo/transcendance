import { FC, useEffect, useState } from 'react';
import {SubscriptionClient} from 'subscriptions-transport-ws';
import { useLazyQuery, useMutation, useQuery} from '@apollo/client';
import { OtherPlayer, Player } from '../../Interface';
import { CREATE_PLAYER, CREATE_PONG } from '../graphql/Mutation';
import {FIND_MY_OPPONENT, IS_PLAYER_IN_GAME, LIST_PLAYER_SUBCRIPTION } from '../graphql/Query';


const wsClient = new SubscriptionClient('ws://localhost:4000/graphql', {});



interface MatchMakingProps {
  player: Player | null;
  setPlayer: (player: Player | null) => void;
  setOtherPlayer: (player: OtherPlayer | null) => void;
}

export const MatchMaking: FC<MatchMakingProps> = ({ player, setPlayer, setOtherPlayer  }) => {

  const userFromStorageString = sessionStorage.getItem('user');
  const userFromStorage = userFromStorageString ? JSON.parse(userFromStorageString) : null;
  const userId = userFromStorage?.id;

  const { data: dataIsPlayerInGame, error: errorIsPlayerInGame } = useQuery(IS_PLAYER_IN_GAME, {
    variables: { id: userId },
    skip: !userId,
  });

  const [actif,setActif]= useState(false);

  const [createPlayer] = useMutation(CREATE_PLAYER);
  const [createPong] = useMutation(CREATE_PONG);
  const [findMyOpponent] = useLazyQuery(FIND_MY_OPPONENT);

  useEffect(() => {
    if (errorIsPlayerInGame) {
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
            console.log('Player created:', response.data.createPlayer);
            setPlayer(response.data.createPlayer);
          }
        })
        .catch((error) => {
          console.error('Error creating player:', error);
        });
    }
  }, [errorIsPlayerInGame, createPlayer, userId, setPlayer]);

  useEffect(() => {
    if (dataIsPlayerInGame?.isPlayerInGame) {
      setPlayer(dataIsPlayerInGame.isPlayerInGame);
      console.log('Player found:', dataIsPlayerInGame.isPlayerInGame);
    }
  }, [dataIsPlayerInGame, setPlayer]);

  useEffect(() => {
    if (player) {
      const subscription = wsClient.request({ query: LIST_PLAYER_SUBCRIPTION }).subscribe({
        next(response) {
          if (response.data) {
            const players = response.data.listPlayerSubscription;
            // const otherPlayer = players[1];
            if (Array.isArray(players) && players.length > 1) {
              setActif(true);
              createPong({
                variables: {
                  input: {
                    userId1: player.id,
                    userId2: players[1].id,
                  },
                },
              })
                .then((response) => {
                  console.log('Pong game created:', response.data);
                  setOtherPlayer(players[1]);
                })
                .catch((error) => {
                  console.error('Error creating Pong:', error);
                });
            }
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
  }, [player, createPong, setOtherPlayer, findMyOpponent]);

  useEffect(() => {
    if (actif === false && player)
    {
      console.log(actif);
      findMyOpponent({
        variables: {
          userId: player.id
        }
        })
          .then((response) => {
            console.log('Other Player found:', response.data);
            setOtherPlayer(response.data.findMyOpponent);
        })
          .catch((error) => {
          console.error('Error finding Pong:', error);
      });
    }
  }, [actif, player, setOtherPlayer, findMyOpponent]);

  
  return (
    <div>
      <p>Loading...</p>
    </div>
  )
};

  // findOpponent(response.data.createPlayer);

  // const findOpponent = (player : Player) => {
  //   const waitingRoomId = 1;

  //   const { data, error } = useQuery(SHOW_WAITING_LIST, {
  //     variables: { id: waitingRoomId },
  //   });

  //   if (error) {
  //     console.error('Error fetching waiting list:', error);
  //     return;
  //   }

  // }
// sessionStorage.setItem('player', JSON.stringify(dataIsPlayerInGame.isPlayerInGame));
// setPlayer(dataIsPlayerInGame.isPlayerInGame);