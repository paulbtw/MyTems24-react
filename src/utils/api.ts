export const requestApi = async (
	path = "",
	method = "GET",
	data = null,
	headers = {}
) => {
	const apiUrl = "http://localhost:5000";

	if (!path.startsWith("/")) {
		path = `/${path}`;
	}
	const url = `${apiUrl}${path}`;

	headers = Object.assign({
		"Content-Type": "application/json",
		...headers,
	});

	const response = await fetch(url, {
		method: method.toUpperCase(),
		mode: "cors",
		cache: "no-cache",
		credentials: "include",
		headers,
		body: data ? JSON.stringify(data) : null,
	});

	if (response.status < 200 || response.status >= 300) {
		const error = await response.json();
		throw new Error(error.message);
	}

	return await response.json();
};
