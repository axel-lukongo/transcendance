import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';


const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(createUserInput: $input) {
      token
      nickname
      avatar
    }
  }
`;


const LOG_USER = gql`
  mutation LogUser($input: LogUserInput!) {
    logUser(logUserInput: $input) {
    $email: String!
    $password: String!
    }
  }
`;



const Login = () => {
  // const navigate = useNavigate();
  const [formState, setFormState] = useState({
    login: true,
    email: '',
    password: '',
    name: ''
  });

  const [login] = useMutation(LOG_USER,{
    variables: {
      email: formState.email,
      password: formState.password,
    }
  });

  const [signup] = useMutation(CREATE_USER, {
    variables: {

    }
  })

  return (
    <div>
      <h4 className="mv3">
        {formState.login ? 'Login' : 'Sign Up'}
      </h4>
      <div className="flex flex-column">
        {!formState.login && (
          <input
            value={formState.name}
            onChange={(e) =>
              setFormState({
                ...formState,
                name: e.target.value
              })
            }
            type="text"
            placeholder="Your login"
          />
        )}
        <input
          value={formState.email}
          onChange={(e) =>
            setFormState({
              ...formState,
              email: e.target.value
            })
          }
          type="text"
          placeholder="Your email address"
        />
        <input
          value={formState.password}
          onChange={(e) =>
            setFormState({
              ...formState,
              password: e.target.value
            })
          }
          type="password"
          placeholder="Your password"
        />
      </div>
      <div className="flex mt3">
        <button
          className="pointer mr2 button"
          onClick={formState.login ? login : signup}
        >
          {formState.login ? 'login' : 'create account'}
        </button>
        <button
          className="pointer button"
          onClick={(e) =>
            setFormState({
              ...formState,
              login: !formState.login
            })
          }
        >
          {formState.login
            ? 'need to create an account?'
            : 'already have an account?'}
        </button>
      </div>
    </div>
  );
};

export default Login;