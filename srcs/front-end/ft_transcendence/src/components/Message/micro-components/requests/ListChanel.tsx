import {  useQuery } from "@apollo/client";
import { Chanel, IPropsChanel } from "../../../interfaces/interfaces";
import { CHANELS_LIST } from '../../graphql/Query'
import CardChanel from "../Box/CardChanel";
import add_btn from '../../../../image/add-album-svgrepo-com.svg'

import { __CREATE_CHANEL__ } from "../../message";
import { useEffect } from "react";

export default function ChanelList(props: IPropsChanel) {

	/* //////////////////////////////////////////////////////// */
	/* State */
	const {data, refetch, error} = useQuery(CHANELS_LIST, {
		variables: {
			private_chan: props.private_chan
		}
	})

	useEffect(() => {
		refetch();
	}, [props.refetchChanels])

	/* //////////////////////////////////////////////////////// */
	/* Querry Error */

	if (error)
		return (<div>An Error as occured her</div>)

	if (!data)
		return (<div>nothing to see her</div>)

	/* //////////////////////////////////////////////////////// */
	/* Handlers */

	const handleClic = () => {
		props.handleChatBox(__CREATE_CHANEL__);
	}

	/* //////////////////////////////////////////////////////// */
	/* JSX.Element return  */

	return (
		
		<div className="people-list">
			<div className="header-side-bar">
			{
				props.private_chan ? 
					<h3>
						Private Chanels 
						<div onClick={handleClic} id="add-chanel-btn-box">
							<img src={add_btn} alt="add_chanel" id="add-chanel-btn"/>
						</div>
					</h3>
					: <h3>
						Public Chanels 
						<div onClick={handleClic} id="add-chanel-btn-box">
							<img src={add_btn} alt="add_chanel" id="add-chanel-btn"/>
						</div>
					</h3>
			}
			</div>
			<div>
			{
				data.myChanels.map((chanel: Chanel, index: number) => {

					return (
						<ul className="chat-list" key={chanel.id}>
							<CardChanel 
								chanel={chanel}
								handleChanelFocus={props.handleChanelFocus}
								handleChatBox={props.handleChatBox}
							/>
						</ul>);
				})
			}</div>
		</div>
	)
}