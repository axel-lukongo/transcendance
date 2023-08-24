import { useQuery } from "@apollo/client";
import { MY_MATCH_STATS } from "../graphl/Query";
import { useEffect,  } from "react";
import { IUserStat,  } from "../../interfaces/interfaces";

import gradeImg from "/ft_transcendence/src/image/grade_icon.svg"
import levelImg from "/ft_transcendence/src/image/level_icon.svg"
import rankImg from "/ft_transcendence/src/image/rank_icon.svg"
import winImg from "/ft_transcendence/src/image/win_icon.svg"
import defeatImg from "/ft_transcendence/src/image/defeat_icon.svg"
import ratioImg from "/ft_transcendence/src/image/ratio_icon.svg"


const MatchStatistic: React.FC = () => {


  const { loading, error, data, refetch } = useQuery(MY_MATCH_STATS, {});

  useEffect(() => {
    refetch();
  }, );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const userStat: IUserStat | null = data.myMatchStatistic;

  if (!userStat) {
    return <p>User not found.</p>;
  }

  return (
  <div className="stat-box-container">
    <div className="stat-item">
      <img src={gradeImg} alt="Grade" />
      <p>{userStat.grade}</p>
      <hr />
      <p>GRADE</p>
    </div>
     <div className="stat-item">
      <img src={levelImg} alt="Level" />
      <p>{userStat.level}</p>
      <hr />
      <p>LEVEL</p>
    </div>
    <div className="stat-item">
    <img src={rankImg} alt="rank" />
      <p> {userStat.rank}  </p>
      <hr />
      <p>RANK</p>
    </div>
    <div className="stat-item">
      <img src={winImg} alt="Wins" />
      <p>{userStat.wins}</p>
      <hr />
      <p>WINS</p>
    </div>
    <div className="stat-item">
      <img src={defeatImg} alt="Defeats" />
      <p>{userStat.defeats}</p>
      <hr />
      <p>DEFEATS</p>
    </div>
    <div className="stat-item">
      <img src={ratioImg} alt="Ratio" />
      <p>{userStat.ratio.toFixed(2)}</p>
      <hr />
      <p>RATIO</p>
    </div> 
  </div>

  );
};

export default MatchStatistic ;
