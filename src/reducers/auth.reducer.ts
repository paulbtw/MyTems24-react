import { IAction } from "../types/Action";
import * as types from "../constants/ActionTypes";

const initialState: AuthState = {};

interface AuthState {
	userLoggedIn?: boolean;
	isFetching?: boolean;
	status?: string;
	errorMessage?: string;
}

const auth = (state = initialState, action: IAction) => {
	switch (action.type) {
		case types.LOGIN:
			return state;
		default:
			return state;
	}
};

export default auth;
