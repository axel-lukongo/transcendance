import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { UserChanels } from "../../../interfaces/interfaces";
import {USER_CHANEL_LIST} from '../../graphql/Query'
import AcceptChanel from '../buttons/AcceptChanel'
import QuiteChanel from "../buttons/QuitChanel";
import { IListChanelRequestProps } from '../../../interfaces/interfaces'

export default function ListChanelRequests(props: IListChanelRequestProps) {

	/* //////////////////////////////////////////////////////// */
	/* States */

	const {data, refetch, error} = useQuery(USER_CHANEL_LIST);

	/* //////////////////////////////////////////////////////// */
	/* Use Effect */

	useEffect(() => {
		refetch();
	}, [props.refetchChanel, refetch])
		
	/* //////////////////////////////////////////////////////// */
	/* Handlers */

	/* //////////////////////////////////////////////////////// */
	/* Querry Errors */

	if (error)
		return (<div>An error as occured!</div>)

	if (!data)
		return (<div>nothing to see her yet</div>)

	/* //////////////////////////////////////////////////////// */
	/* Jsx.Element return  */

		return (
			
			<div id="plist" className="people-list">
				<div className="header-side-bar">
					<h3>Chanel Request</h3>
				</div>
				{
					data.chanelsRequest.map((chanel: UserChanels, index: number) => {
						const unique_key = `${chanel.user_id}-${chanel.chanels.id}`
						return (
							<ul key={unique_key} className="chat-list">
								<li className="card-chat-list" id="chan-req-card">
									<div className="about">
										<img src={chanel.chanels.logo} alt="avatar" />{/**afficher avatar */}
										<div className="name">{chanel.chanels.chanel_name}</div>
										<AcceptChanel 
											element={chanel} 
											label="Join" 
											handleChanelRefetch={props.handleChanelRefetch}
										/>
										<QuiteChanel 
											element={chanel}
											label="refuse"
											handleChanelRefetch={props.handleChanelRefetch}
											/>
									</div>
								</li>
							</ul>
						);
					})
				}
			</div>
	)
}