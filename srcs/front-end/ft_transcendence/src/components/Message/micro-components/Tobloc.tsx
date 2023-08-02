
// interface the_id{
// 	blockerId: number
// 	blockedId: number
// }

// export default function Tobloc({blockerId, blockedId}: the_id){

// }


import React from 'react';
import { useMutation, gql } from '@apollo/client';
import { CREATE_TOBLOC_MUTATION } from '../graphql/Mutation';
interface TheId {
  blockerId: number;
  blockedId: number;
}


const Tobloc: React.FC<TheId> = ({ blockerId, blockedId }) => {
  const [createTobloc] = useMutation(CREATE_TOBLOC_MUTATION);

  const handleCreateTobloc = async () => {
    try {
      await createTobloc({
		variables: 
			{
				blockerId, 
				blockedId
			} 
		});
      console.log('Tobloc created successfully!');
    } catch (error) {
      console.error('Error creating Tobloc:', error);
    }
  };

  return (
    <div>
      {/* Your React component UI here */}
      <button onClick={handleCreateTobloc}>Create Tobloc</button>
    </div>
  );
};

export default Tobloc;
