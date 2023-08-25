import { useQuery } from "@apollo/client";
import { User, PongI } from "../../interfaces/interfaces";
import { MY_MATCH_HISTORY } from "../graphl/Query";

const HistoryMatch = () => {
  const userFromStorageString = sessionStorage.getItem('user');
  let userFromStorage: User | null = null;
  if (userFromStorageString && userFromStorageString !== 'undefined')
    userFromStorage = JSON.parse(userFromStorageString);

  const { data } = useQuery(MY_MATCH_HISTORY, {
    variables: {
      userId: userFromStorage?.id,
    },
  });

  if (data && data.myMatchHistory) {
    const historyMatches: PongI[] = data.myMatchHistory;

    return (
      <div>
        {historyMatches.map((match, index) => {
          const isUser1 = match.user1?.nickname === userFromStorage?.nickname;
          const myScore = isUser1 ? match.scoreUser1 : match.scoreUser2;
          const opponentScore = isUser1 ? match.scoreUser2 : match.scoreUser1;
          const opponentNickname = isUser1 ? match.user2?.nickname : match.user1?.nickname;
          const isWinner = match.winnerId === userFromStorage?.id;

          return (
            <div className="history-match-container" key={index}>
              <div className="history-match-item">
                <p>{userFromStorage?.nickname} {myScore}-{opponentScore} {opponentNickname} : {isWinner ? "🏆" : "😓"} </p>
                {/* <hr /> */}
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
