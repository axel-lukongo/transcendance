import React, { useState,} from "react"
import FriendsRequest from "./micro-components/FriendsRequest"
import ListContact from "./micro-components/ListContact";
import AddContact from "./micro-components/AddContact";
import './css/Contact.css'


export default function Contact() {

    const user = JSON.parse(sessionStorage.getItem('user') || "");

    /* //////////////////////////////////////////////////////// */
    /* States */

	const [refetchProp, setRefetch] = useState(false);

    const [swap, setSwap] = useState(true);

    /* //////////////////////////////////////////////////////// */
    /* Handlers */

	const handleRefetch = () => {
		setRefetch(prevValue => !prevValue);
	}

    const handleSwap = () => {
        setSwap(prevValue => !prevValue);
    }

    /* //////////////////////////////////////////////////////// */
    /* JSX.Element return */
    
	return (
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
                {swap ?
                    <div className="box_ListContact">
                        <div className="title">
                            <h2 id="Contact_labels">Friends list</h2>
                            <button id="addContact_btn" onClick={handleSwap}></button>
                        </div>
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
	</div>);
}