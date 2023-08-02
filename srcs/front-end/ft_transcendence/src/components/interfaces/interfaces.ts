/* //////////////////////////////////////////////////////// */
/* Model */

export interface User {
	id: number;
	nickname: string;
	avatar: string;
	email: string;
	token: string;
	tfa_code?: string
}

export interface Chanel {
	id: number;
	chanel_name: string;
	chanel_size: number;
	max_users: number;
	logo: string;
	interlocutor_id: number;

}

export interface UserChanels {
	user_id: number;
	pending: boolean;
	chanels: Chanel;
}
export interface IContact {
	id: number;
	nickname: string;
	email: string;
	token: number;
}

export interface IContacts {
	id: number;
	pending: boolean;
	contact: IContact
}

/* //////////////////////////////////////////////////////// */
/* Contact */

export interface IProposContact {
	user: User;
	refetchProps: boolean;
	refetchContact: () => void;
	setSwap?: () => void;
}

export interface IRequestProps {
	element: { 
		id: number,
		contact_id?: number,
		user_id?: number
	};
	label: string;
	refetchContact: () => void;
}

export interface IAddContact {
	id: number;
	nickname: string;
	user: User;
	refetch: () => void;
}

/* //////////////////////////////////////////////////////// */
/* Chanel */

export interface IPropsChanel {
	user: User;
	private_chan: boolean;
	refetchChanels?: boolean;
	refetchChat?: boolean;
	handleChatBox: (switch_id: number) => void;
	handleChatRefetch?: () => void;
	handleChanelRefetch: () => void;
	handleChanelFocus: (element: Chanel) => void;
}

export interface channelfocus  {
	id: string,
	chanel_name: string,
	chanel_size: string,
	max_users: string,
	logo: string,
}

export interface IRequest {
	label: string;
	element: UserChanels;
	handleChanelRefetch: () => void;
}

export interface ICardChanelProps {
	handleChatBox: (switch_id: number) => void
	handleChanelFocus: (element: Chanel) => void;
	chanel: UserChanels;
}

	/* //////////////////////////////////////////////////////// */
	/* Private Msg */

	export interface IPrivateMessageProps {
		user: User;
		chanel_focus: channelfocus;
		private_chan: boolean;
		refetchChat: boolean;
		refetchChanel: boolean;
		handleChatBox: (switch_id: number) => void;
		handleChatRefetch: () => void; 
		handleChanelRefetch: () => void;
		handleChanelFocus: (element: Chanel) => void;
	}

	/* //////////////////////////////////////////////////////// */
	/* Create Chanel */

	export interface ICreateChanelFormProps {
		user: User;
		handleChanelRefetch: () => void;
	}

	/* //////////////////////////////////////////////////////// */
	/* Chanel Request */

	export interface IChanelRequest {
		user: User;
		refetchChanel: boolean;
		handleChanelRefetch: () => void;
		chanel_focus: channelfocus;
		handleChatBox: (switch_id: number) => void
	}

	export interface IListChanelRequestProps {
		user: User;
		refetchChanel: boolean;
		handleChanelRefetch: () => void;
	}

	/* //////////////////////////////////////////////////////// */
	/* Header */

	export interface IHeaderProps {
		user: User;
		chanel_focus: channelfocus;
		is_chanel: boolean;
		handleChatBox: (switch_id: number) => void;
	}
