import {  useQuery } from "@apollo/client";
import { IPropsChanel } from "../../../interfaces/interfaces";
import { UserChanels } from "../../../interfaces/interfaces";
import { CHANELS_LIST } from '../../graphql/Query'
import CardChanel from "../Box/CardChanel";
import add_btn from '../../../../image/add-album-svgrepo-com.svg'

import { __CREATE_CHANEL__ } from "../../message";

export default function ChanelList(props: IPropsChanel) {

	/* //////////////////////////////////////////////////////// */
	/* State */
	const {data, refetch, error} = useQuery(CHANELS_LIST, {
		variables: {
			private_chan: props.private_chan
		}
	})

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
				data.myChanels.map((chanel: UserChanels, index: number) => {
					const unique_key = `${chanel.user_id}-${chanel.chanels.id}`;
					return (
						<ul className="chat-list" key={unique_key}>
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