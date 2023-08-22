import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { ILeaderBoard } from "../interfaces/interfaces";
import './css/LeaderBoard.css'

import trophyImg from "/ft_transcendence/src/image/trophy.png";
import bronzeMedal from '/ft_transcendence/src/image/bronze_medal.png';
import silverMedal from '/ft_transcendence/src/image/silver_medal.png';
import goldMedal from '/ft_transcendence/src/image/gold_medal.png';
import { Link } from "react-router-dom"; 
import { LEADERBOARD } from "./graphql/Query";



const LeaderBoard: React.FC = () => {
  const { loading, error, data, refetch } = useQuery(LEADERBOARD);

  useEffect(() => {
    refetch();
  }, );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const leaderBoard: ILeaderBoard[] = data.leaderBoard;


  // ...
  
  return (
    <div>
      <Link to="/">
        <button className='log-out-button logo-box'></button>
      </Link>
      <Link to="/">
        <button className='home-button logo-box'></button>
      </Link>
      <Link to="/leaderBoard">
        <button className='leader-board-button logo-box'></button>
      </Link>
      <Link to="/message">
        <button className='message-button logo-box'></button>
      </Link>
      <Link to="/contact">
        <button className='contact-button logo-box'></button>
      </Link>
  
      <div className="screen-box-leader-board">
        <h1>Leaderboard</h1>
        <img src={trophyImg} alt="Trophy " />
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Grade</th>
                <th>Nickname</th>
                <th>Level</th>
                <th>Rank</th>
              </tr>
            </thead>
            <tbody>
              {leaderBoard.map((entry) => (
                <tr key={entry.nickname} style={{ backgroundColor: entry.grade === 1 ? 'rgba(255, 247, 0, 0.376)' : entry.grade === 2 ? 'rgba(192, 192, 192, 0.676)' : entry.grade === 3 ? 'rgba(215, 153 , 91, 0.476)' : 'transparent' }}>
                  <td>{entry.grade}</td>
                  <td>{entry.nickname}</td>
                  <td>{entry.level}</td>
                  <td>
                    {entry.rank === "Bronze" && <img src={bronzeMedal} alt="Bronze Medal" style={{ width: '25%' }} />}
                    {entry.rank === "Silver" && <img src={silverMedal} alt="Silver Medal" style={{ width: '25%' }} />}
                    {entry.rank === "Gold" && <img src={goldMedal} alt="Gold Medal" style={{ width: '15%' }} />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
  
}
  
  export default LeaderBoard;
  
  
  
  
  
  
