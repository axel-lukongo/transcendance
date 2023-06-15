import { useState } from "react";
import { useMutation, gql } from "@apollo/client";


const CREATE_CHANEL = gql`mutation CreateChanel($input: CreateChanelInput!){
	createChanel(createChanelInput: $input){
		owner_id,
		chanel_name,
		chanel_size,
		max_users
	}
}`


export default function CreateChanel() {

	const [chanel, setChanel] = useState({
		owner_id: "",
		chanel_name: '',
		chanel_size: "",
		max_users: ""
});

	const [createChanel] = useMutation(CREATE_CHANEL);

	const handleChange = (event) => {
		console.log(event.target.value);
		const {name, value} = event.target;
		setChanel((prevChanel) => ({ ...prevChanel, [name]: value}));
	}
	
	const handleSubmit = (event) => {
		event.preventDefault();
		// console.log(chanel);
		createChanel({
			variables: {
				input: {
					owner_id: parseInt(chanel.owner_id),
					chanel_name: chanel.chanel_name,
					chanel_size: parseInt(chanel.chanel_size),
					max_users: parseInt(chanel.max_users)
				}
			}
		}).then((response) =>  {
			setChanel({
				owner_id: '',
				chanel_name: '',
				chanel_size: '',
				max_users: '' 
			})})
			.catch((response) => {
				console.log("error");
			})
		}
	
	return (
		// <div>
			<form onSubmit={handleSubmit}>
				<h4>Chanel Creation section</h4>
				<label>
					Name:
					<input type="text" name="chanel_name" value={chanel.chanel_name} onChange={handleChange} />
				</label><br />
				<label>
					Size:
					<input type="text" name="chanel_size" value={chanel.chanel_size} onChange={handleChange} />
				</label><br />
				<label>
					Max users:
					<input type="text" name="max_users" value={chanel.max_users} onChange={handleChange} />
				</label><br />
				<label>
					Owner_id:
					<input type="text" name="owner_id" value={chanel.owner_id} onChange={handleChange} />
				</label><br />
				<button action="submit">Send</button><br />
			</form>
		// </div>
	);
}
