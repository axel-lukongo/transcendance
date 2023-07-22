import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_CONTACT } from "../../graphql/Mutations";
import { User } from "../../../Interface";
import { IAddContact } from '../../../interfaces/interfaces'

export default function AddContactBtn({id, nickname, user, refetch}: IAddContact) {

	const [addContact] = useMutation(CREATE_CONTACT)
	
	const handleSubmit = () => {
		addContact({
			variables: {
				input: {
					user_id: user.id,
					contact_id: id
				}
			}
		}).then(() => {
			refetch();
		})
	}
	
	return (
		<button onClick={handleSubmit} className="add_btn">+</button>
	);
}