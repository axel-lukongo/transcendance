import { useMutation, gql} from '@apollo/client';
import React, { useState } from 'react';
const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(createUserInput: $input) {
      token
      email
      password
      nickname
      avatar
    }
  }
`;

const LOGIN_USER = gql`
  mutation LoginUser($input: LoginUserInput!) {
    loginUser(loginUserInput: $input) {
      email
      password
    }
  }
`;

const Login = () => {
  const [formState, setFormState] = useState({
    login: true,
    token: '',
    email: '',
    password: '',
    nickname: ''
  });

  const [isConnected, setIsConnected] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [signup] = useMutation(CREATE_USER);
  const [login] = useMutation(LOGIN_USER);

  const handleSignup = () => {
    const input = {
      email: formState.email,
      token: parseInt(formState.token),
      password: formState.password,
      nickname: formState.nickname
    };

    signup({
      variables: {
        input: input
      }
    })
      .then((response) => {
        console.log(response); 
      })
      .catch((error) => {
        console.log(error); 
      });
  };

  const handleLogin = () => {
    const input = {
      email: formState.email,
      password: formState.password
    };

    login({
      variables: {
        input: input
      }
    })
      .then((response) => {
        setIsConnected(true);
        console.log('client is connected')
        // Traitement de la réponse
      })
      .catch((error) => {
        setIsConnected(false);
        setErrorMessage('Wrong email or password.');
        // Gestion de l'erreur
      });
  };

  return (
    <div>
      <h4 className="mv3">
        {formState.login ? 'Login' : 'Sign Up'}
      </h4>
      {isConnected && (
        <div className="success-box">
          You are connected.
        </div>
      )}
      {errorMessage && (
        <div className="error-box">
          {errorMessage}
        </div>
      )}
      <div className="flex flex-column">
        {!formState.login && (
          <>
            <input
              value={formState.token}
              onChange={(e) => setFormState({
                ...formState,
                token: e.target.value
              })}
              type="text"
              placeholder="Your token (ca va changer)"
            />
            <input
              value={formState.nickname}
              onChange={(e) => setFormState({
                ...formState,
                nickname: e.target.value
              })}
              type="text"
              placeholder="Your nickname" 
            />
          </>
        )}
        <input
          value={formState.email}
          onChange={(e) => setFormState({
            ...formState,
            email: e.target.value
          })}
          type="text"
          placeholder="Your email address"
        />
        <input
          value={formState.password}
          onChange={(e) => setFormState({
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
          onClick={formState.login ? handleLogin : handleSignup}
        >
          {formState.login ? 'Login' : 'Create Account'}
        </button>
        <button
          className="pointer button"
          onClick={() => setFormState({
            ...formState,
            login: !formState.login
          })}
        >
          {formState.login
            ? 'Need to create an account?'
            : 'Already have an account?'}
        </button>
      </div>
    </div>
  );
};

export default Login;
