import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { requestApi } from '../../utils';
import useRouter from '../../utils/useRouter';

interface ForwardingProps {}

const Forwarding: React.FC<ForwardingProps> = ({}) => {
	const { forwardId } = useParams();
	useEffect(() => {
		requestApi(`/redirect/${forwardId}`)
			.then((response) => {
				window.location.href = response.url;
			})
			.catch(console.log);
	}, []);
	return <div>Redirecting in a few seconds</div>;
};

export default Forwarding;
