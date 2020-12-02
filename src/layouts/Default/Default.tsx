import { Container, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { Nav } from "./components";

interface DefaultProps {}

const useStyles = makeStyles((theme: Theme) => ({
	container: {
		paddingTop: theme.spacing(4),
	},
}));

const Default: React.FC<DefaultProps> = ({ children }) => {
	const classes = useStyles();
	return (
		<>
			<Nav />
			<Container maxWidth="lg" className={classes.container}>
				<>{children}</>
			</Container>
		</>
	);
};

export default Default;
