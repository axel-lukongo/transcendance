import { GET_CHAN_BY_OWNER_AND_INTERLOCUTOR } from '../graphql/Query';
import {  IContact } from "../../interfaces/interfaces";
import { useQuery, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { CREATE_CHANEL } from '../graphql/MutationsChanel';
import CreatUserChan from './creat_user_chan';
import { Chanel } from '../../interfaces/interfaces';
import { __CHAT__ } from '../message';

interface MyProps {
	interlocutor: IContact;
	handleChanelRefecth: () => void;
	handleChange: (element: Chanel) => void;
}



const Creat_direct_msg = ({interlocutor, handleChanelRefecth, handleChange}: MyProps) => {

	const user = JSON.parse(sessionStorage.getItem('user') || '');
	const [hasFetchedData, setHasFetchedData] = useState<Chanel>(); // Nouvelle variable d'état

	const { data, loading, error } = useQuery(GET_CHAN_BY_OWNER_AND_INTERLOCUTOR, {
		variables: {
		  userId1: user.id,
		  userId2: interlocutor.id,
		},
	});
	
	const [createChannel] = useMutation(CREATE_CHANEL);

	useEffect(() => {

		if (loading) {
			return;
		}

		if (!data) {
			createChannel({
				variables: {
					input: {
						owner_id: parseInt(user.id, 10),
						chanel_name: user.nickname,
						chanel_size: 2,
						max_users: 2,
						interlocutor_id: interlocutor.id,
						logo: 'test10',
						private: false,
					}
				}
			}).then((response) => {
			const responseData = response.data; // Les données renvoyées par la mutation
			setHasFetchedData(responseData.createChanel);})
			.catch((error) => {
				console.log("Html: ", error.message);
			});
		}
	}, [loading]);


	if (!data && hasFetchedData) {
		handleChanelRefecth();
		// handleChange(hasFetchedData);
		return (
			<div>
				{<CreatUserChan chan={data} hasFetchedData={hasFetchedData} handleChange={handleChange} />}
				les nvx channel sont sensé etre cree
			</div>
		);
	}
	// else if (data){
	// 	console.log('hehehe ===>>>>  ', data)
	// 	handleChanelFocus(data.getChannelByOwnersAndInterlocutor);
	// 	handleChatBox(__CHAT__);
	// }
	// const handleClick = () => {
	// 	handleChanelFocus(chanel.chanels);
	// 	handleChatBox(__CHAT__);
	// }

	// handleClick();

	if(error){
		return(
			<div>
				rien
			</div>
		)
	}


	//ici si data existais deja alors je vais handleChange(data.createChanel) ici;
	return(
		<div>
      		{/* {<CreatUserChan chan={data}/>} */}
			{/* {handleClick()} */}
		</div>

	)
}

export default  Creat_direct_msg;