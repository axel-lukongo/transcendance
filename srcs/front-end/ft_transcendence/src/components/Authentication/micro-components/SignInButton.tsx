import React from "react";
import '../css/Authentication.css'

interface PropsSignIn {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  }
  
  export const SigninButton = ({ onClick }: PropsSignIn): JSX.Element => {
    return (
      <button className='SignIn-Button'  onClick={onClick}>
        <div className="SignIn-Text">
          SIGN IN
        </div>
      </button>
    );
  };
  