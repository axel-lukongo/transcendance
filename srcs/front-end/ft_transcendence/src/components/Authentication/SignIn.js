import React, { useState, useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';

const LOGIN_USER = gql`
  mutation LoginUser($input: LoginUserInput!) {
    loginUser(loginUserInput: $input) {
      email
      password
    }
  }
`;

const SignIn = ({ setFormState }) => {
  const [formState, setSignInFormState] = useState(() => {
    const storedData = window.sessionStorage.getItem('signin-form');
    return storedData ? JSON.parse(storedData) : {
      login: true,
      email: '',
      password: ''
    };
  });

  const [signin] = useMutation(LOGIN_USER);

  const handleSignin = () => {
    const input = {
      email: formState.email,
      password: formState.password
    };

    signin({
      variables: {
        input: input
      }
    })
      .then((response) => {
        console.log('client is connected');
        // Traitement de la réponse
      })
      .catch((error) => {
        console.log('Wrong email or password.');
        // Gestion de l'erreur
      });
  };

  useEffect(() => {
    window.sessionStorage.setItem('signin-form', JSON.stringify(formState));
  }, [formState]);

  return (
    <div>
      <h4 className="mv3">Sign In</h4>
      <div className="flex flex-column">
        <input
          value={formState.email}
          onChange={(e) => setSignInFormState({
            ...formState,
            email: e.target.value
          })}
          type="text"
          placeholder="Your email address"
        />
        <input
          value={formState.password}
          onChange={(e) => setSignInFormState({
            ...formState,
            password: e.target.value
          })}
          type="password"
          placeholder="Your password"
        />
      </div>
      <div className="flex mt3">
        <button
          className="pointer mr2 button"
          onClick={handleSignin}
        >
          Sign In
        </button>
        <button
          className="pointer button"
          onClick={() => setFormState({
            ...formState,
            login: false
          })}
        >
          Need to create an account?
        </button>
      </div>
    </div>
  );
};

export default SignIn;
