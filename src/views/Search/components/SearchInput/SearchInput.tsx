import { Input, makeStyles, Paper, Theme } from '@material-ui/core';
import React from 'react';
import { State } from '../../Search';

interface SearchInputProps {
	handleChange: (
		prop: keyof State,
	) => (event: React.ChangeEvent<HTMLInputElement>) => void;
	searchValues: State;
}

const useStyles = makeStyles((theme: Theme) => ({
	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	searchInput: {
		margin: 'auto',
	},
}));

const SearchInput: React.FC<SearchInputProps> = ({
	handleChange,
	searchValues,
}) => {
	const classes = useStyles();
	return (
		<Paper className={classes.paper}>
			<Input
				className={classes.searchInput}
				placeholder='What are you looking for...'
				name='q'
				value={searchValues.q}
				onChange={handleChange('q')}
			/>
		</Paper>
	);
};

export default SearchInput;
