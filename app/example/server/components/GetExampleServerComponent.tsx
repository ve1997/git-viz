import { client } from "@/lib/hono";
export async function GetExampleServerComponent() {
	const res = await client.api.sampleB.$get({
		query: {
			name: "User",
		},
	});
	const json = await res.json();
	return (
		<div>
			Server Component
			<p>{json.message}</p>
		</div>
	);
}
