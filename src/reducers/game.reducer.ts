import { IAction } from "../types/Action";
import * as types from "../constants/ActionTypes";
import { IGameInfo } from "../types/GameInfo";

const initialState: GameState = {};

interface GameState {
	gameInfo?: IGameInfo;
}

const game = (state = initialState, action: IAction) => {
	switch (action.type) {
		case types.FETCH_GAME:
			if (action.isFetching && action.isFetching === true) {
				return {
					...state,
					isFetching: true,
					gameInfo: null
				};
			}

			if (action.status && action.status === "success") {
				return {
					...state,
					isFetching: false,
					gameInfo: action.payload,
				};
			}
			return state;
		default:
			return state;
	}
};

export default game;
