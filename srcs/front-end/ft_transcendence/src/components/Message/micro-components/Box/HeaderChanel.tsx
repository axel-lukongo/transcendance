import { IHeaderProps } from '../../../interfaces/interfaces'
import { __ADD_USER__ } from "../../message";
import { __CHAN_PARAM__ } from "../../message";


export default function HeaderChanel({chanel_focus, user, is_chanel, handleChatBox}: IHeaderProps) {

	const handelClick = () => {
		handleChatBox(__ADD_USER__);
	}
	
	const handleChanParam = () => {
		handleChatBox(__CHAN_PARAM__);
	}

	return (
		<div className="chat-header">
			<div className="row">
				<div className="">
				{/* <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info"> */}
				<img src={ 'logo' in chanel_focus ? chanel_focus.logo : chanel_focus.avatar } alt="avatar" />{/**afficher avatar */}
				{/* </a> */}
				{/* ici on affichera un point vers si le user est connecter ou sinon vert si il est connecter*/ }
				<div className="chat-about">
					<h6 className=""> {'chanel_name' in chanel_focus ?  chanel_focus.chanel_name : chanel_focus.nickname} </h6>
				</div>
				<div>{chanel_focus.id !== "" ? <button onClick={handelClick}>++</button> : null}</div> {/* btn pour l'ajout de users dans un chanel */}
				</div>
				<div>
					<button onClick={handleChanParam}> parametre </button>
				</div>
			</div>
		</div>
	);
}