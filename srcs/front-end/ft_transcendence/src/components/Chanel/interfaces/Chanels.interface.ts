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

export interface IPropsChanel {
	refetchChanels?: boolean;
	handleChanelRefetch: () => void;
}