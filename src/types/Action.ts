export interface IAction {
	type: string;
	status: string;
	isFetching?: boolean;
	payload?: any;
	errorMessage?: string;
}
