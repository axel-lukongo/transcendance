import React from "react";
import "../../css/Authentication.css";

interface Props {
  className: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const SigninButton = ({ className, onClick }: Props): JSX.Element => {
  return (
    <button className={`SignIn-Button ${className}`} onClick={onClick}>
      <div className="SignIn-Text">
        SIGN IN
      </div>
    </button>
  );
};
