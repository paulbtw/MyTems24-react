import {
	Button,
	Divider,
	Grid,
	makeStyles,
	Paper,
	Tab,
	Tabs,
	Theme,
	Typography,
} from '@material-ui/core';
import { Skeleton, TabContext, TabPanel } from '@material-ui/lab';
import { get } from 'lodash';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchGame } from '../../actions/game';
import { IGameInfo } from '../../types/GameInfo';
import { ProductInfo, ProductOffers } from './components';

interface ComparePageProps {
	fetchGameData: (slug: string) => void;
	gameData: IGameInfo | null;
}

const useStyles = makeStyles((theme: Theme) => ({
	containerPaper: {
		overflow: 'hidden',
	},
	containerImgPaper: {
		overflow: 'hidden',
		height: '140px',
	},
	gameImg: {
		height: '140px',
		lineHeight: '0px',
	},
	divider: {
		marginBottom: '10px',
	},
	spacer: {
		flexGrow: 1,
	},
	buttonWrapper: {
		margin: theme.spacing(1),
	},
}));

const ComparePage: React.FC<ComparePageProps> = ({
	fetchGameData,
	gameData,
}) => {
	const classes = useStyles();
	const { slug }: { slug: string } = useParams();

	const [tabValue, setTabValue] = useState('offers');

	const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
		setTabValue(newValue);
	};

	useEffect(() => {
		fetchGameData(slug);
	}, [slug]);
	return (
		<>
			<Typography variant='h4'>
				{gameData ? gameData.nameRaw : <Skeleton width='8em' />}
			</Typography>
			<Divider className={classes.divider} />
			<Grid container spacing={2}>
				<Grid item className={classes.containerPaper}>
					<Paper className={classes.containerImgPaper}>
						{gameData ? (
							<img
								className={classes.gameImg}
								src={gameData.imageUrl}
								alt={gameData.nameRaw}
							/>
						) : (
							<Skeleton variant='rect' width='300px' height='140px' />
						)}
					</Paper>
				</Grid>
				<Grid item className={classes.spacer}></Grid>
				<Grid item alignContent='flex-end'>
					<div className={classes.buttonWrapper}>
						<Button variant='contained' color='primary'>
							Wishlist
						</Button>
					</div>
					<div className={classes.buttonWrapper}>
						<Button variant='contained' color='primary'>
							Wishlist
						</Button>
					</div>
				</Grid>
				<Grid item xs={12}>
					<TabContext value={tabValue}>
						<Tabs value={tabValue} onChange={handleChange}>
							<Tab label='Offers' value='offers' />
							<Tab label='Info' value='info' />
						</Tabs>
						<Divider />
						<TabPanel value='offers'>
							<ProductOffers offers={gameData?.gameOffers} />
						</TabPanel>
						<TabPanel value='info'>
							<ProductInfo gameData={gameData} />
						</TabPanel>
					</TabContext>
				</Grid>
			</Grid>
		</>
	);
};

const mapStateToProps = (state: any) => ({
	gameData: get(state, 'gameReducer.gameInfo', null),
});

const mapDispatchToProps = (dispatch: any) => ({
	fetchGameData: (slug: string) => {
		dispatch(fetchGame(slug));
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(ComparePage);
