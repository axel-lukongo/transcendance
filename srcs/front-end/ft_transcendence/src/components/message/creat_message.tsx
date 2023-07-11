
import {useMutation} from '@apollo/client';
import {gql} from '@apollo/client';
import React, {useState} from 'react';


const createMsg = gql`
  mutation CreateMessage($createMsgInput: CreateMessageInput!) {
    createMessage(createMsgInput: $createMsgInput) {
      content
      sender_id
      channel_id 
    }
  }
`;

const CreatMsg = ({show}: {show: boolean}) => {
	const userId = JSON.parse(sessionStorage.getItem('user') || '')?.id;
	const userNickname = JSON.parse(sessionStorage.getItem('user') || '')?.nickname;
	const [Content, setContent] = useState('');
	const [ChanId, setChanId] = useState('');
	const [creatMsg] = useMutation(createMsg);

	const handlecreatMsg = async () => {
		try {
			const response = await creatMsg({
				variables: {
					createMsgInput: {
						sender_id: userId,
						content: userNickname + ": " + Content,
						channel_id: parseInt(ChanId),
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
		<div className={`Creat_Msg ${show ? 'showw' : ''}`}>
			<div>
				<label htmlFor='nom'> Content </label>
				<input type='text' value={Content} onChange={handleContentChange} id='champs1' name='the Content' />
			</div>

			<div>
				<label htmlFor='nom'> Channel_id </label>
				<input type='text' value={ChanId} onChange={handlechannelIdChange} id='champs3' name='the channel_id' />
			</div>

			<div>
				<button onClick={handlecreatMsg} disabled={!userId || !Content} > the Create User</button>
			</div>
		</div>
	);
};

export default CreatMsg;