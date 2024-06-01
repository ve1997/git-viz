// PostExampleClientComponent.tsx
"use client";
import { client } from "@/lib/hono";
import { useState } from "react";
import useSWRMutation from "swr/mutation";

const postHello = async (_: string, { arg }: { arg: string }) => {
	const res = await client.api.sampleA.$post({
		json: {
			text: arg,
		},
	});
	return await res.json();
};

export function PostExampleClientComponent() {
	const [value, setValue] = useState<string>("");
	const { trigger, isMutating, data } = useSWRMutation("hello", postHello);

	const handleClick = () => {
		trigger(value);
	};

	return (
		<div className="m-4 flex min-w-[400px] flex-col items-center justify-center rounded bg-white p-4 shadow-md">
			<div className="mb-4 text-center">
				<p className="mb-2 text-gray-700 text-lg">
					Hello と、入力された文字列を
					<br />
					連結してリターンします
				</p>
				<input
					type="text"
					value={value}
					onChange={(e) => setValue(e.target.value)}
					className="rounded border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
					placeholder="Enter text..."
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
			{data?.message && (
				<div className="my-4 rounded bg-gray-100 p-4 shadow">
					<p className="text-gray-800 text-lg">
						API Response: <strong>{data.message}</strong>
					</p>
				</div>
			)}
		</div>
	);
}
