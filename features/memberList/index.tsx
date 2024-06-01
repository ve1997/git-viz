"use client";
import type { client } from "@/lib/hono";
import type { InferResponseType } from "hono";
import Link from "next/link";

type ResType = InferResponseType<typeof client.api.orgs.members.$get>;
type MemberInfoProps = {
	member: ResType["membersData"][number];
};

export function MemberInfo({ member }: MemberInfoProps) {
	return (
		<Link
			href={`/user/${member.login}`}
			className="flex cursor-pointer flex-col items-center gap-2 rounded p-2 transition-colors duration-200 hover:bg-gray-200"
		>
			<img
				src={member.avatar_url}
				alt={member.login}
				className="h-12 w-12 rounded-full"
			/>
			<p className="font-semibold">{member.login}</p>
		</Link>
	);
}
