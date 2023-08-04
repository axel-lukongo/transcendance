import { useMutation } from "@apollo/client";
import { UNBLOCKED } from "../../graphql/Mutations";
import { useEffect } from "react";
import { useRef } from "react";

export function Unblocked({id}: { id: number}){
	const [Unblocked, {data, error ,loading}] = useMutation(UNBLOCKED);
	const isConditionExecuted = useRef<boolean>(false);

	useEffect(() => {
		// Appel de la mutation lorsque le composant est monté
		if (id && !isConditionExecuted.current){
		Unblocked({ variables: { id } });
		isConditionExecuted.current = true;
	}
	// isConditionExecuted.current = true;
	}, [Unblocked, id]);

	if (!data){
		return <div> nothing here </div>;
	}

	if (loading) {
		return <div>Loading...</div>;
	}
	
	if (error) {
		return <div>Error: {error.message}</div>;
	}
	
	return (
		<div>
		</div>
	  );
}