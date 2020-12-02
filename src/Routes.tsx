import React from "react";
import { Route, Switch } from "react-router-dom";
import { DefaultLayout } from "./layouts/Default";
import { ComparePageView, LandingView } from "./views";

export const Routes: React.FC = () => {
	return (
		<DefaultLayout>
			<Switch>
				<Route exact path="/" component={LandingView} />
				<Route path="/game/:slug" component={ComparePageView} />
			</Switch>
		</DefaultLayout>
	);
};
