import React, {useState} from 'react';

import {useMutation} from '@apollo/client';
import { CREATE_MSG } from '../../graphql/Mutation';

type channelfocus = {
	id: string,
	chanel_name: string,
	chanel_size: string,
	max_users: string,
	logo: string,
}
const CreateMsg = ({chan}: {chan: channelfocus}) => {
	const userId = JSON.parse(sessionStorage.getItem('user') || '')?.id;
	const userNickname = JSON.parse(sessionStorage.getItem('user') || '')?.nickname;
	const [Content, setContent] = useState('');
	const [createMessage] = useMutation(CREATE_MSG);

	const handlecreateMessage = async () => {
		try {
			const response = await createMessage({
				variables: {
					createMsgInput: {
						sender_id: userId,
						content: userNickname + ": " + Content,
						channel_id: +chan.id,
					},
				},
			});
			console.log(response.data);
			setContent(''); // Réinitialiser le champ de texte après la création de l'utilisateur
		} catch (error) {
			console.error(error);
		}
	};

	const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setContent(e.target.value);
	};


	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && Content.trim() !== '') {
		  handlecreateMessage();
		}
	};

	return (
		<div className='input-send-msg'>
			{/* <label htmlFor='nom'> Content </label> */}
			<input type='text'
			value={Content}
			onChange={handleContentChange}
			id='champs1'
			name='the Content'
			onKeyPress={handleKeyPress}
			className='input-message' />
			<button onClick={handlecreateMessage} disabled={!Content} className='send-button' > send </button>
			{/* <div>
				 <label htmlFor='nom'> Channel_id </label> 
				 <input type='text' value={ChanId} onChange={handlechannelIdChange} id='champs3' name='the channel_id' /> 
			</div> */}
		</div>
	);
};

export default CreateMsg;
