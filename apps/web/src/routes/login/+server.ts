import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = ({ url }) => {
	const search = url.search;
	redirect(308, `/signin${search}`);
};
