import { useEffect } from 'react';
import Authentication from './components/Authentication/Authentication';
import { useMutation } from '@apollo/client';
import { UPDATE_STATE } from './components/Authentication/graphql/Mutation';

const __CONNECTED_ = 1;
const __AFK__ = 2;
const __DISCONECTED__ = 3;


const App = () => {
	
	const [updateState] = useMutation(UPDATE_STATE)
	let state: boolean = true;


	useEffect(() => {

		const handleVisibiltyChange = () => {
			
			const userFromStorageString = sessionStorage.getItem('user');

			if (userFromStorageString && userFromStorageString !== 'undefined')
			{
				let userFromStorage = JSON.parse(userFromStorageString);
				if (state === true) {
					updateState({ 
						variables: {
							state: __DISCONECTED__,
							user_id: userFromStorage.id
						}
					})
				}
				else {
					updateState({ 
						variables: {
							state: __CONNECTED_,
							user_id: userFromStorage.id
						}
					})
				}
				state = !state;
			}
		}

		document.addEventListener("visibilitychange", handleVisibiltyChange);

		return ( () => {
			document.removeEventListener("visibilitychange", handleVisibiltyChange);
		} )

	}, [])

	return (
		<div className='bg'>
			<Authentication />
		 </div> 
	);
};

export default App;
