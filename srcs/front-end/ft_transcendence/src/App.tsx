import { useContext, useEffect, useState } from 'react';
import Authentication from './components/Authentication/Authentication';
import { useMutation } from '@apollo/client';
import { UPDATE_STATE } from './components/Authentication/graphql/Mutation';
import { WebSocketContext } from './WebSocketProvider';
import { Navigate, Route, Routes } from 'react-router-dom';


export const __CREATING__ = -2;
export const __NEED_TFA__ = -1;
export const __ACCESS__ = 1;

export const __CONNECTED_ = 1;
export const __AFK__ = 2;
export const __DISCONECTED__ = 3;



const App = () => {

	const [updateState] = useMutation(UPDATE_STATE)
	const [state, setState] = useState(__CONNECTED_);
	const wsContext = useContext(WebSocketContext);

	useEffect(() => {
		const userString = sessionStorage.getItem('user'); 
		const user = userString ? JSON.parse(userString) : null;
		wsContext?.updateUser(user);

		if (user) {
			setState(__CONNECTED_);
			updateState({
				variables: {
					state: __CONNECTED_
				}
			})
		}

	},[])
	
	useEffect(() => {

		if (wsContext?.user) {

		  const handleVisibiltyChange = () => {
			if (state === __CONNECTED_) {
			  setState(__AFK__);
			  updateState({ 
				variables: {
				  state: __AFK__,
				}
			  });
			} else if (state === __AFK__) {
			  setState(__CONNECTED_);
			  updateState({ 
				variables: {
				  state: __CONNECTED_,
				}
			  });
			}
		  }
	  
		  const handleUnload = (event: any ) => {
			updateState({
			  variables: {
				state: __DISCONECTED__
			  }
			}).then(() => {
			  setState(__DISCONECTED__);
			})
		  }
	  
		  document.addEventListener("visibilitychange", handleVisibiltyChange);
		  window.addEventListener('beforeunload', handleUnload);
	  
		  return () => {
			document.removeEventListener("visibilitychange", handleVisibiltyChange);
			window.removeEventListener("beforeunload", handleUnload);
		  };

		}

	}, [wsContext?.user, state, updateState]);
	  



	return (
		<div className='bg'>
			<Authentication />
		 </div> 
	);
};

export default App;
