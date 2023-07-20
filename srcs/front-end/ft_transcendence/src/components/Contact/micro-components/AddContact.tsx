import React, {useEffect, useRef, useState} from "react";
import { IProposContact } from "../../interfaces/interfaces";
import { CREATE_CONTACT } from '../graphql/MutationsContact'
import { RESEARCH } from '../graphql/QuerysContact'
import { useMutation, useQuery } from "@apollo/client";

 export default function  AddContact({refetchContact, refetchProps, user, setSwap}: IProposContact) {

	const [search, setSearch] = useState("");
	
	const {data, loading, refetch, error} = useQuery(RESEARCH, {
		variables: {
			input: search
		}
	});

	useEffect(() => {
		refetch();
		console.log(data); /* a enlever */
	}, [search, refetch]);

	useEffect(() => {
		if (!loading)
			inputRef.current?.focus();
	}, [loading]);

	const inputRef = useRef<HTMLInputElement | null>(null);

	if (loading)
		return ( <div>Loading...</div> );
		
	if (error)
		return (<div>An Error as occured</div>);
		
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		setSearch(prevValue => event.target.value);
	};

	// const handleBlur = async () => {
	// 	await refetch();
	// 	inputRef.current?.focus();
	// }

	return ( 
		<div className="AddContact">
			<div className="search_bar">
				<input 
					type="text"
					name="search_bar"
					id="search_bar_contact"
					value={search}
					onChange={handleChange}
					ref={(el) => inputRef.current = el}
					// onBlur={handleBlur}
				/>
			</div>
			<div className="test">{
				 data.searchUsers.map((element: {nickname: string, id: number}) => (
					<div key={element.id}>
						<p>{element.nickname}</p>
					</div>		
				))}
			</div>
		</div>
	);
}