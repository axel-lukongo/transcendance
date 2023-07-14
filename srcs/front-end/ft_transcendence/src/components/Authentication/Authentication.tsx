import React, { useEffect, useState, FC } from 'react';
import { Route, Routes} from 'react-router-dom';

import { useLazyQuery, useMutation } from '@apollo/client';
import { CHECK_2AF, MAKE_AUTH } from './graphql/Query';
import { CREATE_USER } from './graphql/Mutation';

import { SigninButton } from './micro-components/SignInButton';
import { CreateUserForm } from './micro-components/CreateUserForm';
import {TwoFactorAuthForm} from './micro-components/TwoFactorAuthForm'

import Home from '../Home/Home';
import Chat from '../Message/message';


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

    const reader = new FileReader();

    let file;
    if (avatar.files.length > 0) {
      file = avatar.files[0];
      reader.readAsDataURL(file);
    } 
    reader.onloadend = () => {
      const avatarDataUrl = reader.result as string;
  
      const user_info = {
        nickname: nickname.value,
        avatar: avatarDataUrl
      };
  
      createUser({
        variables: {
          input: user_info
        }
      })
        .then(response => {
          console.log('File:', response.data.createUser);
          sessionStorage.setItem('user', JSON.stringify(response.data.createUser));
        })
        .catch(error => {
          console.log(error);
          window.alert('Nickname is already in use. Please choose a different nickname.');
        });
    };
  
  };


  const handleTfa = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { code } = e.currentTarget;
  
    checkTwoAuthenticationFactor({ variables: { input: code.value } })
    .then((response: { data: { createUser: any; checkTwoAuthenticationFactor: any; }; }) => {
        sessionStorage.setItem('user', JSON.stringify(response.data.checkTwoAuthenticationFactor));
    })
    .catch((error: any) => {
      window.alert('The code you entered does not match the one sent to the email address');
    });
  };

/*    ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   */
/*                      USE EFFECT                        */
/*    ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   */

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlCode = urlParams.get('code');
    if (urlCode) {
      makeAuthenticationQuery({ variables: { code: urlCode } });
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, [makeAuthenticationQuery]);

  useEffect(() => {
    if (AuthenticationData) {
        setCanCheck(true);
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
		<Routes>
      <Route path="/" element={<Home />} />
      <Route path="/message" element={<Chat />} />
    </Routes>	
  ) : (
      <>
        {!canCheck ? (
          <SigninButton  onClick={handleRedirect} />
        ) : (
          <>
            {AuthenticationError && (
              <>
                {!userExist && (
                  <CreateUserForm onSubmit={handleCreateUser} />
                )}
                {user2fa && (
                  <>
                    <TwoFactorAuthForm onSubmit={handleTfa} />
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