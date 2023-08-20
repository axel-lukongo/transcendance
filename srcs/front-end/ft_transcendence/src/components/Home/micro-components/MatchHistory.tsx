import { useQuery } from "@apollo/client";
import { User, PongI } from "../../interfaces/interfaces";
import { MY_MATCH_HISTORY } from "../graphl/Query";
import { useEffect } from "react";

interface PropsHistoryMatch {
  user: User
}


const HistoryMatch: React.FC<PropsHistoryMatch> =({user}) => {


  const { data, refetch } = useQuery(MY_MATCH_HISTORY, {
    variables: {
      userId: user.id
    },
  });

  useEffect(() => {
    refetch();
  }, );


  if (data && data.myHistoryMatch) {
    const historyMatches: PongI[] = data.myHistoryMatch;

    return (
      <div>
        {historyMatches.map((match, index) => {
          const isUser1 = match.user1?.nickname === user?.nickname;
          const myScore = isUser1 ? match.scoreUser1 : match.scoreUser2;
          const opponentScore = isUser1 ? match.scoreUser2 : match.scoreUser1;
          const opponentNickname = isUser1 ? match.user2?.nickname : match.user1?.nickname;
          const isWinner = match.winnerId === user?.id;

          return (
            <div className="history-match-container" key={index}>
              <div className="history-match-item">
                <p>{user?.nickname} {myScore}-{opponentScore} {opponentNickname} : {isWinner ? "🏆" : "😓"} </p>
                <hr />
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return null;
};
export default HistoryMatch;
