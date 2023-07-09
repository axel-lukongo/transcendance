import React, { useEffect, useState, FC } from 'react';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import MyMessage from '../message/my_message_app';
import styles from '../../css/Authentication.module.css'

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
  
  const [avatarSuccess, setAvatarSucces] = useState(false);
  
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
      console.log('User created:', response.data.createUser);
      sessionStorage.setItem('user', JSON.stringify(response.data.createUser));
    })
    .catch(error => {
      console.error('Error creating user:', error);
    });

   console.log(nickname.value,  avatar.value);
  };


  const handle2fa = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { verificationCode } = e.currentTarget;
  
    checkTwoAuthenticationFactor({ variables: { input: verificationCode.value } })
    .then((response: { data: { createUser: any; checkTwoAuthenticationFactor: any; }; }) => {
        console.log('User created via 2fa:', response.data.checkTwoAuthenticationFactor);
        sessionStorage.setItem('user', JSON.stringify(response.data.checkTwoAuthenticationFactor));
    })
    .catch((error: any) => {
        console.error('Error creating user:', error);
    });
  };

  const handleAvatarOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
  
    if (files && files.length > 0) {
      const file = files[0];
      const fileType = file.type;
      const fileSize = file.size;
      const maxSize = 2 * 1024 * 1024; // Taille maximale du fichier en octets (ex. 2 Mo) 
  
      // Vérifications du format et de la taille du fichier
      if (fileType === 'image/png' || fileType === 'image/jpeg') {
        if (fileSize <= maxSize) {
          // Fichier valide, vous pouvez effectuer d'autres traitements ici
          setAvatarSucces(true);
          console.log('Fichier valide :', file);
        } 
        else{
          setAvatarSucces(false);
          console.error('La taille du fichier dépasse la limite maximale.');
        }
      } 
      else
      {
        setAvatarSucces(false);
        console.error('Le format de fichier sélectionné n\'est pas pris en charge.');
      }
    }
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
        if (AuthenticationError.message === "To complete authentication, 2FA verification is required")
         {
          console.log("ici 2fa");
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
      <MyMessage />
    ) : (
      <>
        {!canCheck ? (
          <button className={styles.button} onClick={handleRedirect}>SIGN IN</button>
        ) : (
          <>
            {AuthenticationError && (
              <>
                {!userExist && (
                  <>
                    <h1>Malheureusement, tu n'as pas encore de profil enregistré sur notre site, je te propose d'en créer un !</h1>
                    <form onSubmit={handleCreateUser}>
                      <input type="text" placeholder="Nickname" name="nickname" />
                      <input type="file" accept="image/*" name="avatar" onChange={handleAvatarOnChange} />
                      <button type="submit" disabled={avatarSuccess ? false : true}>Envoyer</button>
                    </form>
                  </>
                )}
                {user2fa && (
                  <>
                    <h1>Authentification à double facteur requise</h1>
                    <form onSubmit={handle2fa}>
                      <input type="text" placeholder="Code de vérification" name="verificationCode" />
                      <button type="submit">Valider</button>
                    </form>
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
