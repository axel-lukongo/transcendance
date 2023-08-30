import { GET_CHAN_BY_OWNER_AND_INTERLOCUTOR } from '../graphql/Query';
import {  IContact, channelfocus } from "../../interfaces/interfaces";
import { useQuery, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { CREATE_CHANEL } from '../graphql/Mutation';
import CreatUserChan from './creat_user_chan';
import { Chanel } from '../../interfaces/interfaces';
import { __CHAT__ } from '../message';

interface MyProps {
	interlocutor: IContact;
	handlechanelfocus: (element: Chanel) => void;
}



const Creat_direct_msg = ({interlocutor, handlechanelfocus}: MyProps) => {

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
						logo: user.avatar,
						interlocutor_name: interlocutor.nickname,
						interlocutor_avatar: interlocutor.avatar,
						directMsg: true,
						private: false,
					}
				}
			}).then((response) => {
			const responseData = response.data; // Les données renvoyées par la mutation
			setHasFetchedData(responseData.createChanel);
		})
			.catch((error) => {
				console.log("Html: ", error.message);
			});
		}
		if (data) {
			handlechanelfocus(data.getChannelByOwnersAndInterlocutor);
		}
	}, [loading]);

	if (!data && hasFetchedData) {
		return (
			<div>
				{<CreatUserChan hasFetchedData={hasFetchedData} setchanel_focus={handlechanelfocus}/>}
			</div>
		);
	}

	if(error){
		return(
			<div>
				{/* Error */}
			</div>
		)
	}

	return(
		<div>
		</div>
	)
}

export default  Creat_direct_msg;