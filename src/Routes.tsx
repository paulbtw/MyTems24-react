import { Container, createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { Route, Switch } from "react-router-dom";
import { Layout } from "./layouts";
import { Game, Landing } from "./views";

interface RoutesProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingTop: theme.spacing(4),
    },
  })
);

export const Routes: React.FC<RoutesProps> = ({ darkMode, toggleDarkMode }) => {
  const classes = useStyles();
  return (
    <Layout toggleDarkMode={toggleDarkMode} darkMode={darkMode}>
      <Container maxWidth="lg" className={classes.container}>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/game/:slug" component={Game} />
        </Switch>
      </Container>
    </Layout>
  );
};
