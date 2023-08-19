import { useQuery } from "@apollo/client";
import { HISTORY_MATCH } from "./graphql/Query";

const LeaderBoard: React.FC = () => {
    const { loading, error, data } = useQuery(HISTORY_MATCH);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    
    const leaderBoard = data.historyMatch;
    console.log(leaderBoard);
  
    return (
      <div>
      </div>
    );
  };
  
  export default LeaderBoard;
  
  
  
  
  
  
