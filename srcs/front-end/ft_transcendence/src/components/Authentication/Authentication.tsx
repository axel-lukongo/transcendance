import React, { useEffect, useState, FC } from 'react';
import { gql, useLazyQuery, useMutation } from '@apollo/client';

const CREATE_USER = gql`
  mutation CreateUser($input: CreateAuthenticationInput!) {
    createUser(createAuthenticationInput: $input) {
      id
      token
      email
      nickname
      avatar
    }
  }
`;

const Authentication: FC = () => {

/*    ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   */
/*                      STATE                             */
/*    ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   */

  const [canCheck, setCanCheck] = useState(false);
  
  const [userExist, setUserExist] = useState(true);
  
/*    ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   */
/*                      REQUEST                           */
/*    ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   */
  
  const [makeAuthenticationQuery, {data: AuthenticationData, error: AuthenticationError }] = useLazyQuery(gql`
  query MakeAuthentication($code: String!) {
    makeAuthentication(code: $code) {
      id
      token
      email
      nickname
      avatar
    }
  }
  `);

  const [createUser] = useMutation(CREATE_USER);

/*    ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   */
/*                      HANDLE                            */
/*    ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   */

  const handleRedirect = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.location.href = process.env.REACT_APP_API_42_URL?.toString() || '';
  };

  const handleCreateUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { nickname, email, avatar } = e.currentTarget;
    
    const user_info = {
      email: email.value,
      nickname: nickname.value,
      avatar: avatar.value
    };
      
    createUser({
      variables: {
        input: user_info
      }
    })
    .then(response => {
      console.log('User created:', response.data.createUser);
      sessionStorage.setItem('user', JSON.stringify(response.data.createUser));
    })
    .catch(error => {
      console.error('Error creating user:', error);
    });
   console.log(nickname.value, email.value, avatar.value);
  };

/*    ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   */
/*                      USE EFFECT                        */
/*    ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   */

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlCode = urlParams.get('code');
    if (urlCode) {
      console.log(urlCode);
      makeAuthenticationQuery({ variables: { code: urlCode } });
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, [makeAuthenticationQuery]);

  useEffect(() => {
    if (AuthenticationData) {
        setCanCheck(true);
      console.log(AuthenticationData);
      sessionStorage.setItem('user', JSON.stringify(AuthenticationData));
    }
  }, [AuthenticationData]);

  useEffect(() => {
    if (AuthenticationError) {
        setCanCheck(true);
        if (AuthenticationError.message === "This user does not exist yet") 
            setUserExist(false);
    }
  }, [AuthenticationError]);

  
/*    ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   */
/*                      RETURN                            */
/*    ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   */
return (
  <div>
    {sessionStorage.getItem('user') ? (
      <p>Accès au site car le session storage est initialisé</p>
    ) : (
      <>
        {!canCheck ? (
          <button onClick={handleRedirect}>SIGNIN</button>
        ) : (
          <>
            {AuthenticationError && !userExist && (
              <>
                <h1>Malheureusement, tu n'as pas encore de profil enregistré sur notre site, je te propose d'en créer un !</h1>
                <form onSubmit={handleCreateUser}>
                  <input type="text" placeholder="Nickname" name="nickname" />
                  <input type="text" placeholder="Email" name="email" />
                  <input type="text" placeholder="Avatar" name="avatar" />
                  <button type="submit">Send</button>
                </form>
              </>
            )}
          </>
        )}
      </>
    )}
  </div>
);

}

export default Authentication;
