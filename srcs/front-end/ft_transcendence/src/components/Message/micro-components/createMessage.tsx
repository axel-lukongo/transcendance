
import React, {useState} from 'react';

import {useMutation} from '@apollo/client';
import { CREATE_MSG } from '../graphql/Mutation';


const CreateMsg = () => {
	// const userId = JSON.parse(sessionStorage.getItem('user') || '')?.id;
	const userNickname = JSON.parse(sessionStorage.getItem('user') || '')?.nickname;
	const [Content, setContent] = useState('');
	const [ChanId, setChanId] = useState('');
	const [createMessage] = useMutation(CREATE_MSG);

	const handlecreateMessage = async () => {
		try {
			const response = await createMessage({
				variables: {
					createMsgInput: {
						sender_id: 1,
						content: userNickname + ": " + Content,
						channel_id: 1,
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

	const handlechannelIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setChanId(e.target.value);
	};

	return (
		<div >
			<div >
				{/* <label htmlFor='nom'> Content </label> */}
				<input type='text' value={Content} onChange={handleContentChange} id='champs1' name='the Content' className='input-message' />
				<button onClick={handlecreateMessage} disabled={!Content} className='send-button' > send </button>
			</div>

			{/* <div>
				 <label htmlFor='nom'> Channel_id </label> 
				 <input type='text' value={ChanId} onChange={handlechannelIdChange} id='champs3' name='the channel_id' /> 
			</div> */}
		</div>
	);
};

export default CreateMsg;
