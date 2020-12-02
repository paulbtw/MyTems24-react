import {
	AppBar,
	Badge,
	Button,
	Container,
	createStyles,
	fade,
	IconButton,
	InputBase,
	makeStyles,
	Menu,
	MenuItem,
	Theme,
	Toolbar,
	Typography,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SearchIcon from "@material-ui/icons/Search";
import { Link as RouterLink, useLocation } from "react-router-dom";
import Link from "@material-ui/core/Link";
import React, { useContext } from "react";

interface NavProps {}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		grow: {
			flexGrow: 1,
		},
		menuButton: {
			marginRight: theme.spacing(2),
		},
		title: {
			display: "none",
			[theme.breakpoints.up("sm")]: {
				display: "block",
			},
		},
		search: {
			position: "relative",
			borderRadius: theme.shape.borderRadius,
			backgroundColor: fade(theme.palette.common.white, 0.15),
			"&:hover": {
				backgroundColor: fade(theme.palette.common.white, 0.25),
			},
			marginRight: theme.spacing(2),
			marginLeft: 0,
			width: "100%",
			[theme.breakpoints.up("sm")]: {
				marginLeft: theme.spacing(3),
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
			paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
			transition: theme.transitions.create("width"),
			width: "100%",
			[theme.breakpoints.up("md")]: {
				width: "20ch",
			},
		},
		sectionDesktop: {
			display: "none",
			[theme.breakpoints.up("md")]: {
				display: "flex",
			},
		},
		sectionMobile: {
			display: "flex",
			[theme.breakpoints.up("md")]: {
				display: "none",
			},
		},
		section: {
			display: "flex",
		},
	})
);

const Nav: React.FC<NavProps> = ({}) => {
	const classes = useStyles();
	const location = useLocation();

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [
		mobileMoreAnchorEl,
		setMobileMoreAnchorEl,
	] = React.useState<null | HTMLElement>(null);

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const menuId = "primary-search-account-menu";
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: "top", horizontal: "right" }}
			id={menuId}
			keepMounted
			transformOrigin={{ vertical: "top", horizontal: "right" }}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<MenuItem>Logout</MenuItem>
		</Menu>
	);

	const mobileMenuId = "primary-search-account-menu-mobile";
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{ vertical: "top", horizontal: "right" }}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{ vertical: "top", horizontal: "right" }}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			<MenuItem>
				<IconButton aria-label="show new notifications" color="inherit">
					<Badge badgeContent={0} color="secondary">
						<NotificationsIcon />
					</Badge>
				</IconButton>
				<p>Notifications</p>
			</MenuItem>
			<MenuItem onClick={handleProfileMenuOpen}>
				<IconButton
					aria-label="account of current user"
					aria-controls="primary-search-account-menu"
					aria-haspopup="true"
					color="inherit"
				>
					<AccountCircle />
				</IconButton>
				<p>Profile</p>
			</MenuItem>
		</Menu>
	);

	return (
		<div className={classes.grow}>
			<AppBar position="sticky">
				<Container maxWidth="lg">
					<Toolbar>
						<Typography className={classes.title} variant="h6" noWrap>
							<Link
								underline="none"
								component={RouterLink}
								to="/"
								color="inherit"
								variant="inherit"
							>
								Home
							</Link>
						</Typography>
						<div className={classes.search}>
							<div className={classes.searchIcon}>
								<SearchIcon />
							</div>
							<InputBase
								placeholder="Search…"
								classes={{
									root: classes.inputRoot,
									input: classes.inputInput,
								}}
								inputProps={{ "aria-label": "search" }}
							/>
						</div>
						<div className={classes.grow} />
						<Button component={RouterLink} to="/game/grand-theft-auto-v">
							gta
						</Button>
						<Button component={RouterLink} to="/game/dayz">
							dayz
						</Button>
					</Toolbar>
				</Container>
			</AppBar>
			{renderMobileMenu}
			{renderMenu}
		</div>
	);
};

export default Nav;
