// Model interfaces

export interface Chanel {
	id: number;
	chanel_name: string;
	chanel_size: number;
	max_users: number;
	logo: string;
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

// Props 

export interface IPropsChanel {
	refetchChanels?: boolean;
	handleChanelRefetch: () => void;
}

export interface IRequestProps {
	element: { 
		id: number,
		contact_id?: number,
		user_id?: number
	};
	refetchContact: () => void;
	label: string;
}

export interface IProposContact {
	refetchContact: () => void;
	refetchProps: boolean;
}

export interface IRequest {
	element: UserChanels;
	handleChanelRefecth: () => void;
	label: string;
}