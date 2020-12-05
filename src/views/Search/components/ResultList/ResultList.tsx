import { Divider, List, Typography } from '@material-ui/core';
import React from 'react';
import { ResultListItem } from '..';
import { IGameInfo } from '../../../../types/GameInfo';

interface ResultListProps {
	results: IGameInfo[];
}

const ResultList: React.FC<ResultListProps> = ({ results }) => {
	return (
		<List>
			{results.length > 0 ? (
				results.map((result, idx) => (
					<>
						<ResultListItem gameInfo={result} key={idx} />
						{idx + 1 < results.length && <Divider />}
					</>
				))
			) : (
				<Typography variant='h4'>Nothing found</Typography>
			)}
		</List>
	);
};

export default ResultList;
