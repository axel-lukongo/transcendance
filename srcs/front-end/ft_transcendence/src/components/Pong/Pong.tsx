import { useState, FC} from "react";
import Map from "./micro-components/Map";
import Game from "./micro-components/Game";
import { Link, useLocation } from "react-router-dom";
import queryString from "query-string";

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
    console.log('friendId:', friendId);
  }

  return (
    <div>
      {pongMap === null ? ( 
        <Map setPongMap={setPongMap} />
      ) : ( 
        <Game pongMap={pongMap} friendId={friendId} />
      )}
      <Link to ='/'>
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
    </div>
  );
    
    
};
export default Pong;
      