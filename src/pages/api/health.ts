import type { APIRoute } from "astro";

/** Rendered on demand, so a successful response shows the server is handling requests. */
export const prerender = false;

/** Used by the kubernetes liveness and readiness probes. */
export const GET: APIRoute = () => {
	return Response.json({ status: "ok" }, { headers: { "cache-control": "no-store" } });
};
