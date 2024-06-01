"use client";
import { client } from "@/lib/hono";
import type { InferResponseType } from "hono";
import { useEffect, useState } from "react";

type ResType = InferResponseType<typeof client.api.sampleA.$get>;
export function GetExampleClientComponent() {
	const [data, setData] = useState<ResType | null>(null);
	useEffect(() => {
		client.api.sampleA
			.$get({
				query: {
					name: "User",
				},
			})
			.then((res) => res.json())
			.then((json) => setData(json));
	}, []);
	return data && <div>{data.message}</div>;
}
