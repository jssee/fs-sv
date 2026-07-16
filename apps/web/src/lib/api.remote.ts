import { getRequestEvent, query } from "$app/server";
import { createApi } from "$lib/server/api";

export const getApiHealth = query(async () => {
	const api = createApi(getRequestEvent().locals);

	return await api.healthCheck();
});

export const getPrivateData = query(async () => {
	const api = createApi(getRequestEvent().locals);

	return await api.privateData();
});
