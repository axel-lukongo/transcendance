import { channel } from 'diagnostics_channel';
import { IHeaderProps } from '../../../interfaces/interfaces'
import { __ADD_USER__ } from "../../message";
import { __CHAN_PARAM__ } from "../../message";


export default function HeaderChanel({chanel_focus, user, is_chanel, handleChatBox}: IHeaderProps) {

	const handelClick = () => {
		console.log("dev log | in add user in chanel ");
		handleChatBox(__ADD_USER__);
	}
	
	const handleChanParam = () => {
		console.log("param of channel");
		handleChatBox(__CHAN_PARAM__);
	}


	
	if(chanel_focus.directMsg === true){
		chanel_focus.chanel_name = user.id === (+chanel_focus.owner_id)? chanel_focus.interlocutor.nickname:chanel_focus.chanel_name
		chanel_focus.logo = user.id === (+chanel_focus.owner_id)? chanel_focus.interlocutor.avatar: chanel_focus.logo
	}

	return (
		<div className="chat-header">
			<div className="row">
				<div className="col-lg-6">
					<img src={chanel_focus.logo} alt="avatar" />{/**afficher avatar */}
					<div className="chat-about">
						<h6 className="m-b-0"> {chanel_focus.chanel_name} </h6>
					</div>
				</div>
				
				<div className='btn-on-header'>
					{chanel_focus.id !== "" && chanel_focus.directMsg !== true ? <button className='add-user-in-chan' onClick={handelClick}></button> : null}
					{ chanel_focus.id !== "" && chanel_focus.directMsg !== true ? <button className='parametre-of-chan' onClick={handleChanParam}></button> : null}
				</div> {/* btn pour l'ajout de users dans un chanel */}
			</div>
		</div>
	);
}