import {useEffect, useState, useContext} from 'react';
import {gql, useQuery} from '@apollo/client';
import {SubscriptionClient} from 'subscriptions-transport-ws';
import {Link} from 'react-router-dom';
import { Chanel } from '../interfaces/interfaces';
import Chanels from './micro-components/Chanels';
import PublicChanel from './micro-components/PublicChanel';

import './css/messages.css';

//je me connect a mon server via le protocol websocket
const wsClient = new SubscriptionClient('ws://localhost:4000/graphql', {});

const NewMessageSubscription = gql`
  subscription ($input: Int!) {
	addmessage(channel_id: $input) {
		id
		content
		sender_id
	}
	}
`;

const GET_MESSAGES_BY_CHANNEL = gql`
  query GetMessagesByChannel($channelId: Int!) {
    Message_findAll_msg_chan(channelId: $channelId) {
      content
    }
  }
`;

type Message = {
	id: number;
	sender_id: number;
	content: string;
};

const Message = () => {

	const user = JSON.parse(sessionStorage.getItem('user') || '');

	const [chanel_focus, setChanelFocus] = useState({
		id: "",
		chanel_name: "",
		chanel_size: "",
		max_users: "",
		logo: "",
	});

	const [side_bar_focus, setSideBarFocus] = useState(1);

	const [refetchChat, setRefetchChat] = useState(false);

	const handleChange = async (element: Chanel) => {

		setChanelFocus({
			id: element.id.toString(),
			chanel_name: element.chanel_name,
			chanel_size: element.chanel_size.toString(),
			max_users: element.max_users.toString(),
			logo: element.logo
		});
	}

	const handleChangeOnglet = (id: number) => {
		try {
			if (id < 1 || id > 4)
				throw new Error("Id should be between 1 & 4");
			setSideBarFocus(id);
		}
		catch (e) {
			console.log("Error Nav: ", e);
		}
	}

	const handleRefetch = () => {
		setRefetchChat(prevValue => !prevValue);
	}

	const renderSwitch = (id: number) => {
		switch(id) {
			case 1: {
				return (
					<div>
						{/* Direct Message her */}
					</div>
				);
				break;
			}
			case 2: {
				return (
					<Chanels 
						refetchChat={refetchChat}
						handleChange={handleChange}
						handleRefetch={handleRefetch}
						user={user}
						chanel_focus={chanel_focus}
						private_chan={true}
					/>
				);
					break;
			}
			case 3: {
				return (
					<Chanels 
						refetchChat={refetchChat}
						handleChange={handleChange}
						handleRefetch={handleRefetch}
						user={user}
						chanel_focus={chanel_focus}
						private_chan={false}
					/>
				);
			break;
			}
			case 4: {
				return (
					<div>
						{/* Add request her */}
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

		<div className="container">
        <Link to="/">
          <button className='home-button logo-box'></button>
        </Link>

		  <div className="row clearfix">
			<div className="col-lg-12">
				<div>
					<button onClick={() => handleChangeOnglet(1)}>1</button>
					<button onClick={() => handleChangeOnglet(2)}>2</button>
					<button onClick={() => handleChangeOnglet(3)}>3</button>
					<button onClick={() => handleChangeOnglet(4)}>4</button>
				</div>

			  <div className="screen-box chat-app">
				{ renderSwitch(side_bar_focus) }
			  </div>
			  
			 </div> 
		  </div>
		</div>
	  );
};

export default Message;