import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes } from './Routes';
import { GoogleAnalytics, ScrollReset } from './components';

function App() {
	const theme = createMuiTheme({
		palette: {
			type: 'dark',
		},
	});

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Router>
				<ScrollReset />
				<GoogleAnalytics />
				<Routes />
			</Router>
		</ThemeProvider>
	);
}

export default App;
