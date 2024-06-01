import { octokit } from "@/lib/octokit";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { handle } from "hono/vercel";
import { z } from "zod";

const app = new Hono();

export const usersRoute = app
	.get(
		"/",
		zValidator(
			"query",
			z.object({
				username: z.string().min(1),
			}),
		),
		async (c) => {
			const { username } = c.req.valid("query");
			const { data } = await octokit.users.getByUsername({ username });

			return c.json({
				userData: data,
			});
		},
	)
	.get(
		"/repos",
		zValidator(
			"query",
			z.object({
				username: z.string().min(1),
			}),
		),
		async (c) => {
			const { username } = c.req.valid("query");
			const { data } = await octokit.repos.listForUser({ username });

			return c.json({
				reposData: data,
			});
		},
	);

export const GET = handle(app);
