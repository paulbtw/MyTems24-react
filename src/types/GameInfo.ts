export interface IGameInfo {
	id: string;
	slug: string;
	drm: string[];
	type: string;
	nameFiltered: string;
	nameRaw: string;
	edition: string | null;
	releaseDate: string;
	coming_soon: boolean;
	detailed_description: string;
	about_the_game: string;
	short_description: string;
	supported_languages: string;
	required_age: number | null;
	imageUrl: string;
	dlc: number[] | null;
	packages: number[] | null;
	genre: string[] | null;
	tags: string[] | null;
	developer: string[] | null;
	publisher: string[] | null;
	screenshots: { id: number; path_full: string; path_thumbnail: string }[] | null;
	movies: {
		id: number;
		mp4: {
			480: string;
			max: string;
		};
		name: string;
		webm: {
			480: string;
			max: string;
		};
		highlight: boolean;
		thumbnail: string;
	}[];
	website: string;
	pcReq: {
		minimum?: string;
		recommended?: string;
	};
	macReq: {
		minimum?: string;
		recommended?: string;
	};
	linuxReq: {
		minimum?: string;
		recommended?: string;
	};
	platforms: {
		mac: boolean;
		linux: boolean;
		windows: boolean;
	};
	metaUrl: string | null;
	metaScore: number | null;
	steamId: number | null;
	originId: string | null;
	uplayId: string | null;
	gogId: string | null;
	epicId: string | null;
	url: string;
	drmNotice: string | null;
	legalNotice: string | null;
	background: string;
	isFree: boolean;
	recommendations: number | null;
	originAccess: boolean;
	originAccessPremier: boolean;
	uplayPlus: boolean;
	xboxGamePass: boolean;
	xboxGamePassUltimate: boolean;
	isActive: boolean;
	fullGameId: number | null;
	fullGame: IGameInfo;
	gameOffers: IGameOffer[];
}

export interface IGameOffer {
	id: string;
	rawName: string;
	edition: string;
	inStock: boolean;
	inStockText: string | null;
	price: number;
	isFree: boolean;
	region: string;
	platform: string;
	url: string;
	isActive: boolean;
	tabId: number;
	gameInfoId: string;
	storeId: string;
	store: IStore;
}

export interface IStore {
	id: string;
	name: string;
	image: string | null;
	isActive: boolean;
	paymentMethods: string[];
	fee: {
		paypal: { [key: number]: { a: number; b: number } };
		creditcard: { [key: number]: { a: number; b: number } };
	};
}
