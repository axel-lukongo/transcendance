import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { channelfocus, User } from "../../../interfaces/interfaces";
import { ALL_USERS } from '../../graphql/Query'
import { ADD_CHANEL } from "../../graphql/Mutation";
import add_user from '../../../../image/add-group-svgrepo-com.svg'

export interface IAddUserInChanProps {
	user: User,
	chanel_focus: channelfocus;
}

export default function AddUserInChan({chanel_focus, user} : IAddUserInChanProps) {

	const [users_list, setUsersList] = useState("");

	const {data, loading, error, refetch} = useQuery(ALL_USERS, { 
		variables: {
			user_id: user.id,
			chanel_id: parseInt(chanel_focus.id)
		}
	});

	const [addUser] = useMutation(ADD_CHANEL);

	if (error)
		return (<div>An Error as occured</div>);
	
	if (loading)
		return (
			<div>TEST</div>
		)
	if (data)
		console.log(data);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setUsersList(e.target.value)
	}

	const handleClickBtn = (user: User) => {
		addUser({ variables: {
			input: {
				user_id: user.id,
				chanel_id: parseInt(chanel_focus.id),
				is_admin: false,
				is_muted: false,
				mute_start_time: 0,
			}
		}})
		.then(() => {
			refetch();

		})
		.catch(() => {
			return 'you cannot add a banned user';
		})
	}

	return (
		<div id="add-usr-in-chan-box">
			<input
				type="searchbar"
				name="search_contact"
				value={users_list}
				id="searchbar-add-chan"
				placeholder="search..."
				onChange={handleChange}
			/>
			<div id="search-result-add-in-chan">
				{
					data.searchUserForChan.filter((elem: User) => (elem.nickname.includes(users_list))
					).map((e: User ) => (
						<div key= {e.id} className="card-add-user-in-chan">
							<img src={e.avatar} alt="avatar" className="avatar-add-chan"/>
							<p>{e.nickname}</p>
							<button id="add-btn-in-chan" onClick={() => { handleClickBtn(e) }} >
								<img id='img-add-user-in-chan' src={add_user} />
							</button>
						</div>
					))
				}
			</div>
		</div>
	)
}