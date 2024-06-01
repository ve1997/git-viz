import { client } from "@/lib/hono";
import type { InferResponseType } from "hono";
import Link from "next/link";
import { useEffect, useState } from "react";

type MemberPageProps = {
	user: string;
};
type ResTypeForRepos = InferResponseType<
	typeof client.api.users.reposValid.$get
>;
const orgName = process.env.NEXT_PUBLIC_ORGANIZATION || "";
export function MemberPage({ user }: MemberPageProps) {
	const [reposData, setReposData] = useState<ResTypeForRepos | null>(null);

	useEffect(() => {
		client.api.users.reposValid
			.$get({
				query: {
					org: orgName,
					username: user,
				},
			})
			.then((res) => res.json())
			.then((json) => setReposData(json));
	}, [user]);

	if (!reposData) {
		return (
			<div
				className="flex h-screen items-center justify-center"
				aria-label="読み込み中"
			>
				<div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
			</div>
		);
	}

	return (
		<div className="p-4">
			<div className="mb-4 flex items-end">
				<img
					src={reposData?.userData.avatar_url}
					alt={`${reposData?.userData.login}のアバター`}
					className="mr-4 h-16 w-16 rounded-full"
				/>
				<div>
					<h1 className="font-bold text-2xl">
						{reposData?.userData.name ?? reposData?.userData.login}
					</h1>
					<p className="text-gray-500 text-sm">{reposData?.userData.login}</p>
				</div>
			</div>
			<div className="grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2">
				{reposData?.reposData.map((repo) => (
					<Link
						href={`/${orgName}/${repo.name}`}
						key={repo.id}
						className="cursor-pointer rounded-lg border p-4 shadow-sm transition-shadow hover:shadow-md"
					>
						<h2 className="font-semibold text-xl">{repo.name}</h2>
						<p className="text-gray-600">{repo.language}</p>
					</Link>
				))}
			</div>
		</div>
	);
}
