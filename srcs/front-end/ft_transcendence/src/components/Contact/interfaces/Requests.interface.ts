
export interface IRequestProps {
	element: { id: number};
	refetchContact: () => void;
	label: string;
}


export interface IProposContact {
	refetchContact: () => void;
	refetchProps: boolean;
}