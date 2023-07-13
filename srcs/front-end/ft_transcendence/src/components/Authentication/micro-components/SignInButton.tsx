import React from "react";
import '../css/Authentication.css'

interface PropsSignIn {
    className: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  }
  
  export const SigninButton = ({ className, onClick }: PropsSignIn): JSX.Element => {
    return (
      <button className={`SignIn-Button ${className}`} onClick={onClick}>
        <div className="SignIn-Text">
          SIGN IN
        </div>
      </button>
    );
  };
  