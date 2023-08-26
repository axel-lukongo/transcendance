import { channel } from 'diagnostics_channel';
import { IHeaderProps } from '../../../interfaces/interfaces'
import { __ADD_USER__ } from "../../message";
import { __CHAN_PARAM__ } from "../../message";
import { channelfocus } from '../../../interfaces/interfaces';
import { User } from '../../../interfaces/interfaces';
import PongInvite from '../buttons/PongInvite';
import CreateMsg from '../forms/createMessage';
import { useState } from 'react';

export interface theprops {
	user: User,
	chanel_focus: channelfocus;
	handleChatBox: (switch_id: number) => void;

}

// type channelfocus = {
// 	id: string,
// 	chanel_name: string,
// 	chanel_size: string,
// 	max_users: string,
// 	logo: string,
// }

export default function HeaderChanel({chanel_focus, user,  handleChatBox}: theprops) {

	const [playClicked, setPlayClicked] = useState(false);

	const handelClick = () => {
		handleChatBox(__ADD_USER__);
	}
	
	const handleChanParam = () => {
		handleChatBox(__CHAN_PARAM__);
	}


	const handle_create_msg = () => {
		console.log("create");
		setPlayClicked(true); // Active le drapeau pour afficher CreateMsg
	  };
	


	if(chanel_focus.directMsg === true){
		chanel_focus.chanel_name = user.id === (+chanel_focus.owner_id)? chanel_focus.interlocutor_name:user.nickname
		chanel_focus.logo = user.id === (+chanel_focus.owner_id)? chanel_focus.interlocutor_avatar: user.avatar
	}
    return (
        <div className="chat-header">
            <div className="row">
                {
                    chanel_focus.id !== "" ? 
                    <div className="col-lg-6">
                        <img src={chanel_focus.logo} alt="avatar" />
                        <div className="chat-about">
                            <h6 className="m-b-0"> {chanel_focus.chanel_name} </h6>
                        </div>
                    </div>: null
                }
                <div className='btn-on-header'>
                    {chanel_focus.id !== "" && chanel_focus.directMsg !== true ? <button className='add-user-in-chan' onClick={handelClick}></button> : null}
                    { chanel_focus.id !== "" && chanel_focus.directMsg !== true ? <button className='parametre-of-chan' onClick={handleChanParam}></button> : null}
                </div> {/* btn pour l'ajout de users dans un chanel */}
            </div>
            <PongInvite friendId={+chanel_focus.id}/>
			{playClicked ? <CreateMsg chan={chanel_focus} secondProp={"je t'invite a jouer"} /> : null}
      		<button onClick={handle_create_msg}> play </button>
	    </div>
    );
}