import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CHANELS_LIST } from "../graphql/QueryChanel";
import { UserChanels } from "../../interfaces/interfaces";

export interface TMP {
	chanel_id: number;
	user_id: number;
}

export default function ListAddContact({ chanel_id, user_id }: TMP) {

	const {data, loading, error, refetch} = useQuery(CHANELS_LIST, {
		variables: {
			input: user_id
		}
	});

	if (loading)
		return ( <div> Loading... </div>);
		
	if (error)
		return (<div>An Error has happened</div>);

	if (!data)
			return (<div>Nothing to see her </div>);

			return (
				<div>
				{
					data.myChanels.map((element: UserChanels) => {
						const composite_key = `${element.user_id}_${element.chanels.id}`;
						<ul key={composite_key}>
							<div> {element.chanels.chanel_name}</div>
						</ul>
					})
				}	
				</div>
	);
}