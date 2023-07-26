import React from "react";
import HeaderChanel from "./Box/HeaderChanel";
import ChatBox from "./requests/ChatBox";
import CreateMsg from "./forms/createMessage";
import { IPrivateMessageProps } from "./Chanels";

export default function PublicChanel({refetchChat, handleChange, handleRefetch, user, chanel_focus }: IPrivateMessageProps) {
	return (
		<div>
			<div className="chat"> 
				<HeaderChanel />
				<div className="chat-history">
					<ChatBox chan={chanel_focus} />
				</div>
				<div className="chat-message ">
					<div className="input-group mb-0">
						<CreateMsg />
					</div>
				</div>
			</div>
		</div>
	);
}