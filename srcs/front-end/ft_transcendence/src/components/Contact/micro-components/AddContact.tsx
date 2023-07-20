import React, {useState} from "react";
import { IProposContact } from "../../interfaces/interfaces";
import {} from '../graphql/MutationsContact'
import { useMutation } from "@apollo/client";

export default function AddContact({refetchContact, refetchProps, user, setSwap}: IProposContact) {

	const [search, setSearch] = useState("");

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(prevValue => event.target.value);
	}

	return ( 
		<div className="AddContact">
			<div className="search_bar">
				<input 
					type="text"
					name="search_bar"
					id="search_bar_contact"
					value={search}
					onChange={handleChange}
				/>
			</div>
		</div>
	)
}