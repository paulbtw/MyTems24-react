import { List } from "@material-ui/core";
import React from "react";
import { GameListItem } from "./GameListItem";

interface GameListProps {
  offers: { [key: string]: any };
}

export const GameList: React.FC<GameListProps> = ({ offers }) => {
  return (
    <List disablePadding={true}>
      {offers &&
        offers.map(function (offer: any) {
          return <GameListItem offer={offer} key={offer.id}/>;
        })}
    </List>
  );
};
