import React, { useState } from "react"
import FriendsRequest from "./micro-components/FriendsRequest"
import ListContact from "./micro-components/ListContact";
import AddContact from "./micro-components/AddContact";
import './css/Contact.css'
import { MyBlockedList } from "./micro-components/ListBlocked";
import { Link } from "react-router-dom";
export default function Contact() {

    const user = JSON.parse(sessionStorage.getItem('user') || "");

    /* //////////////////////////////////////////////////////// */
    /* States */

	const [refetchProp, setRefetch] = useState(false);

    const [swap, setSwap] = useState(true);

	const [showBlockedPlayers, setShowBlockedPlayers] = useState(false);

    /* //////////////////////////////////////////////////////// */
    /* Handlers */

    
	const handleRefetch = () => {
		setRefetch(prevValue => !prevValue);
	}

    const handleSwap = () => {
        setSwap(prevValue => !prevValue);
    }

	const handleShowBlockedPlayers = () => {
		setShowBlockedPlayers(prevValue => !prevValue);
	  }

    /* //////////////////////////////////////////////////////// */
    /* JSX.Element return */
    
	return (
    <div>
        <Link to="/">
        <button className='home-button logo-box'></button>
      </Link>
	<div className="Contact_pad">
			<React.Fragment>
				<div className="box_request">
                    <div className="title">
                        <h2 id="Contact_labels">Friends request</h2>
                    </div>
					<FriendsRequest 
						refetchContact={handleRefetch}
						refetchProps={refetchProp}
                        user={user}
                        />
				</div>
					{/* Nouveau bouton pour afficher la liste des joueurs bloqués */}
					{/* <button id="showBlockedPlayers_btn" onClick={handleShowBlockedPlayers}>
					player blocked
				</button> */}

				{/* Affichage conditionnel de la liste des joueurs bloqués */}
				
                {swap ?
                    <div className="box_ListContact">
                        <div className="title">
                            <h2 id="Contact_labels">Friends list</h2>
                            <button id="addContact_btn" onClick={handleSwap}></button>
							<button className="blocked_btn" id="listContact-block-btn" onClick={handleShowBlockedPlayers}>
							
							</button>
                        </div>
						{showBlockedPlayers && (
							<MyBlockedList/>
						)} 
                        <ListContact 
                            refetchContact={handleRefetch}
                            refetchProps={refetchProp}
                            user={user}
                            setSwap={handleSwap}
                            />
                    </div> : 
                    <div className="box_ListContact">
                        <div className="title">
                            <h2 id="Contact_labels">Add Friends</h2>
                                <button id="listContact_btn" onClick={handleSwap}></button>
                        </div>
                        <AddContact 
                            refetchContact={handleRefetch}
                            refetchProps={refetchProp}
                            user={user}
                            setSwap={handleSwap}
                            />
                    </div>
					// je vais rajouter les ban ici
					
                }
			
			</React.Fragment>
        </div>
	</div>);
}