import {useEffect, useState} from 'react';
import {gql, useQuery} from '@apollo/client';
import {SubscriptionClient} from 'subscriptions-transport-ws';
import CreateMsg from './micro-components/createMessage'
import './css/messages.css';
import {Link} from 'react-router-dom';

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
	  sender_id
    }
  }
`;

type Message = {
	id: number;
	sender_id: number;
	content: string;  
};

/**
 * @returns dans mon return j'affiche tout les nouveaux messages qui seront crée et destiné a un chanel en particulier
*/

const Chat = () => {
	const { loading, error, data } = useQuery(GET_MESSAGES_BY_CHANNEL,{variables: {channelId: 1}});
	const [messages, setMessages] = useState<Message[]>([]);
	// Si il y avais des chose dans intialMessages alors je le met dans mon useState

	useEffect(() => {
	  if (data && data.Message_findAll_msg_chan) {
		setMessages(data.Message_findAll_msg_chan);
	  }
	}, [data]);

	useEffect(() => {
		const subscription = wsClient.request({query: NewMessageSubscription, variables: { input: 2 }}).subscribe({
			next(response) {
				// Next est une fonction de suscribe qui s'execute a chaque nouvelle creation de message 
				// reponse c'est la ou les reponse de notre server est stocker.
				if (response.data) {
					const newMessage = response.data.addmessage;
					setMessages(prevMessages => [...prevMessages, newMessage] as Message[]); // On copie les messages precedent et on rajoute newMessage
				}
			},
			error(error) {
				console.error('WebSocket error:', error);
			},
		});
		return () => {
			subscription.unsubscribe();
		};
	}, []);
	// Le [] c'est le tableau de dependance, lorsque il est vide ca signifie que on execute notre useEffect que 1 fois


	  return (

		<div className="container">
        <Link to="/">
          <button className='home-button logo-box'></button>
        </Link>

		  <div className="row clearfix">
			<div className="col-lg-12">
			  <div className="screen-box chat-app">
				<div id="plist" className="people-list">

				  <ul className="list-unstyled chat-list mt-2 mb-0">
					<li className="clearfix">
					  <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="avatar" />{/**afficher avatar */}
					  <div className="about">
						<div className="name"> nickname</div>
						<div className="status"> <i className="fa fa-circle offline"></i> left 7 mins ago </div>
					  </div>
					</li>
					<li className="clearfix">
					  <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar" />{/**afficher avatar */}
					  <div className="about">
						<div className="name">nickname</div>
						<div className="status"> <i className="fa fa-circle online"></i> online </div>
					  </div>
					</li>
					<li className="clearfix">
					  <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="avatar" />{/**afficher avatar */}
					  <div className="about">
						<div className="name">nickname</div>
						<div className="status"> <i className="fa fa-circle online"></i> online </div>
					  </div>
					</li>
					<li className="clearfix">
					  <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar" />{/**afficher avatar */}
					  <div className="about">
						<div className="name">nickname</div>
						<div className="status"> <i className="fa fa-circle offline"></i> left 10 hours ago </div>
					  </div>
					</li>
					<li className="clearfix">
					  <img src="https://bootdey.com/img/Content/avatar/avatar8.png" alt="avatar" /> {/**afficher avatar */}
					  <div className="about">
						<div className="name">nickname</div>
						<div className="status"> <i className="fa fa-circle online"></i> online </div>
					  </div>
					</li>
					<li className="clearfix">
					  <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="avatar" /> {/**afficher avatar */}
					  <div className="about">
						<div className="name">nickname</div>
						<div className="status"> <i className="fa fa-circle offline"></i> offline since Oct 28 </div>
					  </div>
					</li>
				  </ul>
				</div>
				<div className="chat"> 
				  <div className="chat-header">
					<div className="row">
					  <div className="col-lg-6">
						<a href="javascript:void(0);" data-toggle="modal" data-target="#view_info">
						  <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar" />{/**afficher avatar */}
						</a>



						{/* ici on affichera un point vers si le user est connecter ou sinon vert si il est connecter*/ }
						<div className="chat-about">
						  <h6 className="m-b-0"> nickname </h6>
						  <small>Last seen: 2 hours ago</small>
						</div>
					  </div>

					</div>
				  </div>
				  <div className="chat-history">
		
						{messages.map(message => (
							<div key={message.id}> {message.content}</div>
						))}
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
	// }

	
};

export default Chat;
