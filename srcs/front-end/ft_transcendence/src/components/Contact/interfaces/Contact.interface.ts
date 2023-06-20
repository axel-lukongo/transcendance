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