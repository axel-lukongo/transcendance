import { FC, useEffect, useState } from 'react';
import { Player, PongI, User, Ball } from '../interfaces/interfaces';
import { useLazyQuery } from '@apollo/client';



const Pong: FC = () => {

  const userFromStorageString = sessionStorage.getItem('user');
  let userFromStorage: User | null = null;
  if (userFromStorageString && userFromStorageString !== 'undefined')
    userFromStorage = JSON.parse(userFromStorageString);

    const [player, setPlayer] = useState<Player | null>(null);
    const [otherPlayer, setOtherPlayer] =useState<Player | null>(null);
  
    const [playerScore, setPlayerScore] = useState<number | undefined>(0);
    const [otherPlayerScore, setOtherPlayerScore] = useState<number | undefined>(0);

    const [victory, setVictory] = useState<boolean | null>(null);
    const [ball, setBall]= useState<Ball | null>(null);


  const [findPlayer] = useLazyQuery(FIND_PLAYER);
  const [findPong] = useLazyQuery(FIND_PONG);

  useEffect(() => {
    if (userFromStorage) {
      findPlayer({ // QUERY TO FIND OUR PLAYER
        variables: {
          id: userFromStorage.id
        }
      })
      .then((playerResponse) => {
        const player_res: Player = playerResponse.data.findPlayer;
        if (player_res)
        {
          setPlayer(player_res); 
          findPlayer({    // WE FOUND OUR PLAYER, NOW WE CHECK IF AN OTHER PLAYER EXIST
            variables: {
              id: player?.opponentPlayerId
            }
          })
          .then((otherPlayerResponse) => {
            const otherplayer_res : Player = otherPlayerResponse.data.findPlayer;
            if (otherplayer_res)
            {
              setOtherPlayer(otherplayer_res); 

              findBall({  //IF THE OTHER PLAYER FOUND NOW WE FOUND OUR BALL
                variables: {
                  id: player?.ballId
                }
              })
              .then((ballResponse) => {
                const ball_res : Ball = ballResponse.data.findball;
                if (ball_res)
                {
                  setBall(ball_res); 
                }
              })
              .catch((ballError) => {
                console.error('Error fetching Pong:', ballError);
              });

              findPong({  //IF THE OTHER PLAYER FOUND NOW WE FOUND OUR PONG GAME
                variables: {
                  id: player?.pongId
                }
              })
              .then((pongResponse) => {
                const pong_res : PongI = pongResponse.data.findPong;
                if (pong_res)
                {
                  if (pong_res.userId1 == player?.userId)  // SET THE SCORE
                  {
                    setPlayerScore(pong_res.scoreUser1);
                    setOtherPlayerScore(pong_res.scoreUser2);
                  }
                  else
                  {
                    setPlayerScore(pong_res.scoreUser2);
                    setOtherPlayerScore(pong_res.scoreUser1);
                  }
                  if(pong_res.loserId || pong_res.winnerId) //SET THE VICTORY IF WINNERID AND LOSERID IS SET
                  {
                    if (pong_res.winnerId == player?.userId)
                      setVictory(true);
                    else
                      setVictory(false);
                  }
                }
              })
              .catch((pongError) => {
                console.error('Error fetching Pong:', pongError);
              });
            }
          })
          .catch((otherPlayerError) => {
            console.error('Error fetching otherPlayer player:', otherPlayerError);
          });
        }
      })
      .catch((error) => {
        console.error('Error fetching player:', error);
      });
    }
  }, []);  

  return (
    <div>
      {player && otherPlayer ?(
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

