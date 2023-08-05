import { FC, useEffect, useState } from 'react';
import { Display } from './micro-components/Display';
import { MatchMaking } from './micro-components/MatchMaking';
import { Player, User, Ball } from '../interfaces/interfaces';
import { useLazyQuery } from '@apollo/client';
import { FIND_PLAYER, FIND_BALL, FIND_PONG} from './graphql/Query';



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
      });
    }
  }, [player, otherPlayer, findPlayer, findBall, findPong])


  return (
    <div>
      {player && otherPlayer && ball && playerScore !== undefined && otherPlayerScore !== undefined ?(
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

