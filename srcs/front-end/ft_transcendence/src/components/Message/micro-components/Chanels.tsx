import ListChanel from './requests/ListChanel';
import {IPrivateMessageProps} from '../../interfaces/interfaces'



export default function Chanels(props: IPrivateMessageProps) {


	/* //////////////////////////////////////////////////////// */
	/* JSX.Element return */

	return (
		<ListChanel 
			user={props.user}
			private_chan={props.private_chan}
			refetchChanels={props.refetchChanel}
			handleChanelRefetch={props.handleChanelRefetch}
			handleChatBox={props.handleChatBox}
			handleChanelFocus={props.handleChanelFocus}
		/>
	);

}