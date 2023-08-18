import { useEffect, useState } from 'react';
import Authentication from './components/Authentication/Authentication';
import { useMutation } from '@apollo/client';
import { UPDATE_STATE } from './components/Authentication/graphql/Mutation';
import { useSearchParams } from 'react-router-dom';

const __CONNECTED_ = 1;
const __AFK__ = 2;
const __DISCONECTED__ = 3;


const App = () => {
	
	const [updateState] = useMutation(UPDATE_STATE)
	const [state, setState] = useState(__CONNECTED_);


	useEffect(() => {

		const userFromStorageString = sessionStorage.getItem('user');

		const handleVisibiltyChange = () => {
			
			if (userFromStorageString && userFromStorageString !== 'undefined')
			{
				if (state == __CONNECTED_) {
					updateState({ 
						variables: {
							state: __AFK__,
						}
					}).then(() => {
						setState(__AFK__);
					})
				}
				else if (state == __AFK__) {
					updateState({ 
						variables: {
							state: __CONNECTED_,
						}
					}).then(() => {
						setState(__CONNECTED_);
					})
				}
			}
		}

		const handleUnload = () => {
			if (userFromStorageString && userFromStorageString != 'undefined') {
				updateState({
					variables: {
						state: __DISCONECTED__
					}
				}).then(() => {
					setState(__DISCONECTED__)
				})
			}
		}
		
		const handleLoad = () => {
			if (userFromStorageString && userFromStorageString != 'undefined') {
				updateState({
					variables: {
						state: __CONNECTED_
					}
				}).then(() => {
					setState(__CONNECTED_)
				})
			}
		}

		document.addEventListener("visibilitychange", handleVisibiltyChange);
		window.addEventListener('beforeunload', handleUnload);
		window.addEventListener('load', handleLoad);

		return ( () => {
			document.removeEventListener("visibilitychange", handleVisibiltyChange);
			window.removeEventListener("beforeunload", handleUnload);
			window.removeEventListener("load", handleLoad);
		} )

	}, [state])

	return (
		<div className='bg'>
			<Authentication />
		 </div> 
	);
};

export default App;
