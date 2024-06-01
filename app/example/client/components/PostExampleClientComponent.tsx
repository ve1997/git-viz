// PostExampleClientComponent.tsx
"use client";
import { client } from "@/lib/hono";
import { useState } from "react";
import useSWRMutation from "swr/mutation";

const postData = async (_: string, { arg }: { arg: string }) => {
	const res = await client.api.users.$get({
		query: {
			username: arg,
		},
	});
	return await res.json();
};

export function PostExampleClientComponent() {
	const [value, setValue] = useState<string>("");
	const { trigger, isMutating, data } = useSWRMutation("users", postData);

	const handleClick = () => {
		trigger(value);
	};

	return (
		<div className="m-4 flex min-w-[400px] flex-col items-center justify-center rounded bg-white p-4 shadow-md">
			<div className="mb-4 text-center">
				<input
					type="text"
					value={value}
					onChange={(e) => setValue(e.target.value)}
					className="rounded border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
					placeholder="Enter your userName..."
				/>
			</div>
			<div className="mb-4">
				<button
					type="button"
					onClick={handleClick}
					disabled={isMutating}
					className="rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
				>
					{isMutating ? "Loading..." : "Click"}
				</button>
			</div>
			{isMutating && (
				<div className="my-4 rounded bg-gray-100 p-4 shadow">
					<p>loading...</p>
				</div>
			)}
			{data && (
				<div className="my-4 rounded bg-gray-100 p-4 shadow">
					<div className="mb-4 flex items-center justify-center">
						<img
							src={data.userData.avatar_url}
							alt={data.userData.login}
							className="mr-4 h-12 w-12 rounded-full"
						/>
						<p className="font-semibold">{data.userData.login}</p>
					</div>
					<pre>{JSON.stringify(data, null, 2)}</pre>
				</div>
			)}
		</div>
	);
}
