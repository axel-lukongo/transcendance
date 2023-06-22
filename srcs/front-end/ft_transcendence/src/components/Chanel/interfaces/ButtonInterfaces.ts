import { UserChanels } from "./Chanels.interface";

export interface IRequest {
	element: UserChanels;
	handleChanelRefecth: () => void;
	label: string;
}