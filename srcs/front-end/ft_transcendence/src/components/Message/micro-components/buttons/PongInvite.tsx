import { FC, useState } from "react";
import Pong from "../../../Pong/Pong";

interface PongInviteProps {
  friendId: number; // Assurez-vous d'utiliser le bon type pour friendId
}

const PongInvite: FC<PongInviteProps> = ({ friendId }) => {
  const [isInvited, setIsInvited] = useState(false);


  const handleInviteClick = () => {
    if (!isInvited) {
        setIsInvited(true);
    }
  };

  return (
    <div>
      {isInvited ? (
        <Pong friendId={friendId} /> 
      ) : (
        <button className="invite-button" onClick={handleInviteClick} disabled={isInvited}>
          {isInvited ? "INVITED" : "INVITE TO PLAY"}
        </button>
      )}
    </div>
  );
}


export default PongInvite;

