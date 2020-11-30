import React from "react";
import {
  Card,
  ListItem,
  ListItemProps,
  Paper,
  Tooltip,
  Typography,
} from "@material-ui/core";
import CreditCardIcon from "@material-ui/icons/CreditCard";

interface GameListItemProps {
  offer: any;
}

function ListItemLink(props: ListItemProps<"a", { button?: true }>) {
  return <ListItem button component="a" {...props} />;
}

export const GameListItem: React.FC<GameListItemProps> = ({ offer }) => {
  const paymentMethodsHTML = (paymentMethodArray: string[] | null) => {
    let htmlString = "";

    if (paymentMethodArray) {
      paymentMethodArray.forEach(function (element, index, arr) {
        htmlString += element;
        if (index !== arr.length - 1) {
          htmlString += ", ";
        }
      });
    }
    return htmlString;
  };

  return (
    <ListItemLink
      button
      href={offer.url}
      target="_blank"
      rel="noreferrer noopener"
      disabled={!offer.inStock}
    >
      <Typography variant="subtitle1" component="h4" display="block">
        {offer.rawName}
      </Typography>
      <Typography variant="subtitle2" component="h5" display="inline">
        {offer.platform}
      </Typography>
      <Tooltip
        title={
          <React.Fragment>
            <Typography>
              {paymentMethodsHTML(offer.store.paymentMethods)}
            </Typography>
          </React.Fragment>
        }
        arrow
        placement="top"
      >
        <CreditCardIcon />
      </Tooltip>
      <Typography variant="subtitle1" align="right" display="block">
        {offer.price} €
      </Typography>
    </ListItemLink>
  );
};
