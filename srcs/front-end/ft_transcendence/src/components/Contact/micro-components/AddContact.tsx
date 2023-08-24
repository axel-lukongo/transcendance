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

	const [refreshPending, setRefreshPending] = useState(false);

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
	
	const handleRefreshPending = () => {
		setRefreshPending(prevData => !prevData);
	}

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
			<div className="header_pending_contact">
				<h4>Pending Request</h4>
			</div>
			<div className="research_result">
				{data.searchUsers.map((element: {nickname: string, id: number}) => (
					<div key={element.id} className="card">
						<p>{element.nickname}</p>
						<AddContactBtn 
							user={user}
							id={element.id}
							refetch={refetchContact}
							handleRefreshPending={handleRefreshPending}
						/>
					</div>		
				))}
			</div>
			<div className="pending_request">
				<MyPendingRequest 
					user={user}
					refreshPending={refreshPending}
				/>
			</div>
		</div>
	);
}