import {useEffect, useState, useContext} from 'react';
import {gql, useQuery} from '@apollo/client';
import {SubscriptionClient} from 'subscriptions-transport-ws';
import CreateMsg from './micro-components/createMessage'
import './css/messages.css';
import {Link} from 'react-router-dom';
import ChatBox from './micro-components/ChatBox';
import { Chanel } from '../interfaces/interfaces';
import ListChanel from './micro-components/ListChanels';
import HeaderChanel from './micro-components/HeaderChanel';

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

	const [chanel_focus, setChanelFocus] = useState({
		id: "",
		chanel_name: "",
		chanel_size: "",
		max_users: "",
		logo: "",
	});

	const [refetchChat, setRefetchChat] = useState(false);

	const handleChange = (element: Chanel) => {

		setChanelFocus({
			id: element.id.toString(),
			chanel_name: element.chanel_name,
			chanel_size: element.chanel_size.toString(),
			max_users: element.max_users.toString(),
			logo: element.logo
		});
	}

	const handleRefetch = () => {
		setRefetchChat(prevValue => !prevValue);
	}

	  return (

		<div className="container">
        <Link to="/">
          <button className='home-button logo-box'></button>
        </Link>

		  <div className="row clearfix">
			<div className="col-lg-12">
			  <div className="screen-box chat-app">
				<ListChanel />
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
			  </div>
			 </div> 
		  </div>
		// </div>
	  );
};

export default Message;