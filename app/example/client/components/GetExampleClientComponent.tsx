"use client";
import { client } from "@/lib/hono";
import type { InferResponseType } from "hono";
import { useEffect, useState } from "react";

type ResType = InferResponseType<typeof client.api.users.$get>;
export function GetExampleClientComponent() {
	const [data, setData] = useState<ResType | null>(null);
	useEffect(() => {
		client.api.users
			.$get({
				query: {
					username: "TODA-Corporation",
				},
			})
			.then((res) => res.json())
			.then((json) => setData(json));
	}, []);
	return (
		data && (
			<div>
				{data ? <p>Hello, {data.userData.login}</p> : <p>loading...</p>}
			</div>
		)
	);
}
