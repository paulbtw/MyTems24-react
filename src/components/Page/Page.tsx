import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import useRouter from "../../utils/useRouter";

interface PageProps {
	title?: string;
}

const { NODE_ENV } = process.env;
const GA_MEASUREMENT_ID = process.env.REACT_APP_GA_MEASUREMENT_ID as string;

const Page: React.FC<PageProps> = ({ title, children }) => {
	const router = useRouter();

	useEffect(() => {
		if (NODE_ENV !== "production") {
			return;
		}
		if (window.gtag) {
			window.gtag("config", GA_MEASUREMENT_ID, {
				page_path: router.location.pathname,
				page_name: title,
			});
		}
	}, [title, router]);

	return (
		<div>
			<Helmet>
				<title>{title}</title>
			</Helmet>
			{children}
		</div>
	);
};

export default Page;
