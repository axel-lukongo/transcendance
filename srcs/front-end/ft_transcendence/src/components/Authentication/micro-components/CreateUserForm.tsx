import React ,{useState}from "react";
import '../css/Authentication.css'

interface PropsCreateUser {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  }
  
  export const CreateUserForm = ({ onSubmit }: PropsCreateUser): JSX.Element => {
    const [nickname, setNickname] = useState("");
    const [avatar, setAvatar] = useState<File | null>(null);
  
    const handleAvatarOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
  
      if (files && files.length > 0) {
        const file = files[0];
        const fileType = file.type;
        const fileSize = file.size;
        const maxSize = 2 * 1024 * 1024; // Taille maximale du fichier en octets (ex. 2 Mo)
  
        // Vérifications du format et de la taille du fichier
        if (fileType === 'image/png' || fileType === 'image/jpeg') {
          if (fileSize <= maxSize) {
            console.log('Fichier valide :', file);
            setAvatar(file);
          } else {
            console.error('La taille du fichier dépasse la limite maximale.');
          }
        } else {
          console.error('Le format de fichier sélectionné n\'est pas pris en charge.');
        }
      }
    };
  
    const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setNickname(event.target.value);
    };
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      onSubmit(event);
    };
  
    return (
      <div className="create-user-form">
        <h1 className="form-title">
          Malheureusement tu n’as pas encore de profil !
          <br /> Je te propose d’en créer un.
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label className="form-label">Nickname</label>
            <div className="form-input">
              <input type="text" className="form-input-text" placeholder="Enter your nickname" name="nickname" value={nickname} onChange={handleNicknameChange} />
            </div>
          </div>
          <div className="form-field">
            <label className="form-label">Avatar</label>
            <div className="form-input form-avatar">
              <input type="file" accept="image/*" name="avatar" onChange={handleAvatarOnChange} />
            </div>
          </div>
          <button className="submit-button" type="submit" hidden={!avatar || !nickname}>Envoyer</button>
        </form>
      </div>
    );
  };