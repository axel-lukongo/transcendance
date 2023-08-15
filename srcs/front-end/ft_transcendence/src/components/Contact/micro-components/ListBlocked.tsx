import { useQuery } from "@apollo/client";
import { MY_BLOCKED_LIST } from "../graphql/Querys";
import { User } from "../../interfaces/interfaces";
import { useState } from "react";
import { Unblocked } from "./buttons/unblocked";

interface blocked{
	id: number,
	blocker_id: number,
	blocked_id: number,
	blocked: User
}

export function MyBlockedList(){
	const user = JSON.parse(sessionStorage.getItem('user') || '');

	const {data, loading, error} = useQuery(MY_BLOCKED_LIST,{variables: {id: user.id} });
	const [showUnblock, setShowUnblock] = useState(false);
	if (loading) {
		return <p>Loading...</p>;
	}


	if (error) {
		return <p>Error: {error.message}</p>;
	}
	// console.log(data.person_blocked);

	const handleUnblockClick = () => {
		setShowUnblock(true);
	};

	return (
		<div  >
		<h2 >  blocked List: </h2>
		{data && data.person_blocked.map((item: blocked) => (
		  <div key={item.id}>
			  <p>{item.blocked.nickname}
			  <button onClick={handleUnblockClick}>Unlock</button>
			  </p>
			  {showUnblock && <Unblocked id={item.id} />}

		  </div>
		))}
	  </div>
	);
}