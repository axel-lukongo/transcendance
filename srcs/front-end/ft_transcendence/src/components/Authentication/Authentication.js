import React, { useState, useEffect } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';

const Login = () => {
  const [formState, setFormState] = useState(() => {
    const storedData = window.sessionStorage.getItem('auth-form');
    return storedData ? JSON.parse(storedData) : { login: true };
  });

  useEffect(() => {
    window.sessionStorage.setItem('auth-form', JSON.stringify(formState));
  }, [formState]);

  return (
    <div>
      {formState.login ? (<SignIn setFormState={setFormState} key="<signin-form" />) : (<SignUp setFormState={setFormState} key="signup-form" />)}
    </div>
  );
};


export default Login;
