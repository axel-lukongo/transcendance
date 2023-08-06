import { FC, useEffect, useState } from 'react';
import { Display } from './micro-components/Display';
import { MatchMaking } from './micro-components/MatchMaking';
import { Player, User, Ball } from '../interfaces/interfaces';
import { useLazyQuery /*, useMutation */} from '@apollo/client';
import { FIND_PLAYER, FIND_BALL, FIND_PONG} from './graphql/Query';
// import { REMOVE_BALL, REMOVE_PLAYER, STOP_PONG, UPDATE_PONG } from './graphql/Mutation';



const Pong: FC = () => {

  const userFromStorageString = sessionStorage.getItem('user');
  let userFromStorage: User | null = null;
  if (userFromStorageString && userFromStorageString !== 'undefined')
    userFromStorage = JSON.parse(userFromStorageString);

  const [player, setPlayer] = useState<Player | null>(null);
  const [otherPlayer, setOtherPlayer] = useState<Player | null>(null);
  const [ball, setBall]= useState<Ball | null>(null); 
  const [victory, setVictory] = useState<boolean | null>(null);
  const [playerScore, setPlayerScore] = useState<number | undefined>(undefined);
  const [otherPlayerScore, setOtherPlayerScore] = useState<number | undefined>(undefined);
  const level = userFromStorage?.level;


  const [findPlayer] = useLazyQuery(FIND_PLAYER);
  const [findPong] = useLazyQuery(FIND_PONG);
  const [findBall] = useLazyQuery(FIND_BALL);
  // const [stopPong] = useMutation(STOP_PONG);
  // const [removeBall] = useMutation(REMOVE_BALL);
  // const [removePlayer] = useMutation(REMOVE_PLAYER);
  // const [updatePong] = useMutation(UPDATE_PONG);


  useEffect(() => {
    if (userFromStorage ) {
      findPlayer({ // QUERY TO FIND OUR PLAYER
        variables: {
          id: userFromStorage.id
        }
      })
      .then((playerResponse) => {
        if (playerResponse.data && playerResponse.data.findPlayer) {
          setPlayer(playerResponse.data.findPlayer); 
        }
      })
      .catch((error) => {
        console.error('Error fetching player:', error);
      });
    }
  }, []); 

  useEffect(() => {
    if (player  && player.opponentPlayerId !== 0 && !otherPlayer) {
      findPlayer({
        variables: {
          id: player.opponentPlayerId
        }
      })
      .then((otherPlayerResponse) => {
        if (otherPlayerResponse.data && otherPlayerResponse.data.findPlayer) {
          setOtherPlayer(otherPlayerResponse.data.findPlayer);
          // FIND BALL
          findBall({  
            variables: {
              id: player?.ballId
            }
          })
          .then((ballResponse) => {
            if (ballResponse.data && ballResponse.data.findBall) {
              setBall(ballResponse.data.findBall);
            }
          })
          .catch((ballError) => {
            console.error('Error fetching Ball:', ballError);
          });
        
          // FIND PONG
          findPong({  
            variables: {
              id: player?.pongId
            }
          })
          .then((pongResponse) => {
            if (pongResponse.data && pongResponse.data.findPong) {
              const pong  = pongResponse.data.findPong;
              if (pong.userId1 === player?.userId) { 
                setPlayerScore(pong.scoreUser1);
                setOtherPlayerScore(pong.scoreUser2);
              } 
              else {
                setPlayerScore(pong.scoreUser2);
                setOtherPlayerScore(pong.scoreUser1);
              }
              if (pong.loserId || pong.winnerId) {
                if (pong.winnerId === player?.userId) { 
                  setVictory(true);
                } 
                else {
                  setVictory(false);
                }
              }
            }
          })
          .catch((pongError) => {
            console.error('Error fetching Pong:', pongError);
          });
        }
        })
      .catch((otherPlayerError) => {
          console.error('Error fetching otherPlayer :', otherPlayerError);
      })
    }
  }, [player, otherPlayer, findPlayer, findBall, findPong])

  // useEffect(() => {
  //   return (()=> {
  //     if (player)
  //     {
  //       if (otherPlayer)
  //       {
  //         if (victory !== null) // NORMAL EXIT
  //         {
  //           if (player.host === true)
  //           {
  //             removeBall({
  //               variables: {
  //                 id : player.ballId
  //               }
  //             })
  //             .then((response) => {
  //               console.log('Ball instance was deleted:', response.data.removeBall);
  //             })
  //             .catch((error) => {
  //               console.error('Error deleting ball instance:', error);
  //             });
  //           }
  //         }
  //         else // INTERUPTION ANORMAL
  //         {
  //           stopPong();
  //           const updateDataPong = {
  //             id: player.pongId,
  //             scoreUser1 : player.host ? 0 : 5,
  //             scoreUser2: player.host ? 5 : 0,
  //             winnerId: otherPlayer.userId,
  //             loserId: player.id,
  //           }
  //           updatePong({
  //             variables: {
  //               input : updateDataPong
  //             }
  //           })
  //           .then((response) => {
  //             console.log('pong instance was updated:', response.data.updatePong);
  //           })
  //           .catch((error) => {
  //             console.error('Error updating pong instance:', error);
  //           });
  //         }
  //       }
  //       removePlayer({
  //         variables: {
  //             id : player.id
  //           }
  //         })
  //       .then((response) => {
  //          console.log('Playe instance was deleted:', response.data.removePlayer);
  //       })
  //       .catch((error) => {
  //          console.error('Error deleting player instance:', error);
  //       });
  //     }
  //   })
  // },[])

  return (
    <div>
      { player && otherPlayer  ?(
        <Display
          player={player}
          otherPlayer={otherPlayer}
          ball={ball}
          level={level || 1}
          playerScore={playerScore}
          otherPlayerScore={otherPlayerScore}
          victory={victory}
          setPlayer={setPlayer}
          setOtherPlayer={setOtherPlayer}
          setBall={setBall}
          setPlayerScore={setPlayerScore}
          setOtherPlayerScore={setOtherPlayerScore}
          setVictory={setVictory}
        />
      ) : (
        <MatchMaking
          player={player}
          otherPlayer={otherPlayer}
          setPlayer={setPlayer}
          setOtherPlayer={setOtherPlayer}
          id={userFromStorage?.id}
        />
      )}
    </div>
  );
};
export default Pong;

