
import {useMutation} from '@apollo/client';
import {gql} from '@apollo/client';
import React, {useState} from 'react';

const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(createUserInput: $input) {
      token
      nickname
	  password
	  email
      avatar
    }
  }
`;

const CreatUsr = () => {
	const [Nickname, setNickname] = useState('');
	const [Token, setToken] = useState('');
	const [Password, setPassword] = useState('');
	const [Email, setEmail] = useState('');
	const [createUser] = useMutation(CREATE_USER);

	const handleCreateUser = async () => {
		try {
			const response = await createUser({
				variables: {
					input: {
						token: parseInt(Token, 10),
						nickname: Nickname,
						password: Password,
						email: Email,
						avatar: 'https://example.com/avatar.jpg',
					},
				},
			});
			console.log(response.data);
			setNickname(''); // Réinitialiser le champ de texte après la création de l'utilisateur
			setToken('');
		} catch (error) {
			console.error(error);
		}
	};

	const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNickname(e.target.value);
	};

	const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setToken(e.target.value);
	};

	const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	return (
		<div>
			<div>
				<label htmlFor='nom'> Nickname </label>
				<input type='text' value={Nickname} onChange={handleNicknameChange} id='champs1' name='the nickname' />
			</div>

			<div>
				<label htmlFor='nom'> Token </label>
				<input type='text' value={Token} onChange={handleTokenChange} id='champs2' name='the token' />
			</div>

			<div>
				<label htmlFor='nom'> password </label>
				<input type='text' value={Password} onChange={handlePassword} id='champs3' name='the password' />
			</div>

			<div>
				<label htmlFor='nom'> email </label>
				<input type='text' value={Email} onChange={handleEmail} id='champs4' name='the email' />
			</div>

			<div>
				<button onClick={handleCreateUser} disabled={!Token || !Nickname} > the Create User</button>
			</div>
		</div>
	);
};

export default CreatUsr;
