import {
  Button,
  ButtonGroup,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Tab,
  Tabs,
  Theme,
  Typography,
} from "@material-ui/core";
import { TabContext } from "@material-ui/lab";
import Skeleton from "@material-ui/lab/Skeleton";
import TabPanel from "@material-ui/lab/TabPanel/TabPanel";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { GameInfo } from "./GameInfo";
import { GameList } from "./GameList";
import { AuthContext } from "../../context/auth.context";
import { UserContext } from "../../context/user.context";
import { requestApi } from "../../utils";

interface GameProps {}

// Placeholder interface :D
interface IGameData {
  [key: string]: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    containerPaper: {
      overflow: "hidden",
    },
    containerImgPaper: {
      overflow: "hidden",
      height: "140px",
    },
    gameImg: {
      height: "140px",
      lineHeight: "0px",
    },
    divider: {
      marginBottom: "10px",
    },
  })
);

export const Game: React.FC<GameProps> = ({}) => {
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);
  const location = useLocation();
  const history = useHistory();

  const { slug }: { slug: string } = useParams();

  const [tabValue, setTabValue] = useState("offers");
  const [openNotLogged, setOpenNotLogged] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [gameData, setGameData] = useState({} as IGameData);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    const getGameData = async () => {
      setIsLoading(true);
      if (!slug) {
        return;
      }
      try {
        const response = await requestApi(`/game/${slug}`);

        setGameData(response.gameInfo);
        console.log(response.gameInfo);
      } catch (err) {
        console.log(err);
        history.push("/");
      }
      setIsLoading(false);
    };

    getGameData();
  }, [slug]);

  const handleOpen = () => {
    setOpenNotLogged(true);
  };
  const handleClose = () => {
    setOpenNotLogged(false);
  };

  return (
    <>
      <Typography variant="h4">
        {isLoading ? <Skeleton width="8em" /> : gameData.nameRaw}
      </Typography>
      <Divider className={classes.divider} />
      <Grid container spacing={2}>
        <Grid item className={classes.containerPaper}>
          <Paper className={classes.containerImgPaper}>
            {isLoading ? (
              <Skeleton variant="rect" width="300px" height="140px" />
            ) : (
              <img
                className={classes.gameImg}
                src={gameData.imageUrl}
                alt={gameData.nameRaw}
              />
            )}
          </Paper>
        </Grid>
        <Grid item xs></Grid>
        <Grid item xs>
          <ButtonGroup variant="contained" color="primary">
            {authContext.isAuth ? (
              userContext.isWishlisted(gameData.id) ? (
                <Button onClick={() => userContext.deleteWishlist(gameData.id)}>
                  Wishlisted
                </Button>
              ) : (
                <Button onClick={() => userContext.addWishlist(gameData.id)}>
                  Add to wishlist
                </Button>
              )
            ) : (
              <Button onClick={handleOpen}>Add to wishlist</Button>
            )}
            <Button onClick={handleOpen}>Alert</Button>
          </ButtonGroup>
          <Dialog
            onClose={handleClose}
            open={openNotLogged}
            aria-labelledby="Login with Steam to continue"
          >
            <DialogTitle id="dialog-title">
              Login with Steam to continue
            </DialogTitle>
            <DialogContent dividers>
              <Typography gutterBottom>
                You need to login to add games to you wishlist or create custom
                alerts
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => authContext.handleLoginClick(location.pathname)}
                color="primary"
                variant="contained"
              >
                Login with Steam
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TabContext value={tabValue}>
            <Tabs value={tabValue} onChange={handleChange}>
              <Tab label="Offers" value="offers" />
              <Tab label="Info" value="info" />
            </Tabs>
            <Divider />
            <TabPanel value="offers">
              <GameList offers={gameData?.gameOffers} />
            </TabPanel>
            <TabPanel value="info">
              <GameInfo gameData={gameData} />
            </TabPanel>
          </TabContext>
        </Grid>
      </Grid>
    </>
  );
};
