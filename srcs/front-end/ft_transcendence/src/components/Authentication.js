import { useMutation, gql } from '@apollo/client';
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

const SignUp = ({ setFormState }) => {
  const [formState, setSignUpFormState] = useState({
    token: '',
    email: '',
    password: '',
    nickname: ''
  });

  const [signup] = useMutation(CREATE_USER);

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

  return (
    <div>
      <h4 className="mv3">Sign Up</h4>
      <div className="flex flex-column">
        <input
          value={formState.token}
          onChange={(e) => setSignUpFormState({
            ...formState,
            token: e.target.value
          })}
          type="text"
          placeholder="Your token (ca va changer)"
        />
        <input
          value={formState.nickname}
          onChange={(e) => setSignUpFormState({
            ...formState,
            nickname: e.target.value
          })}
          type="text"
          placeholder="Your nickname" 
        />
        <input
          value={formState.email}
          onChange={(e) => setSignUpFormState({
            ...formState,
            email: e.target.value
          })}
          type="text"
          placeholder="Your email address"
        />
        <input
          value={formState.password}
          onChange={(e) => setSignUpFormState({
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
          onClick={handleSignup}
        >
          Create Account
        </button>
        <button
          className="pointer button"
          onClick={() => setFormState({
            ...formState,
            login: true
          })}
        >
          Already have an account?
        </button>
      </div>
    </div>
  );
};

const SignIn = ({ setFormState }) => {
  const [formState, setSignInFormState] = useState({
    email: '',
    password: ''
  });

  const [signin] = useMutation(LOGIN_USER);

  const handleSignin = () => {
    const input = {
      email: formState.email,
      password: formState.password
    };

    signin ({
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

const Login = () => {
  const [formState, setFormState] = useState({
    login: true
  });

  return (
    <div>
      {formState.login ? ( <SignIn setFormState={setFormState} />) : ( <SignUp setFormState={setFormState} />)}
    </div>
  );
};

export default Login;
