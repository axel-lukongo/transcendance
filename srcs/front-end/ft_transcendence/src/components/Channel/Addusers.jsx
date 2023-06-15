import {useState} from "react"
import { gql, useMutation } from "@apollo/client"

/* const ADD_USER=  gql` mutation AddUserChanel($input: AddUserChanel) {
	addUser($input: addUserChanel) {
		user_id
		chanel_id
		pending
	}
}`*/

export default function AddUserChanel() {

	// const [addUser] = useMutation(ADD_USER);
	
	const [formAdd, setFormAdd] = useState({
		user_id: "",
		chanel_id: "",
	})

	return (
		<div>
			<p>ici pour add un User</p><br />
		</div>
	)
}