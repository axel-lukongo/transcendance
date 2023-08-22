import React, { useEffect, useState, FC, useContext } from 'react';
import { Route, Routes} from 'react-router-dom';

import { useLazyQuery, useMutation } from '@apollo/client';
import { CHECK_2AF, MAKE_AUTH } from './graphql/Query';
import { CREATE_USER } from './graphql/Mutation';

import { SigninButton } from './micro-components/SignInButton';
import { CreateUserForm } from './micro-components/CreateUserForm';
import {TwoFactorAuthForm} from './micro-components/TwoFactorAuthForm'

import Home from '../Home/Home';
import Pong from '../Pong/Pong';
import Message from '../Message/message';
import Contact from '../Contact/Contact';
import LeaderBoard from '../LeaderBoard/LeaderBoard';
import { WebSocketContext } from '../../WebSocketProvider';

// import { MessageContext } from '../Message/micro-components/MessageContext';

const Authentication: FC = () => {

/*    ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   */
/*                      STATE                             */
/*    ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   */

  const [canCheck, setCanCheck] = useState(false);
  
  const [userExist, setUserExist] = useState(true);

  const [user2fa, setUser2fa] = useState(false);

  const [access, setAccess] = useState(false);

  // const wsContext = useContext(WebSocketContext);
  
  
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
    
    const reader = new FileReader();
  
    if (avatar && avatar.files.length > 0) {
      const file = avatar.files[0];
      reader.readAsDataURL(file);
  
      reader.onloadend = () => {
        const avatarDataUrl = reader.result as string;
        user_info.avatar = avatarDataUrl;
  
        createUser({
          variables: {
            input: user_info
          }
        })
          .then(response => {
            const {token} = response.data.createUser;
            sessionStorage.setItem('userToken', JSON.stringify(token));
            setAccess(true);
            // wsContext?.updateUser(user);
          })
          .catch(error => {
            console.log(error);
            window.alert('Nickname is already in use. Please choose a different nickname.');
          });
        };
      } else {
        // No avatar file selected
        createUser({
          variables: {
            input: user_info
          }
        })
        .then(response => {
          const {token} = response.data.createUser;
          sessionStorage.setItem('userToken', JSON.stringify(token));
          setAccess(true);
          // wsContext?.updateUser(user);
        })
        .catch(error => {
          console.log(error);
          window.alert('Nickname is already in use. Please choose a different nickname.');
        });
      }
    };
    
    
    const handleTfa = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const { code } = e.currentTarget;
      
      checkTwoAuthenticationFactor({ variables: { input: code.value } })
      .then((response: { data: { createUser: any; checkTwoAuthenticationFactor: any; }; }) => {
        
        const {token} = response.data.checkTwoAuthenticationFactor
        sessionStorage.setItem('userToken', JSON.stringify(token));
        setAccess(true);
      
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
        const {token, state} = AuthenticationData.makeAuthentication;
        
        if (state === -1)
        {
          setCanCheck(true);
          setUserExist(false);
        }
        else if (state == 0)
        {
          setCanCheck(true);
          setUser2fa(true);
        }
        else
        {
          setAccess(true);
        }
        sessionStorage.setItem('userToken', JSON.stringify(token));
        // wsContext?.updateUser(user);

      }
    }, [AuthenticationData]);
    

/*    ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   */
/*                      RETURN                            */
/*    ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   */
return (
  <div>
    {sessionStorage.getItem('userToken') && access? (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pong" element={<Pong />} />
        <Route path="/message" element={<Message />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/leaderBoard' element={<LeaderBoard />} />
      </Routes>
    ) : (
      <>
        {!canCheck ? (
          <SigninButton onClick={handleRedirect} />
        ) : (
          <>
            {AuthenticationData && !userExist && (
              <CreateUserForm onSubmit={handleCreateUser} />
            )}
            {AuthenticationData && user2fa && (
              <TwoFactorAuthForm onSubmit={handleTfa} />
            )}
          </>
        )}
      </>
    )}
  </div>
);


}

export default Authentication;