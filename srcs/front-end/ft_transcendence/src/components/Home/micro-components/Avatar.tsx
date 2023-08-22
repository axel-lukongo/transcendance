import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../graphl/Mutation';

const AvatarBox = () => {
  const userFromStorage = JSON.parse(sessionStorage.getItem('user') || '');
  const [avatar, setAvatar] = useState(userFromStorage.avatar);
  const [updateUser] = useMutation(UPDATE_USER);

  const handleAvatarFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const avatarFiles = e.target.files?.[0];

    if (avatarFiles) {
      const maxSize = 2 * 1024 * 1024;

      const allowedTypes = ['image/png', 'image/jpeg'];
      if (!allowedTypes.includes(avatarFiles.type)) {
        alert('Please select a PNG or JPG type image.');
        return;
      } else if (avatarFiles.size > maxSize) {
        alert('Please select a PNG or JPG image. File size should not exceed 2MB.');
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(avatarFiles);

      reader.onloadend = () => {
        setAvatar(reader.result as string);
        updateUser({
          variables: {
            input: {
              id: userFromStorage.id,
              avatar: reader.result as string,
            },
          },
        })
          .then((response) => {
            console.log('User avatar is updated:', response);
            const updatedAvatar = response.data.updateUser;
            if (updatedAvatar) {
              userFromStorage.avatar = response.data.updateUser.avatar;
              sessionStorage.setItem('user', JSON.stringify(userFromStorage));
            }
          })
          .catch((error) => {
            console.error('Error updating user:', error);
          });
      };
    }
  };

  const handleAvatarDoubleClick = () => {
    const fileInput = document.getElementById('avatarImg');
    if (fileInput) {
      fileInput.click();
    }
  };


  return (
    <div className="avatar-box profil-box" onDoubleClick={handleAvatarDoubleClick}>
        <img src={avatar} alt="User Avatar" />
      <input
        type="file"
        accept=".png,.jpg,.jpeg"
        id="avatarImg"
        name="avatar"
        onChange={handleAvatarFile}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default AvatarBox;
