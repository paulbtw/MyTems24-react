import * as types from "../constants/ActionTypes";
import { requestApi } from "../utils/api";
import { actionStart, actionSuccess, actionFailed } from "./utils/template";

export const fetchGame = (slug: string) => (dispatch: any) => {
	dispatch(actionStart(types.FETCH_GAME));

	const promise = requestApi(`/game/${slug}`)
		.then((response) => {
			dispatch(actionSuccess(types.FETCH_GAME, { payload: response.gameInfo }));
		})
		.catch((err) => {
			let errorMessage: string;
			switch (err.code) {
				default:
					errorMessage = err.message;
			}
			dispatch(actionFailed(types.FETCH_GAME, errorMessage));
		});
	return promise;
};
