import React from "react";
import { useMutation, gql } from "@apollo/client";
import { useState } from "react";
import { CREATE_CHANEL } from './graphql/MutationsChanel'

export default function CreateChanelForm() {

	const [createChanel] = useMutation(CREATE_CHANEL);

	const [chanel, setChanel] = useState({
		owner_id: "",
		chanel_name: "",
		chanel_size: "",
		max_users: "",
		logo: ""
	});

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		createChanel({variables: {
			input: {
				owner_id: parseInt(chanel.owner_id),
				chanel_name: chanel.chanel_name,
				chanel_size: parseInt(chanel.chanel_size),
				max_users: parseInt(chanel.max_users),
				logo: chanel.logo
			}
		}}).catch((error) => {
			console.log("Html: ", error.networkError.result);
		})
	}
	
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChanel({...chanel, [event.target.name]: event?.target.value
		})
	}


	return (
		<div>
			<h3>Create Chanel Form</h3>
			<form action="submit" onSubmit={handleSubmit}>
				<label htmlFor="owner_id">
					owner_id
				</label>
				<input
					type="text"
					name="owner_id"
					value={chanel.owner_id}
					placeholder="type her..."
					onChange={handleChange}
				/><br/>
				<label htmlFor="chanel_name">
				chanel_name
				</label>
				<input
					type="text"
					name="chanel_name"
					value={chanel.chanel_name}
					placeholder="type her..."
					onChange={handleChange}
				/><br/>
				<label htmlFor="chanel_size">
				chanel_size
				</label>
				<input
					type="text"
					name="chanel_size"
					value={chanel.chanel_size}
					placeholder="type her..."
					onChange={handleChange}
				/><br/>
				<label htmlFor="max_users">
				max_users
				</label>
				<input
					type="text"
					name="max_users"
					value={chanel.max_users}
					placeholder="type her..."
					onChange={handleChange}
				/><br/>
				<label htmlFor="logo">
				logo
				</label>
				<input
					type="text"
					name="logo"
					value={chanel.logo}
					placeholder="type her..."
					onChange={handleChange}
				/><br/>
				<button>Create +</button>
			</form>
		</div>
	)

}