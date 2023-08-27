import { useEffect } from 'react';
import { useRef } from 'react';
import { useMutation } from '@apollo/client';
// import { CREATE_MUTATION_1, CREATE_MUTATION_2 } from '../graphql/mutations';
import { ADD_USER_IN_CHANEL } from '../../Contact/graphql/Mutations';
import { Chanel, channelfocus  } from '../../interfaces/interfaces';
import { __CHAT__ } from '../message';

interface MyComponentProps {
	hasFetchedData: Chanel | undefined; // Définir le type de l'état hasFetchedData
	setchanel_focus: (element: Chanel) => void;
    // handleChange: (element: Chanel) => void;
}

const CreatUserChan = ({ hasFetchedData, setchanel_focus }: MyComponentProps) => {
  const [createMutation2, { loading: loading2, error: error2 }] = useMutation(ADD_USER_IN_CHANEL);
  const user = JSON.parse(sessionStorage.getItem('user') || '');
  const isConditionExecuted = useRef<boolean>(false);


  useEffect(() => {

	if (hasFetchedData && !isConditionExecuted.current){

		createMutation2({
			variables: {
			  input: {
				  user_id: hasFetchedData.interlocutor_id,
				  chanel_id: hasFetchedData?.id,
				  pending: false,
				  is_admin: false,
				  is_muted: false,
				  mute_start_time: 0,
			  }
			},
		}).then(()=>{
		  setchanel_focus(hasFetchedData);
		})
		.catch((error) => {
			console.log("Html: ", error.message);
		});
		isConditionExecuted.current = true;
	}
  }, [hasFetchedData]);

  // Gérer les états de chargement et d'erreur pour afficher le résultat approprié
  if (loading2) {
    return <div></div>;
  }

  if ( error2) {
    return <div>Error</div>;
  }



  return (
    <div>
      {/* les 2 mutation ont ete fait */}
    </div>
  );
};

export default CreatUserChan;
