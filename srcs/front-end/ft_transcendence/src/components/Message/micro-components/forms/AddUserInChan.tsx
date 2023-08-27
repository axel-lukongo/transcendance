import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { channelfocus, User } from "../../../interfaces/interfaces";
import { ALL_USERS } from '../../graphql/Query'
import { ADD_CHANEL } from "../../graphql/Mutation";

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
	refetch();

	if (error)
		return (<div>An Error as occured</div>);
	
	if (loading)
		return (
			<div>loading...</div>
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
		}}).catch(() => {
			return 'you cannot add a banned user';
		})
	}

	return (
		<div>
			<input
				type="searchbar"
				name="search_contact"
				value={users_list}
				id=""
				onChange={handleChange}
			/>
			<div>
				{
					data.searchUserForChan.filter((elem: User) => (elem.nickname.includes(users_list))
					).map((e: User ) => (
						<div key= {e.id}>
							<p>{e.nickname}</p>
							<button onClick={() => { handleClickBtn(e) }}>Add</button>
						</div>
					))
				}
			</div>
		</div>
	)
}