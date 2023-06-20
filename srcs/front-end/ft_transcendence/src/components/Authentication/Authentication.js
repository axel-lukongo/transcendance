
import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import axios from 'axios';
  
const FIND_USER_BY_INTRA_LOGIN = gql`
  query FindOneUserByIntraLogin($intra_login: String!) {
    findOneUserByIntraLogin(intra_login: $intra_login) {
      nickname
      email
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

  /*    ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   */
  /*                      STATE                             */
  /*    ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   */
  const Authentication = () => {
  const [userData, setUserData] = useState({
    token: '',
    login: '',
  });
  
  const [code, setCode] = useState(null);
  const [canCheck, setCanCheck] = useState(false);

  /*    ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   */
  /*                      HANDLE                            */
  /*    ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   */

  //The user is redirect to 42 api Oauth for connect to the site
  const handleSignIn = (e) => {
    e.preventDefault();
    window.location.href = "https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-8080a9dd49bd7eeeefcfb34e552ffec79991e6fb973b6debbd2b1e7874a5ee91&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2F&response_type=code";
  };

  // We use the information on the form that user send to create his profil on the db 
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

  /*    ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   */
  /*                      REQUEST                           */
  /*    ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   */

  // A request query to check if a user exist in the db
  const { data: findUserDataQuery, loading: findUserLoadingQuery, error: findUserErrorQuery } = useQuery(FIND_USER_BY_INTRA_LOGIN, {
    variables: { intra_login: userData.login },
    skip: !userData.login, // Skip the query if userData.login is not set
  });
  
  // A request mutation to create the user
  const [createUser] = useMutation(CREATE_USER);

  /*    ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   */
  /*                      USE EFFECT                        */
  /*    ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   */

  // this useEffect on the loading page to get the code on the url 
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlCode = urlParams.get('code');
    if (urlCode) {
      setCode(urlCode);
      window.history.replaceState(null, null, window.location.pathname); // Remove the code from the URL
    }
  }, []);

  // this useEffect is activated when the state of code has changed, so when we get the the code on the url
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
          console.log('the acces token :', requestData);
        })

        .catch(error => {
          console.error('Error:', error);
        });
    }
  }, [code]);
  
  // this useEffect is activated when the assignation of userData.token have been done, so when we get the the acces_token
  useEffect(() => {
    if (userData.token) {

      const loginRequestData = {
        headers: {
          Authorization: `Bearer ${userData.token}`
        }
      };

      axios.get('https://api.intra.42.fr/v2/me', loginRequestData)
        .then(response => {
          setUserData(prevState => ({
            ...prevState,
            login: response.data.login
          }));
          console.log(response.data);
        })

        .catch(error => {
          console.error('Error:', error);
        });
    }
  }, [userData.token]);
  
  //this "useffect" is used to update canCheck to know when in the return if the user exists or not in db
  useEffect(() => {
      setCanCheck(true);
  }, [findUserDataQuery, findUserLoadingQuery, findUserErrorQuery]);

  /*    ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   */
  /*                      RETURN                            */
  /*    ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   */
  return (
    <div>
      <button onClick={handleSignIn}>SIGNIN</button>
        <div>
          {canCheck && (
            <>
              {!findUserLoadingQuery && !findUserErrorQuery && findUserDataQuery ? (
                <>
                  <p>Email: {findUserDataQuery.email}</p>
                  <p>Nickname: {findUserDataQuery.nickname}</p>
                  <p>Avatar: {findUserDataQuery.avatar}</p>
                </>
              ) : (
                <form onSubmit={(e) => handleCreateUser(e)}>
                  <input type="text" placeholder="Nickname" name="nickname" />
                  <input type="text" placeholder="Email" name="email" />
                  <input type="text" placeholder="Avatar" name="avatar" />
                  <button type="submit">Send</button>
                </form>
              )}
            </>
          )}
        </div>
    </div>
  );
};

export default Authentication;