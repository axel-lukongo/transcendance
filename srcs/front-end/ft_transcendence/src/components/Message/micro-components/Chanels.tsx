import {useEffect, useState, useContext} from 'react';
import {gql, useQuery} from '@apollo/client';
import CreateMsg from './forms/createMessage'
import ChatBox from './requests/ChatBox';
import { Chanel } from '../../interfaces/interfaces';
import ListChanel from './requests/ListChanel';
import HeaderChanel from './Box/HeaderChanel';
import { User } from '../../Interface';
import CreateChanelForm from './forms/CreateChanelForm';


export interface IPrivateMessageProps {
	refetchChat: boolean;
	handleRefetch: () => void; 
	user: User;
	handleChange: (element: Chanel) => void;
	chanel_focus: channelfocus;
	private_chan: boolean;
}

export interface channelfocus  {
	id: string,
	chanel_name: string,
	chanel_size: string,
	max_users: string,
	logo: string,
}

export default function Chanels({ refetchChat,
										handleRefetch,
										user,
										handleChange,
										chanel_focus,
										private_chan }:
										IPrivateMessageProps) {

	const [addChanel, setAddChanel] = useState(false);


	const handleAddChanel = () => {
		setAddChanel(prevValue => !prevValue);
	}

	const renderSwitchAddChanel = (addChanel: boolean) => {
		switch(addChanel) {
			case true: {
				return (
					<div className='chat'>
						<HeaderChanel />
						<div className='chat-history'>
							<CreateChanelForm user={user} />
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
							<ChatBox chan={chanel_focus} />
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
	
	return (
		<div>
			<ListChanel 
				refetchChanels={refetchChat}
				handleChanelRefetch={handleRefetch}
				user={user}
				handleChange={handleChange}
				handleAddChanel={handleAddChanel}
				private_chan={private_chan}
			/>
			{ renderSwitchAddChanel(addChanel) }
		</div>
	);
}