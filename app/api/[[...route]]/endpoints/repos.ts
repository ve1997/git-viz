import { octokit } from "@/lib/octokit";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { handle } from "hono/vercel";
import { z } from "zod";

const app = new Hono();

export const reposRoute = app
	.get(
		"/collaborators",
		zValidator(
			"query",
			z.object({
				owner: z.string().min(1),
				repo: z.string().min(1),
			}),
		),
		async (c) => {
			const { owner, repo } = c.req.valid("query");
			const { data } = await octokit.repos.listCollaborators({
				owner,
				repo,
				per_page: 100,
			});

			return c.json({
				collaboratorsData: data,
			});
		},
	)
	.get(
		"/branches",
		zValidator(
			"query",
			z.object({
				owner: z.string().min(1),
				repo: z.string().min(1),
			}),
		),
		async (c) => {
			const { owner, repo } = c.req.valid("query");
			const { data } = await octokit.repos.listBranches({
				owner,
				repo,
				per_page: 100,
			});

			return c.json({
				branchData: data,
			});
		},
	)
	.get(
		"/commits",
		zValidator(
			"query",
			z.object({
				owner: z.string().min(1),
				repo: z.string().min(1),
			}),
		),
		async (c) => {
			const { owner, repo } = c.req.valid("query");
			const { data } = await octokit.repos.listCommits({
				owner,
				repo,
				per_page: 100,
			});

			return c.json({
				commitsData: data,
			});
		},
	)
	.get(
		"/issues",
		zValidator(
			"query",
			z.object({
				owner: z.string().min(1),
				repo: z.string().min(1),
			}),
		),
		async (c) => {
			const { owner, repo } = c.req.valid("query");
			const { data } = await octokit.issues.listForRepo({
				owner,
				repo,
				per_page: 100,
			});
			return c.json({
				issuesData: data,
			});
		},
	);

export const GET = handle(app);
