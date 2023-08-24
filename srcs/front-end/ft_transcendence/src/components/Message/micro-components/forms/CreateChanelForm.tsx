import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { CREATE_CHANEL } from '../../graphql/Mutation'
import { ICreateChanelFormProps } from '../../../interfaces/interfaces'
import { read } from "fs";


export default function CreateChanelForm({user, handleChanelRefetch}: ICreateChanelFormProps) {

	/* //////////////////////////////////////////////////////// */
	/* States */

	const [createChanel] = useMutation(CREATE_CHANEL);

	const [chanel, setChanel] = useState({
		chanel_name: "",
		chanel_size: "",
		max_users: "",
		logo: "",
		private: true
	});

	/* //////////////////////////////////////////////////////// */
	/* Handlers */

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (chanel.chanel_name !== "") {
			createChanel({variables: {
				input: {
					owner_id: user.id, 
					chanel_name: chanel.chanel_name,
					chanel_size: parseInt(chanel.chanel_size),
					max_users: parseInt(chanel.max_users),
					logo: chanel.logo,
					private: chanel.private
				}
			}}).then(() => {
				handleChanelRefetch();
			}).catch((error) => {
				console.log("Html: ", error.networkError.result);
			})
		}
	}
	
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChanel({...chanel, [event.target.name]: event?.target.value
		})
	}

	const handleLogo = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		console.log(event.target.files);
		if (event.target.files && event.target.files.length > 0) {
			if (event.target.files[0].size <= (2 * 1024 * 1024)) {
				const reader = new FileReader();
				reader.readAsDataURL(event.target.files[0]);

				reader.onloadend = () => {
					const string_logo = reader.result as string;
					setChanel({...chanel, logo: string_logo});
				}
			}
		}
	}

	const handleSelect = (e: any) => {
		if (e.target.value == "true")
			setChanel({...chanel, private: true});
		else
			setChanel({...chanel, private: false});
		// console.log(e);
	}

	/* //////////////////////////////////////////////////////// */
	/* JSX.Element return */

	return (
		<div id='create-chanel-box'>
			<h3>Create Chanel</h3>
			<form action="submit" onSubmit={handleSubmit}>
				<label htmlFor="chanel_name">
				chanel_name
				</label><br />
				<input
					type="textx"
					name="chanel_name"
					value={chanel.chanel_name}
					placeholder="type her..."
					onChange={handleChange}
				/><br/>
				<label htmlFor="chanel_size">
				chanel_size
				</label><br />
				<input
					type="text"
					name="chanel_size"
					value={chanel.chanel_size}
					placeholder="type her..."
					onChange={handleChange}
				/><br/>
				<label htmlFor="max_users">
				max_users
				</label><br />
				<input
					type="text"
					name="max_users"
					value={chanel.max_users}
					placeholder="type her..."
					onChange={handleChange}
				/><br/>
				<label htmlFor="logo">
				logo
				</label><br />
				<input
					type="file"
					name="logo"
					placeholder="type her..."
					accept=".png,.svg,.jpeg,.jpg"
					onChange={handleLogo}
				/><br/>
				<label htmlFor="private">
					private
				</label><br />
				<div className="radio-select">
					yes 
					<input type="radio" onClick={handleSelect} value={"true"} name="private" id="radio-create-chan-btn-1" defaultChecked/>
					No
					<input type="radio" onClick={handleSelect} value={"false"} name="private" id="radio-create-chan-btn-2" />
					<br />
				</div>
				{/* need to add a toggle btn her */}
				<button id="create-chan-submit-btn">Create +</button>
			</form>
		</div>
	)

}