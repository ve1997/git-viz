import { MemberInfo } from "@/features/memberList";
import { client } from "@/lib/hono";
const orgName = process.env.NEXT_PUBLIC_ORGANIZATION || "";
export default async function Home() {
	const res = await client.api.orgs.members.$get({
		query: {
			org: orgName,
		},
	});
	const json = await res.json();
	return (
		<main className="flex min-h-screen flex-col items-center justify-center gap-8">
			<h1 className="text-center font-bold text-4xl">Hello, {orgName}!</h1>
			<div className="grid grid-cols-1 gap-6 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2">
				{json.membersData.map((member) => {
					return <MemberInfo key={member.id} member={member} />;
				})}
			</div>
		</main>
	);
}
