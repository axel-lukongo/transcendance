import {useEffect, useState, useContext} from 'react';
import CreateMsg from './forms/createMessage'
import ChatBox from './requests/ChatBox';
import ListChanel from './requests/ListChanel';
import HeaderChanel from './Box/HeaderChanel';
import CreateChanelForm from './forms/CreateChanelForm';
import {IPrivateMessageProps} from '../../interfaces/interfaces'


export default function Chanels(props: IPrivateMessageProps) {

	/* //////////////////////////////////////////////////////// */
	/* States */

	const [addChanel, setAddChanel] = useState(false);

	/* //////////////////////////////////////////////////////// */
	/* Handlers */

	const handleAddChanel = () => {
		setAddChanel(prevValue => !prevValue);
	}
	
	/* //////////////////////////////////////////////////////// */
	/* Use Effect */

	useEffect(() => {
		props.handleChanelRefetch();
	}, [props.refetchChanel])
	
	/* //////////////////////////////////////////////////////// */
	/* Switch */

	const renderSwitchAddChanel = (addChanel: boolean) => {
		switch(addChanel) {
			case true: {
				return (
					<div className='chat'>
						<HeaderChanel />
						<div className='chat-history'>
							<CreateChanelForm
								user={props.user}
								handleChanelRefetch={props.handleChanelRefetch}
							/>
						</div>
					</div>
				);
				break;
			}
			case false: {
				return (
					<div className="chat"> 
						<HeaderChanel />
						<div className="chat-history">
							<ChatBox chan={props.chanel_focus} />
						</div>
						<div className="chat-message ">
							<div className="input-group mb-0">
								<CreateMsg />
							</div>
						</div>
					</div>
				);

				break;
			}
			default: {
				break;
			}
		}
	}
	
	/* //////////////////////////////////////////////////////// */
	/* JSX.Element return */

	return (
		<div>
			<ListChanel 
				user={props.user}
				private_chan={props.private_chan}
				refetchChanels={props.refetchChanel}
				handleChanelRefetch={props.handleChanelRefetch}
				handleAddChanel={handleAddChanel}
				handleChanelFocus={props.handleChanelFocus}
			/>
			{ renderSwitchAddChanel(addChanel) }
		</div>
	);

}