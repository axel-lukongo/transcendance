import { useState, FC} from "react";
import Map from "./micro-components/Map";
import Game from "./micro-components/Game";
import {useLocation } from "react-router-dom";
import queryString from "query-string";
import NavBar from "../../NavBar";

const Pong: FC = () => {

  const [pongMap, setPongMap] = useState<string | null>(sessionStorage.getItem('playerMap'));

  const location = useLocation();
  const queryParams = queryString.parse(location.search);

  // Convertissez la prop friendId en int si elle n'est pas null
  let friendId = undefined; // Valeur par défaut en cas de problème de conversion

  if (queryParams.friendId) {
    if (typeof queryParams.friendId === "string") {
      friendId = parseInt(queryParams.friendId, 10);
    }
  }

  return (
    <div>
      <NavBar/>
      {pongMap === null ? ( 
        <Map setPongMap={setPongMap} />
      ) : ( 
        <Game pongMap={pongMap} friendId={friendId} />
      )}
    </div>
  );
    
    
};
export default Pong;
      