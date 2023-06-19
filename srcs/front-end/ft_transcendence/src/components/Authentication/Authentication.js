
import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import axios from 'axios';
  
  const FIND_USER_BY_INTRA_LOGIN = gql`
  query FindUserByIntraLogin($intra_login: String!) {
    findUserByIntraLogin(intra_login: $intra_login) {
      email
      nickname
      avatar
    }
  }
  `;
  
  const CREATE_USER = gql`
    mutation CreateUser($input: CreateUserInput!) {
      createUser(createUserInput: $input) {
        token
        email
        intra_login
        nickname
        avatar
      }
    }
  `;

const Authentication = () => {
  const [userData, setUserData] = useState({
    token: '',
    login: '',
  });

  const [code, setCode] = useState(null);

  const handleSignIn = (e) => {
    e.preventDefault();
    window.location.href = "https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-8080a9dd49bd7eeeefcfb34e552ffec79991e6fb973b6debbd2b1e7874a5ee91&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2F&response_type=code";
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlCode = urlParams.get('code');
    if (urlCode) {
      setCode(urlCode);
      window.history.replaceState(null, null, window.location.pathname); // Remove the code from the URL
    }
  }, []);

  const { data: findUserDataQuery, loading: findUserLoadingQuery, error: findUserErrorQuery } = useQuery(FIND_USER_BY_INTRA_LOGIN, {
    variables: { intra_login: userData.login },
    skip: !userData.login, // Skip the query if userData.login is not set
  });
  

  useEffect(() => {

    if (code) {
      const requestData = {
        grant_type: 'authorization_code',
        client_id: 'u-s4t2ud-8080a9dd49bd7eeeefcfb34e552ffec79991e6fb973b6debbd2b1e7874a5ee91',
        client_secret: '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',
        code: code,
        redirect_uri: 'http://localhost:8080/',
      };
      axios.post('https://api.intra.42.fr/oauth/token', requestData)
        .then(response => {
          setUserData(prevState => ({
            ...prevState,
            token: response.data.access_token
          }));

          const loginRequestData = {
            headers: {
              Authorization: `Bearer ${response.data.access_token}`
            }
          };
          axios.get('https://api.intra.42.fr/v2/me', loginRequestData)
          .then(response => {
            setUserData(prevState => ({
              ...prevState,
              login: response.data.login
            }));
          })
          .catch(error => {
              console.log(response.data);
              console.error('Error:', error);
            });
        });
    }
  }, [code]);

  const [isSignedIn, setIsSign] = useState(false);
  useEffect(() => {
    if (findUserDataQuery && !findUserLoadingQuery && !findUserErrorQuery) {
      setIsSign(true);
      console.log(findUserDataQuery);
      // Faites quelque chose avec les données retournées
    }
  }, [findUserDataQuery, findUserLoadingQuery, findUserErrorQuery]);
  
  const [createUser] = useMutation(CREATE_USER);
  
  const handleCreateUser = (e) => {
    e.preventDefault();
    const { nickname, email, avatar } = e.target;
    console.log(nickname.value, email.value, avatar.value);
    createUser({
      variables: {
        input: {
          token: userData.token,
          intra_login: userData.login,
          nickname: nickname.value,
          email: email.value,
          avatar: avatar.value
        }
      }
    }).then(response => {
      console.log('User created:', response.data.createUser);
    }).catch(error => {
        console.error('Error creating user:', error);
      });
    };
    

  return (
    <div>
      <button onClick={handleSignIn}>SIGNIN</button>
      {/* <div>
        {isSignedIn ? 
          ( findUserDataQuery ? (
            <><p>Email: {findUserDataQuery.findUserByIntraLogin.email}</p><p>Nickname: {findUserDataQuery.findUserByIntraLogin.nickname}</p><p>Avatar: {findUserDataQuery.findUserByIntraLogin.avatar}</p></>
          ) : (
            <form onSubmit={(e) => handleCreateUser(e)}>
              <input type="text" placeholder="Nickname" name="nickname" />
              <input type="text" placeholder="Email" name="email" />
              <input type="text" placeholder="Avatar" name="avatar" />
              <button type="submit">Send</button>
            </form>
            )
        ) 
        : null}
      </div> */}
    </div>
  );
  
};

export default Authentication;