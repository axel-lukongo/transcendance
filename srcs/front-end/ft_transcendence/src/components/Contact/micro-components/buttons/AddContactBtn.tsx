import { useMutation } from "@apollo/client";
import { CREATE_CONTACT } from "../../graphql/Mutations";
import { IAddContact } from '../../../interfaces/interfaces'
import addBtn from '/ft_transcendence/src/image/plus.png'

export default function AddContactBtn({id, user, refetch, handleRefreshPending}: IAddContact) {

	const [addContact, { loading: loading, error: error }] = useMutation(CREATE_CONTACT)
	
	const handleSubmit = () => {
		addContact({
			variables: {
				input: {
					user_id: user.id,
					contact_id: id
				}
			}
		}).then(() => {
			handleRefreshPending();
			refetch();
		}).catch((error) => {
			console.log("you can't add this user: ", error.message);
		});

	}
	if(error){
		return(
			<div>{error.message}  </div>
		)
	}
	
	return (
		<button onClick={handleSubmit} className="add_btn"><img src={addBtn} alt="add_btn" id="add_btn_img"/></button>
	);
}