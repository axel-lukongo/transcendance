import React, { useState, useEffect } from "react"
import FriendsRequest from "./micro-components/FriendsRequest"
import ListContact from "./micro-components/ListContact";
import AddContact from "./micro-components/AddContact";
import './css/Contact.css'


const Contact = () => {

	const [refetchProp, setRefetch] = useState(false);

    const [swap, setSwap] = useState(true);

	const handleRefetch = () => {
		setRefetch(prevValue => !prevValue);
	}

    const handleSwap = () => {
        setSwap(prevValue => !prevValue);
    }

    const user = JSON.parse(sessionStorage.getItem('user') || "");

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
                }
			</React.Fragment>
	</div>);
}

export default Contact;