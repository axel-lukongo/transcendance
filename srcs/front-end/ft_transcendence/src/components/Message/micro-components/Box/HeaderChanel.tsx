import { Chanel } from '../../../interfaces/interfaces'
import { __ADD_USER__ } from "../../message";
import { __CHAN_PARAM__ } from "../../message";
import { channelfocus } from '../../../interfaces/interfaces';
import { User } from '../../../interfaces/interfaces';
import CreateMsg from '../forms/createMessage';
import { useState } from 'react';
import { DELETE_CHANEL_USER_MUTATION } from '../../graphql/Mutation';
import { useMutation } from '@apollo/client';

import playImg from "/ft_transcendence/src/image/play_btn.png"
import addUserImg from "/ft_transcendence/src/image/add-user.png"
import settingImg from "/ft_transcendence/src/image/settings_btn.png"
import leaveImg from "/ft_transcendence/src/image/exit_icon.svg"


export interface theprops {
	user: User,
	chanel_focus: channelfocus;
	handleChatBox: (switch_id: number) => void;
	handlechanelfocus: (element: Chanel) => void;
	handleChanelRefetch: () => void;

}

// type channelfocus = {
// 	id: string,
// 	chanel_name: string,
// 	chanel_size: string,
// 	max_users: string,
// 	logo: string,
// }

export default function HeaderChanel({chanel_focus, user,  handleChatBox, handlechanelfocus, handleChanelRefetch}: theprops) {

	const [playClicked, setPlayClicked] = useState(false);
	const [KickOfChan] = useMutation(DELETE_CHANEL_USER_MUTATION);

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
	
	  const handlekick = () => {
		KickOfChan({
			variables: {
			  key: {
				user_id: user.id,
				chanel_id: +chanel_focus.id,
				pending: false,
				is_admin: false,
				is_muted: false,
				mute_start_time: 0,
			},
			},
		  }).then((result) => {

			console.log(result.data.updateChanelUser);
			handleChanelRefetch();
			handlechanelfocus ( {
				id: 0,
				chanel_name: "",
				chanel_size: 0,
				max_users: 0,
				logo: "",
				owner_id: 0,
				directMsg: false,
				interlocutor_id: 0,
				interlocutor_name: "",
				interlocutor_avatar: "",
			})
		  }).catch(() => {
			console.log("action denied ",);
		});


	  }

	if(chanel_focus.directMsg === true){
		chanel_focus.chanel_name = user.id === (+chanel_focus.owner_id)? chanel_focus.interlocutor_name:chanel_focus.chanel_name
		chanel_focus.logo = user.id === (+chanel_focus.owner_id)? chanel_focus.interlocutor_avatar: chanel_focus.logo
	}
    return (
        <div className="chat-header">
            <div className="row">
                {
                   (chanel_focus.id !== "" && chanel_focus.id !== "0") ? 
                    <div className="col-lg-6">
                        <img src={chanel_focus.logo} alt="avatar" />
                        <div className="chat-about">
                            <h4 className="m-b-0"> {chanel_focus.chanel_name} </h4>
                        </div>
                    </div>: null
                }
                <div className="icon-container">
					<div className='param-chan-button '>
                    	{(chanel_focus.id !== "" && chanel_focus.id !== "0") && chanel_focus.directMsg !== true ? 
							<button title='add User' className='icon-button' onClick={handelClick}>
								<img src={addUserImg} alt="add user" />
							</button> 
							: 
							null
						}
                    	{(chanel_focus.id !== "" && chanel_focus.id !== "0") && chanel_focus.directMsg !== true ? 
							<button className='icon-button' title='setting' onClick={handleChanParam}>
								<img src={settingImg} alt="setting" />
							</button> 
							: 
							null
						}
                    	{(chanel_focus.id !== "" && chanel_focus.id !== "0") && chanel_focus.directMsg !== true ? 
							<button title='leave channel' className='icon-button'  onClick={handlekick}>
								<img src={leaveImg} alt="leave" />
							</button> 
							:
							null
						}
                	</div>
				</div>
            </div>
			{playClicked ? <CreateMsg chan={chanel_focus} secondProp={" "} /> : null}
      		{chanel_focus.directMsg === true ? 
			<div className="icon-container">
				<button className='icon-button play-btn' onClick={handle_create_msg}>
				<img src={playImg} alt="play" />
				</button>
			</div>
			: 
			null
			}
	    </div>
    );
}