import { FC, useEffect } from 'react';
import {SubscriptionClient} from 'subscriptions-transport-ws';
import { useLazyQuery, useMutation, useQuery} from '@apollo/client';
import { OtherPlayer, Player } from '../../Interface';
import { CREATE_PLAYER, CREATE_PONG } from '../graphql/Mutation';
import {PLAYER_UPDATED_SUBSCRIPTION, FIND_PLAYER, LIST_PLAYER_SUBCRIPTION } from '../graphql/Query';


const wsClient = new SubscriptionClient('ws://localhost:4000/graphql', {});



interface MatchMakingProps {
  player: Player | null;
  otherPlayer: OtherPlayer | null;
  setPlayer: (player: Player | null) => void;
  setOtherPlayer: (player: OtherPlayer | null) => void;
}

export const MatchMaking: FC<MatchMakingProps> = ({ player, setPlayer, setOtherPlayer, otherPlayer  }) => {

  const userFromStorageString = sessionStorage.getItem('user');
  const userFromStorage = userFromStorageString ? JSON.parse(userFromStorageString) : null;
  const userId = userFromStorage?.id;

  const { data: dataIsPlayerInGame, error: errorIsPlayerInGame } = useQuery(FIND_PLAYER, {
    variables: { id: userId },
    skip: !userId,
  });

  const [createPlayer] = useMutation(CREATE_PLAYER);
  const [createPong] = useMutation(CREATE_PONG);
  const [findPlayer] = useLazyQuery(FIND_PLAYER);
  // const [findMyGame] = useLazyQuery(FIND_MY_GAME);

  useEffect(() => {
    if (errorIsPlayerInGame && !player) {
      createPlayer({
        variables: {
          input: {
            userId: userId,
            positionX: 10,
            positionY: 50,
            waitingRoomId: 1,  
          },
        },
      })
        .then((response) => {
          if (response?.data?.createPlayer) {
            console.log('Player created:', response.data.createPlayer);
            setPlayer(response.data.createPlayer);
            sessionStorage.setItem('player', JSON.stringify(response.data.createPlayer));
          }
        })
        .catch((error) => {
          console.error('Error creating player:', error);
        });
    }
  }, [errorIsPlayerInGame, createPlayer, userId, player, setPlayer]);

  useEffect(() => {
    if (dataIsPlayerInGame?.isPlayerInGame) {
      setPlayer(dataIsPlayerInGame.isPlayerInGame);
      sessionStorage.setItem('player', JSON.stringify(dataIsPlayerInGame.isPlayerInGame));
      console.log('Player found:', dataIsPlayerInGame.isPlayerInGame);
    }
  }, [dataIsPlayerInGame, player, setPlayer]);

  useEffect(() => {
    if (player) {
      const subscription = wsClient.request({ query: LIST_PLAYER_SUBCRIPTION }).subscribe({
        next(response) {
          if (response.data) {
            const players = response.data.listPlayerSubscription;
            if (Array.isArray(players) && players.length > 1) {
              createPong({
                variables: {
                  input: {
                    userId1: players[0].userId,
                    userId2: players[1].userId,
                    playerId1: players[0].id,
                    playerId2: players[1].id,
                  },
                },
              })
              .then((response) => {
                console.log('Pong game created:', response.data);
                setPlayer(response.data.createPong[0]);
                setOtherPlayer(response.data.createPong[1]);
                sessionStorage.setItem('player', JSON.stringify(response.data.createPong[0]));
                sessionStorage.setItem('otherPlayer', JSON.stringify(response.data.createPong[1]));
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
  }, [player, createPong, setOtherPlayer, setPlayer]);

  useEffect(() => {
    if (!otherPlayer) {
      const subscription = wsClient.request({ query: PLAYER_UPDATED_SUBSCRIPTION, variables: {id :player?.id} }).subscribe({
        next(response) {
          if (response.data) {
            const updatedPlayer: Player = response.data.playerUpdatedSubscription as Player;
            console.log('otherPlayer in ws:', updatedPlayer);
            sessionStorage.setItem('otherPlayer', JSON.stringify(updatedPlayer));
            setPlayer(updatedPlayer);
            findPlayer({
              variables: {
                id : updatedPlayer.opponentPlayerId
              }
            })
            .then((response) => {
              console.log('otherPlayer is set', response.data.findPlayer);
              setOtherPlayer(response.data.findPlayer);
              sessionStorage.setItem('otherPlayer', JSON.stringify(response.data.findPlayer));
            })
              .catch((error) => {
                console.error('Error seted otherPlayer:', error);
              });
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
  }, [player, otherPlayer, setOtherPlayer, findPlayer ]);
  
  return (
    <div>
      <p>Loading...</p>
    </div>
  )
};
