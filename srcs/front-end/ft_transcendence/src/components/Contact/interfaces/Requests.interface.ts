
export interface IRequestProps {
	element: { id: number};
	refetch: () => void;
	refetchContact: () => void;
}

export interface IFriendRequestProps {
	refetchContact: () => void;
}

export interface IProposListContact {
	refetchContact: boolean;
}