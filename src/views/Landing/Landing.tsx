import {
  Button,
  Container,
  createStyles,
  fade,
  InputBase,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";

interface LandingProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    searchWrapper: {
      padding: theme.spacing(2, 4),
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
    },
  })
);

export const Landing: React.FC<LandingProps> = ({}) => {
  const classes = useStyles();

  return (
    <Paper elevation={3} className={classes.searchWrapper}>
      {/* <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>

        <InputBase
          fullWidth
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
        />
      </div> */}
      <Typography>This is the Landing Page</Typography>
    </Paper>
  );
};
