import { useState, FC} from "react";
import Map from "./micro-components/Map";
import Game from "./micro-components/Game";

const Pong: FC = () => {

  const [pongMap, setPongMap] = useState<string | null>(null);

  return (
    <div>
      {pongMap === null ? ( 
        <Map setPongMap={setPongMap} />
      ) : ( 
        <Game pongMap={pongMap} />
      )}
    </div>
  );
    
    
};
export default Pong;
      