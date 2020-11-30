import {
  Box,
  Card,
  Chip,
  createStyles,
  Divider,
  Grid,
  makeStyles,
  Tab,
  Tabs,
  Theme,
  Typography,
} from "@material-ui/core";
import { TabContext, TabPanel } from "@material-ui/lab";
import React, { useState } from "react";

interface GameInfoProps {
  gameData: {
    [key: string]: any;
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(2),
      paddingTop: theme.spacing(0.25),
      paddingBottom: theme.spacing(0.25),
      "& > *": {
        margin: theme.spacing(0.25),
      },
    },
  })
);

export const GameInfo: React.FC<GameInfoProps> = ({ gameData }) => {
  const classes = useStyles();
  const [tabValue, setTabValue] = useState("windows");

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setTabValue(newValue);
  };

  const operatingSystemString = Object.entries(gameData.platforms).map(
    (key) => {
      if (key[1]) {
        return key[0].charAt(0).toLocaleUpperCase() + key[0].slice(1) + " ";
      }
    }
  );
  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Typography variant="h6">Game description</Typography>
        <Typography
          variant="body2"
          dangerouslySetInnerHTML={{ __html: gameData.detailed_description }}
        ></Typography>
      </Grid>
      <Grid item xs={4}>
        {gameData.metaUrl && gameData.metaScore && (
          <>
            <Typography variant="h6">Reviews</Typography>
            <Card className={classes.root}>
              <Typography display="inline">MetaCritics:</Typography>
              <Typography display="inline" align="right">
                {gameData.metaScore}
              </Typography>
            </Card>
          </>
        )}
        {gameData.tags && (
          <>
            <Typography variant="h6">Tags</Typography>
            <Card className={classes.root}>
              {gameData.tags.map((tag: any, index: number) => {
                return <Chip label={tag} key={index} size="small" />;
              })}
            </Card>
          </>
        )}
        {gameData.genre && (
          <>
            <Typography variant="h6">Genres</Typography>
            <Card className={classes.root}>
              {gameData.genre.map((genre: any) => {
                return <Chip label={genre} size="small" />;
              })}
            </Card>
          </>
        )}
        {new Date(gameData.releaseDate) > new Date("1970-01-02") && (
          <>
            <Typography variant="h6">Release Date</Typography>
            <Typography variant="body1">
              {new Date(gameData.releaseDate).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </Typography>
          </>
        )}
        {gameData.platforms &&
          (gameData.platforms.windows ||
            gameData.platforms.mac ||
            gameData.platforms.linux) && (
            <>
              <Typography variant="h6">Operating system</Typography>
              <Typography variant="body1">{operatingSystemString}</Typography>
            </>
          )}
        {Array.isArray(gameData.developer) && gameData.developer.length > 0 && (
          <>
            <Typography variant="h6">Developer</Typography>
            <Typography variant="body1">
              {gameData.developer.map(function (
                dev: string,
                idx: number,
                arr: string[]
              ) {
                const devString = arr.length - 1 > idx ? ", " : "";
                return dev + devString;
              })}
            </Typography>
          </>
        )}
        {Array.isArray(gameData.publisher) && gameData.publisher.length > 0 && (
          <>
            <Typography variant="h6">Publisher</Typography>
            <Typography variant="body1">
              {gameData.publisher.map(function (
                pub: string,
                idx: number,
                arr: string[]
              ) {
                const pubString = arr.length - 1 > idx ? ", " : "";
                return pub + pubString;
              })}
            </Typography>
          </>
        )}
      </Grid>
      {(gameData.pcReq || gameData.macReq || gameData.linuxReq) && (
        <Grid item xs={12}>
          <TabContext value={tabValue}>
            <Tabs value={tabValue} onChange={handleChange}>
              {gameData.pcReq.minimum && (
                <Tab label="Windows" value="windows" />
              )}
              {gameData.macReq.minimum && <Tab label="Mac" value="mac" />}
              {gameData.linuxReq.minimum && <Tab label="Linux" value="linux" />}
            </Tabs>
            <Divider />
            <TabPanel value="windows">
              {gameData.pcReq.minimum && (
                <Typography
                  variant="body2"
                  dangerouslySetInnerHTML={{
                    __html: gameData.pcReq.minimum,
                  }}
                />
              )}
              {gameData.pcReq.recommended && (
                <Typography
                  variant="body2"
                  dangerouslySetInnerHTML={{
                    __html: gameData.pcReq.recommended,
                  }}
                />
              )}
            </TabPanel>
            <TabPanel value="mac">
              {gameData.macReq.minimum && (
                <Typography
                  variant="body2"
                  dangerouslySetInnerHTML={{
                    __html: gameData.macReq.minimum,
                  }}
                />
              )}
              {gameData.macReq.recommended && (
                <Typography
                  variant="body2"
                  dangerouslySetInnerHTML={{
                    __html: gameData.macReq.recommended,
                  }}
                />
              )}
            </TabPanel>
            <TabPanel value="linux">
              {gameData.linuxReq.minimum && (
                <Typography
                  variant="body2"
                  dangerouslySetInnerHTML={{
                    __html: gameData.linuxReq.minimum,
                  }}
                />
              )}
              {gameData.linuxReq.recommended && (
                <Typography
                  variant="body2"
                  dangerouslySetInnerHTML={{
                    __html: gameData.linuxReq.recommended,
                  }}
                />
              )}
            </TabPanel>
          </TabContext>
        </Grid>
      )}
    </Grid>
  );
};
