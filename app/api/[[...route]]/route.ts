import { Hono } from "hono";
import { handle } from "hono/vercel";
import { orgsRoute, reposRoute, usersRoute } from ".";

const app = new Hono()
	.basePath("/api")
	.route("/orgs", orgsRoute)
	.route("/repos", reposRoute)
	.route("/users", usersRoute);

export type AppType = typeof app;

export const GET = handle(app);
export const POST = handle(app);
