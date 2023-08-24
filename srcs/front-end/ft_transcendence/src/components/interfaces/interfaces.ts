/* //////////////////////////////////////////////////////// */
/* Model */

export interface User {
    id: number;
    avatar: string;
    email: string;
    nickname: string;
    token: string;
    tfa_code?: string;
	state?: number;
	level: number;
	rank: string;
  }

export interface Chanel {
	id: number;
	owner_id: number;
	chanel_name: string;
	chanel_size: number;
	max_users: number;
	logo: string;
	interlocutor_id: number;
	directMsg: boolean;
	interlocutor: User;
}

export interface UserChanels {
	user_id: number;
	pending: boolean;
	chanels: Chanel;
	is_admin: boolean;
	is_muted: boolean;
	user: User;
}

export interface Banned{
	user_id: number;
	channel_id: number;
	user_ban: User;
}

export interface IContact {
	id: number;
	nickname: string;
	state: number;
	email: string;
	token: number;
	avatar: string;
	level: number;
	rank: string;

}

export interface IContactsLink {
	id: number;
	pending: boolean;
	contact: IContact;
}

export interface Player {
	id: number;
	userId: number;
	positionX: number;
	positionY: number;
	waitingRoomId: number;
	opponentPlayerId :number;
	ballId?: number;
	pongId?: number;
	host: boolean;
  }
  
  export interface Ball {
	id: number;
	positionX: number;
	positionY: number;
	directionX: number;
	directionY: number;
  }
  
  export interface PongI {
	id: number;
	userId1?: number;
	userId2?: number;
	scoreUser1: number;
	scoreUser2: number;
	loserId?: number ;
	winnerId?: number;
	VersusDate?: string;
	user1?: User;
	user2?: User;
  }

  export interface ILeaderBoard {
	grade: number;
	nickname: string;
	level: number;
	rank: string;
  }

  export interface IUserStat {
	grade: number;
	level: number;
	rank: string;
	wins: number;
	defeats: number;
	ratio: number;
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
	user: User;
	refetch: () => void;
	handleRefreshPending: () => void;
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
	owner_id: string
	chanel_name: string,
	chanel_size: string,
	max_users: string,
	logo: string,
	directMsg: boolean,
	interlocutor: User,
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
		chanel_focus: channelfocus | User;
		is_chanel: boolean;
		handleChatBox: (switch_id: number) => void;
	}
