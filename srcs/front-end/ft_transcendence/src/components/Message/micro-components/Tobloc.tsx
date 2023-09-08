

import React from 'react';
import { useMutation, gql } from '@apollo/client';
import { CREATE_TOBLOC_MUTATION } from '../graphql/Mutation';
import '../../Contact/css/profil.css';
interface TheId {
  blockerId: number;
  blockedId: number;
  handleshowBlocked: (state:boolean) => void;
}


const Tobloc: React.FC<TheId> = ({ blockerId, blockedId, handleshowBlocked }) => {
  const [createTobloc, {data, loading}] = useMutation(CREATE_TOBLOC_MUTATION);

  const handleCreateTobloc = async () => {
    try {
      await createTobloc({
		variables: 
			{
				blockerId, 
				blockedId
			} 
		});
	handleshowBlocked(false);
    } catch (error) {
      console.error('Error creating Tobloc:', error);
    }
  };

  return (
    <div className='profil-modal'>
		<div className='blocked-container' >
			blocked this user?
			<button className='confirme-blocked' onClick={handleCreateTobloc} >Confirme</button>
			<button className='cancel-blocked' onClick={() => handleshowBlocked(false)}>cancel</button>
		</div>
    </div>
  );
};

export default Tobloc;
