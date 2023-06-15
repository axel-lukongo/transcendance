import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import React, { useState } from 'react';


const CREAT_MSG = gql`
  mutation CreatMsg($input: CreateMessageInput!) {
    createMessage(createMsgInput: $input) {
      content
	  sender_id
	  channel_id
    }
  }
`;

const CreatMsg = () => {

	const [Sender_id, setSender_id] = useState('');
	const [Content, setContent] = useState('');
	const [Chan_id, setChan_id] = useState('');
	const [creatMsg] = useMutation(CREAT_MSG);


  const handlecreatMsg = async () => {
    try {
      const response = await creatMsg({
        variables: {
          input: {
            sender_id: parseInt(Sender_id),
            content: Content,
			channel_id: parseInt(Chan_id),
		},
        },
      });
      console.log(response.data);
	  setContent(''); // Réinitialiser le champ de texte après la création de l'utilisateur
	  setSender_id('')
    } catch (error) {
      console.error(error);
    }
  };


	const handleContentChange = (e) => {
    	setContent(e.target.value);
  	};

	  const handleSender_idChange = (e) => {
    	setSender_id(e.target.value);
  	};

	  const handlechannel_idChange = (e) => {
    	setChan_id(e.target.value);
  	};

	return (
	<div>
		<div>
		<label htmlFor='nom'> Content </label>
		<input type='text' value={Content} onChange={handleContentChange} id="champs1" name="the Content" />
		</div>

		<div>
		<label htmlFor='nom'> Sender_id </label>
		<input type='text' value={Sender_id} onChange={handleSender_idChange} id="champs2" name="the Sender_id" />
		</div>


		<div>
		<label htmlFor='nom'> Channel_id </label>
		<input type='text' value={Chan_id} onChange={handlechannel_idChange} id="champs3" name="the channel_id" />
		</div>

		<div>
		<button onClick={handlecreatMsg} disabled={!Sender_id || !Content} > the Create User</button>
		</div>
	</div>
  );
};

export default CreatMsg;