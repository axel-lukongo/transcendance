import React, {useState} from "react";
import '../css/Authentication.css'

interface PropsTfaCode {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const TwoFactorAuthForm = ({ onSubmit }: PropsTfaCode): JSX.Element => {
  const [code, setCode] = useState("");

  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(event);
  };

  return (
    <div className="tfa-form">
      <h1 className="tfa-form-title">Authentification à double facteur requise</h1>
      <form onSubmit={handleSubmit}>
        <div className="tfa-form-input">
          <input
            type="text" className="tfa-form-input-text" placeholder="Enter your code" name="code" value={code} onChange={handleCodeChange}
          />
        </div>
        <button className="submit-button" type="submit" hidden={!code}>
          Envoyer
        </button>
      </form>
    </div>
  );
};
