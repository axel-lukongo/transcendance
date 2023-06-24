import { UserChanels } from "../../Chanel/interfaces/Chanels.interface";

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
	Button?: (props: IRequest) => JSX.Element;
}

export interface IRequest {
	element: UserChanels;
	handleChanelRefecth: () => void;
	label: string;
}