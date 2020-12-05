import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { IGameInfo } from '../../types/GameInfo';
import { requestApi } from '../../utils';
import { ResultList, SearchInput } from './components';

interface SearchProps {}

export interface State {
	q: string;
	isLoading: boolean;
	lastQ: string | null;
}

const Search: React.FC<SearchProps> = ({}) => {
	const [resultList, setResultList] = useState<IGameInfo[]>([]);
	const [searchValues, setSearchValues] = useState<State>({
		q: '',
		isLoading: true,
		lastQ: null,
	});

	const handleChange = (prop: keyof State) => (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setSearchValues({ ...searchValues, [prop]: event.currentTarget.value });
	};

	const currentTimer = useRef<NodeJS.Timeout>();

	useEffect(() => {
		if (currentTimer.current) {
			clearTimeout(currentTimer.current);
		}
		currentTimer.current = setTimeout(async function () {
			if (searchValues.q === searchValues.lastQ) {
				return;
			}
			setSearchValues({ ...searchValues, isLoading: true });
			const response = await requestApi(`/search?q=${searchValues.q}`);
			if (response.result) {
				setResultList(response.result);
			}
			setSearchValues({
				...searchValues,
				isLoading: false,
				lastQ: searchValues.q,
			});
		}, 1500);
	}, [searchValues.q]);

	return (
		<>
			<SearchInput handleChange={handleChange} searchValues={searchValues} />
			{!searchValues.isLoading ? (
				<ResultList results={resultList} key={1} />
			) : (
				<CircularProgress />
			)}
		</>
	);
};

export default Search;
