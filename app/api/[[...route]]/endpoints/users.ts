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
			const { data } = await octokit.users.getByUsername({
				username,
			});

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
			const { data } = await octokit.repos.listForUser({
				username,
				per_page: 100,
			});

			return c.json({
				reposData: data,
			});
		},
	)
	.get(
		"/reposValid",
		zValidator(
			"query",
			z.object({
				org: z.string().min(1),
				username: z.string().min(1),
			}),
		),
		async (c) => {
			const { org, username } = c.req.valid("query");

			const { data: userData } = await octokit.users.getByUsername({
				username,
			});

			const { data: reposList } = await octokit.repos.listForOrg({
				org,
				username,
				per_page: 100,
			});

			const commitPromises = reposList.map((repo) =>
				octokit.repos
					.listCommits({
						owner: org,
						repo: repo.name,
						per_page: 100,
						author: username,
					})
					.then((commitsList) => ({
						repo,
						hasCommits: commitsList.data.length > 0,
					})),
			);

			const results = await Promise.all(commitPromises);
			const validRepos = results
				.filter((result) => result.hasCommits)
				.map((result) => result.repo);

			return c.json({
				userData: userData,
				reposData: validRepos,
			});
		},
	);

export const GET = handle(app);
