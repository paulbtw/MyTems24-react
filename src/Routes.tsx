import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { DefaultLayout } from './layouts/Default';
import {
	ComparePageView,
	ForwardingView,
	LandingView,
	SearchView,
} from './views';

export const Routes: React.FC = () => {
	return (
		<DefaultLayout>
			<Switch>
				<Route exact path='/' component={LandingView} />
				<Route exact path='/game/:slug' component={ComparePageView} />
				<Route exact path='/search' component={SearchView} />
				<Route exact path='/redirect/:forwardId' component={ForwardingView} />
			</Switch>
		</DefaultLayout>
	);
};
