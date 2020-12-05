import { ListItem, ListItemText } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import React from 'react';
import { IGameInfo } from '../../../../types/GameInfo';

interface ResultListItemProps {
	gameInfo: IGameInfo;
}

const ResultListItem: React.FC<ResultListItemProps> = ({ gameInfo }) => {
	return (
		<ListItem
			component={RouterLink}
			to={`/game/${gameInfo.slug}`}
			key={gameInfo.id}
		>
			<ListItemText>{gameInfo.nameRaw}</ListItemText>
		</ListItem>
	);
};

export default ResultListItem;
