import { useState, FC} from "react";
import Map from "./micro-components/Map";
import Game from "./micro-components/Game";
import { Link } from "react-router-dom";

const Pong: FC = () => {

  const [pongMap, setPongMap] = useState<string | null>(sessionStorage.getItem('playerMap'));

  return (
    <div>
      {pongMap === null ? ( 
        <Map setPongMap={setPongMap} />
      ) : ( 
        <Game pongMap={pongMap} />
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
      