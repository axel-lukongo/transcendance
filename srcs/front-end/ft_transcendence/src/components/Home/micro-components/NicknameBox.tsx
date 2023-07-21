import React, { ChangeEvent, useState, KeyboardEvent} from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../graphl/Mutation'

const NicknameBox = () => {
  const userFromStorage = JSON.parse(sessionStorage.getItem('user') || '');
  const [nickname, setNickname] = useState(userFromStorage.nickname);
  const [isEditing, setIsEditing] = useState(false);
  const [updateUser] = useMutation(UPDATE_USER);

  const handleNicknameDoubleClick = () => {
    setIsEditing(true);
  };

  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newNickname = e.target.value.slice(0, 10).replace(/[^a-zA-Z0-9]/g, '');
    setNickname(newNickname);
  };

  const handleNicknameKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setIsEditing(false);
      updateUserNickname();
    }
  };

  const handleNicknameBlur = () => {
    setIsEditing(false);
    updateUserNickname();
  };

  const updateUserNickname = () => {
    updateUser({
      variables: {
        input: {
          id: userFromStorage.id,
          nickname: nickname,
        },
      },
    })
      .then((response) => {
        console.log('User nickname is updated: ', response)
        const updatedUser = response.data.updateUser;
        if (updatedUser.nickname) {
            userFromStorage.nickname = updatedUser.nickname;
            sessionStorage.setItem('user', JSON.stringify(userFromStorage));
        }
        })
      .catch((error) => {
        console.error('Error updating user:', error);
      });
  };

  return (
    <div
      className={`nickname-box profil-box ${isEditing ? 'editing' : ''}`}
      onDoubleClick={handleNicknameDoubleClick}
    >
      {isEditing ? (
        <input
          type="text"
          value={nickname}
          onChange={handleNicknameChange}
          onKeyDown={handleNicknameKeyDown}
          onBlur={handleNicknameBlur}
          autoFocus
        />
      ) : (
        <span>{userFromStorage.nickname}</span>
      )}
    </div>
  );
};

export default NicknameBox;
