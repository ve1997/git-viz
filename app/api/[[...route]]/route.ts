import { Hono } from "hono";
import { handle } from "hono/vercel";
import { sampleARoute } from "./sampleA";
import { sampleBRoute } from "./sampleB";

const app = new Hono()
	.basePath("/api")
	.route("/sampleA", sampleBRoute)
	.route("/sampleB", sampleARoute);

export type AppType = typeof app;

export const GET = handle(app);
export const POST = handle(app);
