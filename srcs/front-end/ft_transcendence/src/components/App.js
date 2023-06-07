
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import Login from './Authentication';


const App = () => {
  return (
    <Login />
  )
}


// const CREATE_USER = gql`
//   mutation CreateUser($input: CreateUserInput!) {
//     createUser(createUserInput: $input) {
//       token
//       nickname
//       avatar
//     }
//   }
// `;

// const App = () => {

// 	const [Nickname, setNickname] = useState('');
// 	const [Token, setToken] = useState('');
// 	const [createUser] = useMutation(CREATE_USER);


//   const handleCreateUser = async () => {
//     try {
//       const response = await createUser({
//         variables: {
//           input: {
//             token: parseInt(Token),
//             nickname: Nickname,
//             avatar: 'https://example.com/avatar.jpg',
//           },
//         },
//       });
//       console.log(response.data);
// 	  setNickname(''); // Réinitialiser le champ de texte après la création de l'utilisateur
// 	  setToken('')
//     } catch (error) {
//       console.error(error);
//     }
//   };


// 	const handleNicknameChange = (e) => {
//     	setNickname(e.target.value);
//   	};

// 	  const handleTokenChange = (e) => {
//     	setToken(e.target.value);
//   	};


//   return (
// 	<div>
// 		<div>
// 		<label htmlFor='nom'> Nickname</label>
// 		<input type='text' value={Nickname} onChange={handleNicknameChange} id="champs1" name="the nickname" />
// 		</div>

// 		<div>
// 		<label htmlFor='nom'> Token</label>
// 		<input type='text' value={Token} onChange={handleTokenChange} id="champs2" name="the token" />
// 		</div>

// 		<div>
// 		<button onClick={handleCreateUser} disabled={!Token || !Nickname} > the Create User</button>
// 		</div>
// 	</div>
//   );
// };

export default App;
