import { client } from "@/lib/hono";
export async function GetExampleServerComponent() {
	const res = await client.api.users.$get({
		query: {
			username: "ve1997",
		},
	});
	const json = await res.json();
	return (
		<div>
			<p>GetExampleServerComponent</p>
			<pre>{JSON.stringify(json, null, 2)}</pre>
		</div>
	);
}
