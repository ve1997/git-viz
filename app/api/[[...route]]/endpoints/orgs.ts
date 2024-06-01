import { octokit } from "@/lib/octokit";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { handle } from "hono/vercel";
import { z } from "zod";

const app = new Hono();

export const orgsRoute = app
	.get(
		"/members",
		zValidator(
			"query",
			z.object({
				org: z.string().min(1),
			}),
		),
		async (c) => {
			const { org } = c.req.valid("query");
			const { data } = await octokit.orgs.listMembers({ org });

			return c.json({
				membersData: data,
			});
		},
	)
	.get(
		"/repos",
		zValidator(
			"query",
			z.object({
				org: z.string().min(1),
			}),
		),
		async (c) => {
			const { org } = c.req.valid("query");
			const { data } = await octokit.repos.listForOrg({ org });

			return c.json({
				reposData: data,
			});
		},
	)
	.get(
		"/issues",
		zValidator(
			"query",
			z.object({
				org: z.string().min(1),
			}),
		),
		async (c) => {
			const { org } = c.req.valid("query");
			const { data } = await octokit.issues.listForOrg({ org });

			return c.json({
				issuesData: data,
			});
		},
	);

export const GET = handle(app);
