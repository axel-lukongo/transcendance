import React ,{useState}from "react";
import '../css/Authentication.css'

interface PropsCreateUser {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    
  }
  
  export const CreateUserForm = ({ onSubmit }: PropsCreateUser): JSX.Element => {
    const [nickname, setNickname] = useState("");
    const [avatar, setAvatar] = useState<File | null>(null);
    const [nicknameError, setNicknameError] = useState("");
    const [avatarError, setAvatarError] = useState("");
  
    const handleAvatarOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
  
      if (files && files.length > 0) {
        const file = files[0];
        const fileType = file.type;
        const fileSize = file.size;
        const maxSize = 50000; //50Ko
  
        // Vérifications du format et de la taille du fichier
        if (fileType === 'image/png' || fileType === 'image/jpeg') {
          if (fileSize <= maxSize) {
            setAvatar(file);
            setAvatarError('');
          } else {
            setAvatarError('Please select a PNG or JPG image File size should not exceed 50Ko.');
          }
        } else {
          setAvatarError('Please select a PNG or JPG type image.');
        }
      }
    };
  
    const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const input = event.target.value;
      const alphanumericRegex = /^[a-zA-Z0-9]+$/;
  
      if (input.length > 10) {
        setNicknameError("The nickname cannot exceed 10 characters.");
      } else if (input && !alphanumericRegex.test(input)) {
        setNicknameError("The nickname can only contain alphanumeric characters and no accents");
      } else {
        setNicknameError("");
      }
      setNickname(input);
    };
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      onSubmit(event);
    };
    return (
      <div className="create-user-form">
        <h1 className="form-title">
        Unfortunately you don't have a profile yet...
          <br /> Let's create one!
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label className="form-label">Nickname</label>
            <div className="form-input">
              <input type="text" className="form-input-text" placeholder="Enter your nickname" name="nickname" value={nickname} onChange={handleNicknameChange} />
            {nicknameError && <p className="form-nickname-text-error">{nicknameError}</p>}
            </div>
          </div>
          <div className={`form-field ${nicknameError ? "form-field-error" : ""}`}>
            <label className="form-label">Avatar</label>
            <div className="form-input form-avatar">
              <input type="file" accept=".png,.jpg,.jpeg" name="avatar"  onChange={handleAvatarOnChange} />
            </div>
          </div>
              {avatarError && <p className="form-avatar-text-error">{avatarError}</p>}
          <button className="submit-button" type="submit" hidden={!nickname || !!nicknameError || !!avatarError}>
            Envoyer
          </button>
        </form>
      </div>
    ); 
  };