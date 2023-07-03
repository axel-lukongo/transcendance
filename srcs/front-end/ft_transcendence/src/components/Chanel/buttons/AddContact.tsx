import React from "react";
import { Chanel } from "../../interfaces/interfaces"
import { useMutation } from "@apollo/client";

export interface ITmpProps {
	chanel_id: number; 
}

export default function AddContactInChanel({ chanel_id }: ITmpProps) {


	const handleClick = () => {
		
	}

	return (
		<div>
			<button onClick={handleClick}>Add +</button>
		</div>
	)
}