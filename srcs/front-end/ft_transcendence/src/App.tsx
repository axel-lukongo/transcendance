
import React, {Children, useState} from 'react';
import './css/App.css';
import './css/message.css';
import Chat from './components/message/message';
import CreatMsg from './components/message/creat_message';
import Chanel from './components/Chanel/Chanel';
import Mymsg from './components/message/my_message_app';
import NavBar from './components/NavBar/NavBar';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import CreateChanelForm from './components/Chanel/CreateChanelForm';
import ListAddContact from './components/Chanel/ListChanelAddContact';


const router = createBrowserRouter([{
		path: "/",
		element: (
			<div>
				<NavBar />
				{/* <ContactList/> */}
				<Outlet/>
			</div>
		),
		children: [
			{
				path: "chanels",
				element: (
				<div>
					{/* <Chanel /> */}
					<Outlet />
				</div>),
				children: [
					{
						path: "new",
						element: (
							<div>
								<CreateChanelForm />
							</div>
						)

					},
					{
						path: "add",
						element: (
							<div>
								<ListAddContact user_id={1} chanel_id={1} />
							</div>
						)
					}
				]
			}
		]
	}
])

const App = () => {

	const [chanelState, setChanelState] = useState(false);
	
	const [contactState, setContactState] = useState(false);

	return (
		<div >
			<div className='center w85'>
				<RouterProvider router={router}></RouterProvider>
			</div>
		</div>
	);
};

export default App;
