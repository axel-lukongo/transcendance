import React from 'react';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(createUserInput: $input) {
      id
      token
      nickname
      avatar
    }
  }
`;

const App = () => {
  const [createUser] = useMutation(CREATE_USER);

  const handleCreateUser = async () => {
    try {
      const response = await createUser({
        variables: {
          input: {
            id: 1,
            token: 123456,
            nickname: 'John',
            avatar: 'https://example.com/avatar.jpg',
          },
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={handleCreateUser}>Create User</button>
    </div>
  );
};

export default App;