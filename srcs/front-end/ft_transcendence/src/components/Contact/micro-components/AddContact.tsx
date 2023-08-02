import React, {useEffect, useRef, useState} from "react";
import { IProposContact } from "../../interfaces/interfaces";
import { RESEARCH } from '../graphql/Querys'
import { useQuery } from "@apollo/client";
import AddContactBtn from "./buttons/AddContactBtn";
import MyPendingRequest from "./ListMyPendingRequest";

 export default function  AddContact({refetchContact, refetchProps, user, setSwap}: IProposContact) {

	/* States */

	const [search, setSearch] = useState("");
	
	const {data, loading, refetch, error} = useQuery(RESEARCH, {
		variables: {
			input: search,
			user_id: user.id
		}
	});

	/* //////////////////////////////////////////////////////// */
	/* Use Effect */

	useEffect(() => {
		refetch();
	}, [search, refetch, refetchProps]);

	useEffect(() => {
		if (!loading)
			inputRef.current?.focus();
	}, [loading]);

	const inputRef = useRef<HTMLInputElement | null>(null);

	/* //////////////////////////////////////////////////////// */
	/* Querry error */

	if (error)
		return (<div>An Error as occured</div>);
	
	if (!data)
		return (<div>Nothing to see her</div>)
		
	/* //////////////////////////////////////////////////////// */
	/* Handlers */
	
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		setSearch(prevValue => event.target.value);
	};
	

	return ( 
		<div className="AddContact">
			<div className="search_bar">
				<input 
					type="search"
					name="search_bar"
					id="search_bar_contact"
					value={search}
					onChange={handleChange}
					ref={(el) => inputRef.current = el}
				/>
			</div>
			<div className="research_result">
				{data.searchUsers.map((element: {nickname: string, id: number}) => (
					<div key={element.id} className="card">
						<p>{element.nickname}</p>
						<AddContactBtn 
							user={user}
							id={element.id}
							nickname={element.nickname}
							refetch={refetchContact}
						/>
					</div>		
				))}
			</div>
			<div className="pending_request">
				<MyPendingRequest 
					user={user}
				/>
			</div>
		</div>
	);
}