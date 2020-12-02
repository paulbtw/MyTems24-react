import { List } from '@material-ui/core';
import React from 'react';
import { ProductOffersListItem } from '..';
import { IGameOffer } from '../../../../types/GameInfo';

interface ProductOffersProps {
	offers: IGameOffer[] | undefined;
}

const ProductOffers: React.FC<ProductOffersProps> = ({ offers }) => {
	return (
		<List disablePadding={true}>
			{offers &&
				offers.map((offer) => (
					<ProductOffersListItem offer={offer} key={offer.id} />
				))}
		</List>
	);
};

export default ProductOffers;
