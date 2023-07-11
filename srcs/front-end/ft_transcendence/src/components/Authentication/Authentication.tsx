import React, { useEffect, useState, FC } from 'react';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import Home from '../message/Home';
import { SigninButton, CreateUserForm, TwoFactorAuth } from './Authentication.utils';

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

const CHECK_2AF = gql`
  query CheckTwoAuthenticationFactor($input: String!) {
    checkTwoAuthenticationFactor(code: $input) {
      id
      token
      email
      nickname
      avatar
    }
  }
`;

const MAKE_AUTH= gql`
  query MakeAuthentication($code: String!) {
    makeAuthentication(code: $code) {
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

  const [user2fa, setUser2fa] = useState(false);
  
  
/*    ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   */
/*                      REQUEST                           */
/*    ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   */
  
  const [makeAuthenticationQuery, {data: AuthenticationData, error: AuthenticationError }] = useLazyQuery(MAKE_AUTH);

  const [createUser] = useMutation(CREATE_USER);

  const [checkTwoAuthenticationFactor] = useLazyQuery(CHECK_2AF);

/*    ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   */
/*                      HANDLE                            */
/*    ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   */


  const handleRedirect = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.location.href = process.env.REACT_APP_API_42_URL?.toString() || '';
  };

  const handleCreateUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { nickname, avatar } = e.currentTarget;
    
    const user_info = {
      nickname: nickname.value,
      avatar: avatar.value
    };

      
    createUser({
      variables: {
        input: user_info
      }
    })
    .then(response => {
      // console.log('User created:', response.data.createUser);
      sessionStorage.setItem('user', JSON.stringify(response.data.createUser));
    })
    .catch(error => {
      console.error('Error creating user:', error);
    });

  };


  const handle2fa = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { code } = e.currentTarget;
  
    checkTwoAuthenticationFactor({ variables: { input: code.value } })
    .then((response: { data: { createUser: any; checkTwoAuthenticationFactor: any; }; }) => {
        // console.log('User created via 2fa:', response.data.checkTwoAuthenticationFactor);
        sessionStorage.setItem('user', JSON.stringify(response.data.checkTwoAuthenticationFactor));
    })
    .catch((error: any) => {
        console.error('Error creating user:', error);
    });
  };

/*    ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   */
/*                      USE EFFECT                        */
/*    ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   */

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlCode = urlParams.get('code');
    if (urlCode) {
      // console.log(urlCode);
      makeAuthenticationQuery({ variables: { code: urlCode } });
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, [makeAuthenticationQuery]);

  useEffect(() => {
    if (AuthenticationData) {
        setCanCheck(true);
      // console.log(AuthenticationData);
      sessionStorage.setItem('user', JSON.stringify(AuthenticationData));
    }
  }, [AuthenticationData]);

  useEffect(() => {
    if (AuthenticationError) {
        setCanCheck(true);
        if (AuthenticationError.message === "To complete authentication, 2FA verification is required")
         {
           setUser2fa(true);
         }
        else if (AuthenticationError.message === "This user does not exist yet") 
        {
          setUserExist(false);
        }
    }
  }, [AuthenticationError]);

/*    ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   */
/*                      RETURN                            */
/*    ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   */
return (
  <div>
    {sessionStorage.getItem('user') ? (
      <Home />
    ) : (
      <>
        {!canCheck ? (
          <SigninButton className="custom-signin-button" onClick={handleRedirect} />
        ) : (
          <>
            {AuthenticationError && (
              <>
                {!userExist && (
                  <CreateUserForm onSubmit={handleCreateUser} />
                )}
                {user2fa && (
                  <>
                    <TwoFactorAuth onSubmit={handle2fa} />
                  </>
                )}
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