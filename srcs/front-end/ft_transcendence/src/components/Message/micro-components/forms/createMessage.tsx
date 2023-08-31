import React, {useState, useEffect} from 'react';

import {useMutation} from '@apollo/client';
import { CREATE_MSG } from '../../graphql/Mutation';

type channelfocus = {
	id: string,
	chanel_name: string,
	logo: string,
}
interface CreateMsgProps {
	chan: channelfocus;
	secondProp: string; // Ajout du deuxième prop
  }


  const CreateMsg: React.FC<CreateMsgProps> = ({ chan, secondProp }) => {
	const userId = JSON.parse(sessionStorage.getItem('user') || '')?.id;
	const userNickname = JSON.parse(sessionStorage.getItem('user') || '')?.nickname;
	const [Content, setContent] = useState(secondProp);
	const [createMessage] = useMutation(CREATE_MSG);

	const handlecreateMessage = async () => {
		try {
			const response = await createMessage({
				variables: {
					createMsgInput: {
						sender_id: userId,
						content: userNickname + ": " + Content,
						channel_id: +chan.id,
						invite_game: secondProp !== ""? true : false
					},
				},
			});
			// console.log(response.data);
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
	
	useEffect(() => {
		if (secondProp !== "") {
		  handlecreateMessage();
		}
	  }, [secondProp]);
	  if (secondProp !== "") {
		return null; // Rendu vide si secondProp n'est pas vide
	  }
		return (
		<div className='input-send-msg'>
			<input type='text'
			value={Content}
			onChange={handleContentChange}
			id='champs1'
			name='the Content'
			onKeyPress={handleKeyPress}
			className='input-message' />
			<button onClick={handlecreateMessage} disabled={!Content} className='send-button' > send </button>
		</div>
	);
};

export default CreateMsg;
