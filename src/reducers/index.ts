import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import gameReducer from "./game.reducer";

const appReducer = combineReducers({
	authReducer,
	gameReducer,
});

const rootReducer = (state: any, action: any) => {
	return appReducer(state, action);
};

export default rootReducer;
