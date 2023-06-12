
// import { useMutation } from '@apollo/client';
// import { gql } from '@apollo/client';
import React, { useState } from 'react';
import '../css/App.css';
import Authentication from './Authentication/Authentication'


const App = () => {
  return (
    <Authentication />
	// <div className="App">

	// <div className='bg'></div>
	// <div className="overlay1"></div> {/* Nouvel élément pour le rectangle */}
	// <div className="overlay2"></div> {/* Nouvel élément pour le rectangle */}
	// <div className="overlay3"></div> {/* Nouvel élément pour le rectangle */}
	// <div className="overlay4"></div> {/* Nouvel élément pour le rectangle */}
	// <div className="overlay5"></div> {/* Nouvel élément pour le rectangle */}
	// <div className="overlay6"></div> {/* Nouvel élément pour le rectangle */}
	// <div className="overlay7"></div> {/* Nouvel élément pour le rectangle */}


	// {/* <div className="rectangle-9-7" />
	// <div className="rectangle-1-0-5" /> */}

	// * try to test *
	// </div>
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
