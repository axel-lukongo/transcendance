import React from "react";
import "../../css/Authentication.css";


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

interface PropsCreateUser {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const CreateUserForm = ({ onSubmit }: PropsCreateUser): JSX.Element => {

  return (
    <div className="create-user-form">
      <h1 className="form-title">
        Malheureusement tu n’as pas encore de profil !
        <br /> Je te propose d’en créer un.
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-field">
          <label className="form-label">Nickname</label>
          <div className="form-input">
            <input type="text" className="form-input-text" placeholder="Enter your nickname" />
          </div>
        </div>
        <div className="form-field">
          <label className="form-label">Avatar</label>
          <div className="form-input form-avatar" >
            <input type="file" accept="image/*" className="form-input-avatar" />
          </div>
        </div>
      </form>
        <button className="submit-button" type="submit">Submit</button>
    </div>
  );
};
