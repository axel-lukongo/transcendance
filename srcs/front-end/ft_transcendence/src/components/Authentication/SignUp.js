import React, { useState, useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';

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

const SignUp = ({ setFormState }) => {
  const [formState, setSignUpFormState] = useState(() => {
    const storedData = window.sessionStorage.getItem('signup-form');
    return storedData ? JSON.parse(storedData) : {
      login: false,
      token: '',
      email: '',
      password: '',
      nickname: ''
    };
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

  useEffect(() => {
    window.sessionStorage.setItem('signup-form', JSON.stringify(formState));
  }, [formState]);

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
 export default SignUp;